import React from "react";
import Comics from "../Comics/Comics";
import Header from "../Header/Header";
import './ComicsPage.css'
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import PaginationRounded from '../PaginationRounded';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router-dom";
import { getComics } from '../api'
import { getComicsHero } from '../api'

type IProps = {
    match: {
        params: {
            id: number
        }
    },
    location: { search: string },
    history: RouteComponentProps["history"],
}

export type IComicsPops = IProps;
export interface IComics {
    path: string,
    description: string,
    title: string,
    id: number,
    thumbnail: { path: string }
}

export interface IGetComics {
    offset: number,
    limit: number,
}

interface IState extends IGetComics {
    comics: IComics[],
    heroName: string,
    progresBar: boolean,
    currentPage: number,
    totalOfItems: number
}

class ComicsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.setCurrentPage = this.setCurrentPage.bind(this)
        this.state = {
            comics: [],
            heroName: '',
            progresBar: false,
            offset: 0,
            limit: 4,
            currentPage: 1,
            totalOfItems: 0
        }
    }

    addressBarMaker = (pageArg: number | null): void => {
        const queryStringGetPage = queryString.parse(this.props.location.search).page;
        const page = pageArg ? pageArg : (queryStringGetPage ? queryStringGetPage : null);
        this.props.history.push('?page=' + page);
    }

    setCurrentPage = (currentPage: number): void => {
        this.setState({
            currentPage: currentPage,
            offset: ((currentPage - 1) * 4)
        });
        this.addressBarMaker(currentPage);
    }

    async componentDidMount(): Promise<void> {
        this.setState({ progresBar: true });
        const requestHero = await getComicsHero(this.props);
        const request = await getComics(this.state, this.props);
        this.setState({
            heroName: requestHero.data.data.results[0].name,
            comics: request.data.data.results,
            totalOfItems: request.data.data.total,
            progresBar: false
        });
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState): Promise<void> {
        if (this.props.location !== prevProps.location || this.state.currentPage !== prevState.currentPage) {
            this.setState({ progresBar: true });
            const requestHero = await getComicsHero(this.props);
            const request = await getComics(this.state, this.props);
            this.setState({
                heroName: requestHero.data.data.results[0].name,
                comics: request.data.data.results,
                totalOfItems: request.data.data.total,
                progresBar: false
            });
        }
    }

    render(): JSX.Element {

        return (
            <div className='comics_main'>
                <Header />
                <div className='comics_main__title'>
                    <h1 className='comics_main__title-text'>{this.state.heroName} comics</h1>
                </div>
                {this.state.progresBar ? <ProgressBarIndeterminate /> : <div style={{ height: '8px' }} />}
                {this.state.comics.map((item) => <Comics key={item.id} comics={item} />)}
                <PaginationRounded
                    count={Math.ceil((this.state.totalOfItems) / 4)}
                    setCurrentPage={this.setCurrentPage}
                    page={this.state.currentPage}
                />
            </div>
        )
    }
}

export default ComicsPage
