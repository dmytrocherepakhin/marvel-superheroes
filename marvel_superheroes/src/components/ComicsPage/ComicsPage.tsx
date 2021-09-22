import React from "react";
import Comics from "../Comics/Comics";
import Header from "../Header/Header";
import './ComicsPage.css'
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import PaginationRounded from '../PaginationRounded';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchComics, fetchComicsHero, fetchComicsSaga, hideLoader, IFetchComics, IFetchComicsHero, IFetchComicsSaga, ILoader, ISetComicsCurrentPage, setComicsCurrentPage, showLoader } from "../../store/actions/actions";
import { AppDispatch, RootState } from "../HomePage/HomePage";

export type IComicsPops = {
    match: {
        params: {
            id: number
        }
    },
    location: { search: string },
    history: RouteComponentProps["history"],
    currentComicsPage: number,
    progressBar: boolean,
    heroName: string,
    comics: IComics[],
    totalOfItems: number,
    setComicsCurrentPage(currentComicsPage: number): ISetComicsCurrentPage,
    fetchComics(comics: IComics[], totalOfItems: number): IFetchComics,
    fetchComicsHero(heroName: string): IFetchComicsHero,
    hideLoader(): ILoader,
    showLoader(): ILoader,
    fetchComicsSaga(page: string | string[] | null, heroId: number, currentComicsPage: number): IFetchComicsSaga
}

export interface IComicsState {
    currentComicsPage: number,
    comics: IComics[],
    totalOfItems: number,
    heroName: string
}

export interface IComics {
    path: string,
    description: string,
    title: string,
    id: number,
    thumbnail: { path: string }
}

class ComicsPage extends React.Component<IComicsPops> {
    constructor(props: IComicsPops) {
        super(props)
        this.setCurrentPage = this.setCurrentPage.bind(this)
    }

    addressBarMaker = (pageArg: number | null): void => {
        const queryStringGetPage = queryString.parse(this.props.location.search).page;
        const page = pageArg ? pageArg : (queryStringGetPage ? queryStringGetPage : null);
        this.props.history.push('?page=' + page);
    }

    setCurrentPage = (currentComicsPage: number): void => {
        this.props.setComicsCurrentPage(currentComicsPage);
        this.addressBarMaker(currentComicsPage);
    }

    makeRequest = async (): Promise<void> => {
        const page = queryString.parse(this.props.location.search).page;
        const heroId = this.props.match.params.id;
        const currentComicsPage = this.props.currentComicsPage;

        this.props.fetchComicsSaga(page, heroId, currentComicsPage)
    }

    async componentDidMount(): Promise<void> {
        this.makeRequest()
    }

    async componentDidUpdate(prevProps: IComicsPops): Promise<void> {
        if (this.props.location !== prevProps.location || this.props.currentComicsPage !== prevProps.currentComicsPage) {
            this.makeRequest()
        }
    }

    render(): JSX.Element {
        const queryStringParse = queryString.parse(this.props.location.search);
        const pageInAddressBar = queryStringParse.page?.toString();

        return (
            <div className='comics_main'>
                <Header />
                <div className='comics_main__title'>
                    <h1 className='comics_main__title-text'>{this.props.heroName} comics</h1>
                </div>
                {this.props.progressBar ? <ProgressBarIndeterminate /> : <div style={{ height: '8px' }} />}
                {this.props.comics.map((item) => <Comics key={item.id} comics={item} />)}
                <PaginationRounded
                    count={Math.ceil((this.props.totalOfItems) / 4)}
                    setCurrentPage={this.setCurrentPage}
                    page={pageInAddressBar ? parseInt(pageInAddressBar) : this.props.currentComicsPage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentComicsPage: state.comicsReducer.currentComicsPage,
        progressBar: state.loaderReducer.progressBar,
        heroName: state.comicsReducer.heroName,
        comics: state.comicsReducer.comics,
        totalOfItems: state.comicsReducer.totalOfItems
    };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setComicsCurrentPage: (currentComicsPage: number) => dispatch(setComicsCurrentPage(currentComicsPage)),
        fetchComics: (comics: IComics[], totalOfItems: number) => dispatch(fetchComics(comics, totalOfItems)),
        fetchComicsHero: (heroName: string) => dispatch(fetchComicsHero(heroName)),
        showLoader: () => dispatch(showLoader()),
        hideLoader: () => dispatch(hideLoader()),
        fetchComicsSaga: (page: string | string[] | null, heroId: number, currentComicsPage: number) => dispatch(fetchComicsSaga(page, heroId, currentComicsPage))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ComicsPage)
