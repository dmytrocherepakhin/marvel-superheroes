import React from "react";
import Comics from "../Comics/Comics";
import Header from "../Header/Header";
import './ComicsPage.css'
import axios from "axios";
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import PaginationRounded from '../PaginationRounded';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router-dom";

type IProps = {
    match: {
        params: {
            id: number
        }
    },
    location: { search: string },
    history: RouteComponentProps["history"],
}


export interface IComics {
    path: string,
    description: string,
    title: string,
    id: number,
    thumbnail: { path: string }
}

interface IState {
    comics: IComics[],
    heroName: string,
    progresBar: boolean,
    offset: number,
    limit: number,
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
        const page = pageArg ? pageArg : (queryString.parse(this.props.location.search).page ? queryString.parse(this.props.location.search).page : null);
        this.props.history.push('?page=' + page);
    }

    setCurrentPage = (currentPage: number): void => {
        this.setState({
            currentPage: currentPage,
            offset: ((currentPage - 1) * 4)
        });
        this.addressBarMaker(currentPage);
    }

    dataRequest = (): void => {
        this.setState({ progresBar: true })
        const limit = this.state.limit;
        let offset = this.state.offset;
        const page = queryString.parse(this.props.location.search).page;

        if (page) { offset = (parseInt(page.toString()) - 1) * 4 }

        const url = `https://gateway.marvel.com:443/v1/public/characters/${this.props.match.params.id}/comics?limit=${limit}&offset=${offset}&apikey=ed5b518d820904432c7454bbd8766afa`;

        const urlHero = `https://gateway.marvel.com:443/v1/public/characters/${this.props.match.params.id}?apikey=ed5b518d820904432c7454bbd8766afa`;

        axios
            .get(urlHero)
            .then((request) => {
                if (request.status === 200) {
                    this.setState({
                        heroName: request.data.data.results[0].name,
                    });
                }
            })
            .catch();

        axios
            .get(url)
            .then((request) => {
                if (request.status === 200) {
                    this.setState({
                        comics: request.data.data.results,
                        totalOfItems: request.data.data.total,
                        progresBar: false
                    });
                }
            })
            .catch();
    }

    componentDidMount(): void {
        this.dataRequest();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.props.location !== prevProps.location || this.state.currentPage !== prevState.currentPage) {
            this.dataRequest();
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
                {this.state.comics.map((item, index) => <Comics key={item.id} comics={this.state.comics[index]} />)}
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
