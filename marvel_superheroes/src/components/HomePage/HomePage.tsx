import React from "react";
import HeroList from "../HeroList/HeroList";
import Header from "../Header/Header";
import './HomePage.css';
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router";
import HeroSearchBar from "../HeroSearchBar/HeroSearchBar";
import PaginationRounded from '../PaginationRounded';
import { connect } from 'react-redux'
import { fetchHeroes, fetchHeroesSaga, hideLoader, IFetchHeroes, IFetchHeroesSaga, ILoader, ISetHeroesCurrentPage, ISetHeroesNameStartWith, ISetHeroesOrderBy, setHeroesCurrentPage, setHeroesNameStartWith, setHeroesOrderBy, showLoader } from "../../store/actions/actions";
import { store } from "../../index";

export interface IHero {
    id: number,
    name: string,
    thumbnail: { path: string },
    description: string,
    path: string
}

export type IHeroProps = RouteComponentProps & IGetHeroes;

interface IGetHeroes {
    heroes: IHero[],
    totalOfItems: number,
    nameStartsWith: string,
    orderBy: string,
    progressBar: boolean,
    currentHeroesPage: number,
    setHeroesNameStartWith(nameStartsWith: string): ISetHeroesNameStartWith,
    setHeroesOrderBy(orderBy: string): ISetHeroesOrderBy,
    setHeroesCurrentPage(currentHeroesPage: number): ISetHeroesCurrentPage,
    fetchHeroes(heroes: IHero[], totalOfItems: number): IFetchHeroes,
    hideLoader(): ILoader,
    showLoader(): ILoader,
    fetchHeroesSaga(orderBy: string, currentHeroesPage: number, query: string | string[] | null, sort: string | string[] | null, page: string | string[] | null): IFetchHeroesSaga
}

export interface IHeroesState {
    heroes: IHero[],
    totalOfItems: number,
    nameStartsWith: string,
    orderBy: string,
    currentHeroesPage: number,
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

class HomePage extends React.Component<IHeroProps> {
    constructor(props: IHeroProps) {
        super(props)
        this.searchBarHandleSubmit = this.searchBarHandleSubmit.bind(this)
        this.setCurrentPage = this.setCurrentPage.bind(this)
    }

    addressBarMaker = (queryArg?: string, sortArg?: string, pageArg?: number | null): void => {
        const { query, sort, page } = queryString.parse(this.props.location.search);
        const newQuery = queryArg ? queryArg : (query ? query?.toString() : '');
        const newSort = sortArg ? sortArg : (sort ? sort?.toString() : '');
        const newPage = pageArg ? pageArg : (page ? page : null);

        const queryData = newQuery ? 'query=' + newQuery : '';
        const sortData = newSort && newQuery ? '&sort=' + newSort : (newSort ? 'sort=' + newSort : '');
        const pagedata = ((newSort || newQuery) && newPage) ? ('&page=' + newPage) : (newPage ? 'page=' + newPage : '');
        this.props.history.push('?' + queryData + sortData + pagedata);
    }

    setCurrentPage = (currentHeroesPage: number): void => {
        this.props.setHeroesCurrentPage(currentHeroesPage);
        this.addressBarMaker('', '', currentHeroesPage);
    }

    searchBarHandleSubmit = (nameStartsWith: string, orderBy: string): void => {
        const locationSearch = queryString.parse(this.props.location.search);
        const queryIsExist = locationSearch.query;
        const sortIsExist = locationSearch.sort;

        const query = nameStartsWith !== queryIsExist ? nameStartsWith : (!nameStartsWith && queryIsExist ? queryIsExist?.toString() : '');
        const sort = orderBy !== sortIsExist ? orderBy : sortIsExist?.toString();

        this.addressBarMaker(query, sort, null);
        if (nameStartsWith !== queryIsExist) { this.props.setHeroesNameStartWith(query) }
        if (orderBy !== sortIsExist) { this.props.setHeroesOrderBy(sort) }
        this.props.setHeroesCurrentPage(1)
    }

    makeRequest = async (): Promise<void> => {
        const { query, sort, page } = queryString.parse(this.props.location.search);
        const orderBy = this.props.orderBy;
        const currentHeroesPage = this.props.currentHeroesPage;

        this.props.fetchHeroesSaga(orderBy, currentHeroesPage, query, sort, page)
    }

    async componentDidMount(): Promise<void> {
        this.makeRequest()
    }

    async componentDidUpdate(prevProps: IHeroProps): Promise<void> {
        if (this.props.location !== prevProps.location || this.props.currentHeroesPage !== prevProps.currentHeroesPage) { this.makeRequest(); }
    }

    render(): JSX.Element {
        const heroes = { heroes: this.props.heroes };
        const queryStringParse = queryString.parse(this.props.location.search);
        const query = queryStringParse.query?.toString();
        const sort = queryStringParse.sort?.toString();
        const pageInAddressBar = queryStringParse.page?.toString();

        return (
            <div className='hero_main'>
                <Header />
                <HeroSearchBar
                    query={query ? query : null}
                    sort={sort ? sort : null}
                    searchBarHandleSubmit={this.searchBarHandleSubmit}
                />
                {this.props.progressBar ? <ProgressBarIndeterminate /> : <div style={{ height: '8px' }} />}
                <HeroList {...heroes} />
                <PaginationRounded
                    count={Math.ceil((this.props.totalOfItems) / 4)}
                    setCurrentPage={this.setCurrentPage}
                    page={pageInAddressBar ? parseInt(pageInAddressBar) : this.props.currentHeroesPage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        nameStartsWith: state.heroesReducer.nameStartsWith,
        orderBy: state.heroesReducer.orderBy,
        currentHeroesPage: state.heroesReducer.currentHeroesPage,
        progressBar: state.loaderReducer.progressBar,
        heroes: state.heroesReducer.heroes,
        totalOfItems: state.heroesReducer.totalOfItems
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setHeroesNameStartWith: (nameStartsWith: string) => dispatch(setHeroesNameStartWith(nameStartsWith)),
        setHeroesOrderBy: (orderBy: string) => dispatch(setHeroesOrderBy(orderBy)),
        setHeroesCurrentPage: (currentHeroesPage: number) => dispatch(setHeroesCurrentPage(currentHeroesPage)),
        fetchHeroes: (heroes: IHero[], totalOfItems: number) => dispatch(fetchHeroes(heroes, totalOfItems)),
        showLoader: () => dispatch(showLoader()),
        hideLoader: () => dispatch(hideLoader()),
        fetchHeroesSaga: (orderBy: string, currentHeroesPage: number, query: string, sort: string | string[] | null, page: string | string[] | null) => dispatch(fetchHeroesSaga(orderBy, currentHeroesPage, query, sort, page))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(HomePage)
