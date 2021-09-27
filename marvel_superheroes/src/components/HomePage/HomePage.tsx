/* eslint-disable prettier/prettier */
import React from "react"
import HeroList from "../HeroList/HeroList"
import Header from "../Header/Header"
import "./HomePage.css"
import ProgressBarIndeterminate from "../ProgressBarIndeterminate"
import queryString from "query-string"
import { RouteComponentProps } from "react-router"
import HeroSearchBar from "../HeroSearchBar/HeroSearchBar"
import PaginationRounded from "../PaginationRounded"
import { connect } from "react-redux"
import { getHeroesSaga, IGetHeroesSaga } from "../../store/actions/actions"
import { store } from "../../index"

export interface IHero {
  id: number
  name: string
  thumbnail: { path: string }
  description: string
  path: string
}

export type IHeroProps = RouteComponentProps & IGetHeroes

interface IGetHeroes {
  heroes: IHero[]
  totalOfItems: number
  progressBar: boolean
  getHeroesSaga(
    currentHeroesPage: number,
    orderBy: string,
    nameStartsWith?: string
  ): IGetHeroesSaga
  error: string
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

class HomePage extends React.Component<IHeroProps> {
  constructor(props: IHeroProps) {
    super(props)
    this.searchBarHandleSubmit = this.searchBarHandleSubmit.bind(this)
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  addressBarMaker = (
    queryArg?: string,
    sortArg?: string,
    pageArg?: number | null
  ): void => {
    const { query, sort, page } = queryString.parse(this.props.location.search)
    const newQuery = queryArg ? queryArg : query ? query?.toString() : ""
    const newSort = sortArg ? sortArg : sort ? sort?.toString() : ""
    const newPage = pageArg ? pageArg : page ? page : null

    const queryData = newQuery ? "query=" + newQuery : ""
    const sortData =
      newSort && newQuery
        ? "&sort=" + newSort
        : newSort
          ? "sort=" + newSort
          : ""
    const pagedata =
      (newSort || newQuery) && newPage
        ? "&page=" + newPage
        : newPage
          ? "page=" + newPage
          : ""
    this.props.history.push("?" + queryData + sortData + pagedata)
  }

  setCurrentPage = (currentHeroesPage: number): void => {
    this.addressBarMaker("", "", currentHeroesPage)
  }

  searchBarHandleSubmit = (nameStartsWith: string, orderBy: string): void => {
    this.addressBarMaker(nameStartsWith, orderBy, 1)
  }

  makeRequest = async (): Promise<void> => {
    const { query, sort, page } = queryString.parse(this.props.location.search)
    const orderBy = sort ? sort.toString() : "name"
    const currentHeroesPage = page ? parseInt(page.toString()) : 1
    const nameStartsWith = query ? query.toString() : ""
    this.props.getHeroesSaga(currentHeroesPage, orderBy, nameStartsWith)
  }

  async componentDidMount(): Promise<void> {
    this.makeRequest()
  }

  async componentDidUpdate(prevProps: IHeroProps): Promise<void> {
    if (this.props.location !== prevProps.location) {
      this.makeRequest()
    }
  }

  render(): JSX.Element {
    const heroes = { heroes: this.props.heroes }
    const queryStringParse = queryString.parse(this.props.location.search)
    const query = queryStringParse.query?.toString()
    const sort = queryStringParse.sort?.toString()
    const pageInAddressBar = queryStringParse.page?.toString()
    const err = this.props.error
    if (err) {
      console.log(err)
    }

    return (
      <div className="hero_main">
        <Header />
        <HeroSearchBar
          query={query ? query : null}
          sort={sort ? sort : null}
          searchBarHandleSubmit={this.searchBarHandleSubmit}
        />
        {this.props.progressBar ? (
          <ProgressBarIndeterminate />
        ) : (
          <div style={{ height: "8px" }} />
        )}
        <HeroList {...heroes} />
        <PaginationRounded
          count={Math.ceil(this.props.totalOfItems / 4)}
          setCurrentPage={this.setCurrentPage}
          page={pageInAddressBar ? parseInt(pageInAddressBar) : 1}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    heroes: state.heroesReducer.heroes,
    totalOfItems: state.heroesReducer.totalOfItems,
    progressBar: state.heroesReducer.progressBar,
    error: state.heroesReducer.error,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getHeroesSaga: (
      currentHeroesPage: number,
      orderBy: string,
      nameStartsWith: string
    ) => dispatch(getHeroesSaga(currentHeroesPage, orderBy, nameStartsWith)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(HomePage)
