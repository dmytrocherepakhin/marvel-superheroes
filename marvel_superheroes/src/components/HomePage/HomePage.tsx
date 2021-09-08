import React from "react";
import HeroList from "../HeroList/HeroList";
import Header from "../Header/Header";
import './HomePage.css';
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router";
import HeroSearchBar from "../HeroSearchBar/HeroSearchBar";
import PaginationRounded from '../PaginationRounded';
import { getHeroes } from "../api";

export interface IHero {
    id: number,
    name: string,
    thumbnail: { path: string },
    description: string,
    path: string
}

type IProps = RouteComponentProps;

export interface IGetHeroes {
    offset: number,
    nameStartsWith: string,
    orderBy: string,
    limit: number,
    progressBar: boolean,
}

interface IState extends IGetHeroes {
    heroes: IHero[],
    totalOfItems: number,
    changeInputState: boolean,
    changeSelectState: boolean,
    currentPage: number,
}

class HomePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.searchBarHandleSubmit = this.searchBarHandleSubmit.bind(this)
        this.setCurrentPage = this.setCurrentPage.bind(this)
        this.state = {
            heroes: [],
            offset: 0,
            nameStartsWith: '',
            totalOfItems: 0,
            orderBy: 'name',
            limit: 4,
            changeInputState: false,
            changeSelectState: false,
            progressBar: false,
            currentPage: 1
        }
    }

    addressBarMaker = (queryArg: string | undefined, sortArg: string | undefined, pageArg: number | null): void => {
        const { query, sort, page } = queryString.parse(this.props.location.search);
        const newQuery = queryArg ? queryArg : (query ? query?.toString() : '');
        const newSort = sortArg ? sortArg : (sort ? sort?.toString() : '');
        const newPage = pageArg ? pageArg : (page ? page : null);

        const queryData = newQuery ? 'query=' + newQuery : '';
        const sortData = newSort && newQuery ? '&sort=' + newSort : (newSort ? 'sort=' + newSort : '');
        const pagedata = ((newSort || newQuery) && newPage) ? ('&page=' + newPage) : (newPage ? 'page=' + newPage : '');
        this.props.history.push('?' + queryData + sortData + pagedata);
    }

    setCurrentPage = (currentPage: number): void => {
        this.setState({
            currentPage: currentPage,
            offset: ((currentPage - 1) * 4)
        });
        this.addressBarMaker('', '', currentPage);
    }

    searchBarHandleSubmit = (changeInputState: boolean, nameStartsWith: string, changeSelectState: boolean, orderBy: string): void => {
        const locationSearch = queryString.parse(this.props.location.search);
        const queryIsExist = locationSearch.query;
        const sortIsExist = locationSearch.sort;

        const query = changeInputState ? nameStartsWith : (!changeInputState && queryIsExist ? queryIsExist?.toString() : '');
        const sort = changeSelectState ? orderBy : (!changeSelectState && sortIsExist ? sortIsExist?.toString() : 'name');

        this.addressBarMaker(query, sort, null);
        this.setState({
            changeInputState: false,
            changeSelectState: false,
            currentPage: 1
        })
    }

    async componentDidMount(): Promise<void> {
        this.setState({ progressBar: true })
        const heroesResult = await getHeroes(this.state, this.props);
        this.setState({
            heroes: heroesResult.data.data.results,
            totalOfItems: heroesResult.data.data.total,
            progressBar: false
        });
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState): Promise<void> {
        if (this.props.location !== prevProps.location || this.state.offset !== prevState.offset) {
            this.setState({ progressBar: true })
            const heroesResult = await getHeroes(this.state, this.props);
            this.setState({
                heroes: heroesResult.data.data.results,
                totalOfItems: heroesResult.data.data.total,
                progressBar: false
            });
        }
    }

    render(): JSX.Element {
        const heroes = { heroes: this.state.heroes };
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
                {this.state.progressBar ? <ProgressBarIndeterminate /> : <div style={{ height: '8px' }} />}
                <HeroList {...heroes} />
                <PaginationRounded
                    count={Math.ceil((this.state.totalOfItems) / 4)}
                    setCurrentPage={this.setCurrentPage}
                    page={pageInAddressBar ? parseInt(pageInAddressBar) : this.state.currentPage}
                />
            </div>
        )
    }
}

export default HomePage
