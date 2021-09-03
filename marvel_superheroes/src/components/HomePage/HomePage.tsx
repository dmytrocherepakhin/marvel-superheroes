import React from "react";
import HeroList from "../HeroList/HeroList";
import Header from "../Header/Header";
import './HomePage.css';
import axios from "axios";
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import queryString from 'query-string';
import { RouteComponentProps } from "react-router";
import HeroSearchBar from "../HeroSearchBar/HeroSearchBar";
import PaginationRounded from '../PaginationRounded';

export interface IHero {
    id: number,
    name: string,
    thumbnail: { path: string },
    description: string,
    path: string
}

type IProps = RouteComponentProps;

interface IState {
    heroes: IHero[],
    offset: number,
    nameStartsWith: string,
    totalOfItems: number,
    orderBy: string,
    limit: number,
    changeInputState: boolean,
    changeSelectState: boolean,
    currentPage: number,
    progressBar: boolean,
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
        const query = queryArg ? queryArg : (queryString.parse(this.props.location.search).query ? queryString.parse(this.props.location.search).query?.toString() : '');
        const sort = sortArg ? sortArg : (queryString.parse(this.props.location.search).sort ? queryString.parse(this.props.location.search).sort?.toString() : '');
        const page = pageArg ? pageArg : (queryString.parse(this.props.location.search).page ? queryString.parse(this.props.location.search).page : null);

        this.props.history.push('?' + (query ? 'query=' + query : '') + (sort && query ? '&sort=' + sort : (sort ? 'sort=' + sort : '')) + (((sort || query) && page) ? '&page=' + page : (page ? 'page=' + page : '')));

        console.log('?' + (query ? ('query=' + query) : '') + (sort && query ? ('&sort=' + sort) : (sort ? ('sort=' + sort) : '')) + (((sort || query) && page) ? ('&page=' + page) : (page ? ('page=' + page) : '')))
    }

    setCurrentPage = (currentPage: number): void => {
        this.setState({
            currentPage: currentPage,
            offset: ((currentPage - 1) * 4)
        });
        this.addressBarMaker('', '', currentPage);
    }

    searchBarHandleSubmit = (changeInputState: boolean, nameStartsWith: string, changeSelectState: boolean, orderBy: string): void => {

        const query = changeInputState ? nameStartsWith : ((!changeInputState && queryString.parse(this.props.location.search).query?.toString()) ? (queryString.parse(this.props.location.search).query?.toString()) : '');

        const sort = (changeSelectState) ? (orderBy) : ((!changeSelectState && queryString.parse(this.props.location.search).sort) ? (queryString.parse(this.props.location.search).sort?.toString()) : 'name');

        this.addressBarMaker(query, sort, null);
        this.setState({
            changeInputState: false,
            changeSelectState: false,
            currentPage: 1
        })
    }

    dataRequest = (): void => {
        const limit = this.state.limit;

        this.setState({ progressBar: true })
        let nameStartsWith = this.state.nameStartsWith;
        let orderBy = this.state.orderBy;
        let offset = this.state.offset;
        const query = queryString.parse(this.props.location.search).query;
        const sort = queryString.parse(this.props.location.search).sort;
        const page = queryString.parse(this.props.location.search).page;

        if (query) {
            nameStartsWith = "nameStartsWith=" + query
        }
        if (sort) {
            orderBy = sort.toString()
        }
        if (page) { offset = (parseInt(page.toString()) - 1) * 4 }

        const url = `https://gateway.marvel.com/v1/public/characters?${nameStartsWith}&limit=${limit}&offset=${offset}&orderBy=${orderBy}&apikey=509a45843dd4b9f38128cf260158ab88`;

        axios
            .get(url)
            .then((request) => {
                if (request.status === 200) {
                    this.setState({
                        heroes: request.data.data.results,
                        totalOfItems: request.data.data.total,
                        progressBar: false
                    });
                }
            })
            .catch();
    }

    componentDidMount(): void {
        this.setState({ progressBar: true })
        this.dataRequest();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.props.location !== prevProps.location || this.state.offset !== prevState.offset) {
            this.setState({ progressBar: true })
            this.dataRequest();
        }
    }

    render(): JSX.Element {
        const heroes = { heroes: this.state.heroes }
        const query = queryString.parse(this.props.location.search).query?.toString();
        const sort = queryString.parse(this.props.location.search).sort?.toString();

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
                    page={this.state.currentPage}
                />
            </div>
        )
    }
}

export default HomePage
