import { IComics } from '../../components/ComicsPage/ComicsPage'
import { IHero } from '../../components/HomePage/HomePage'
import {
    SET_HEROES_NAME_START_WITH,
    SET_HEROES_ORDER_BY,
    SET_HEROES_CURRENT_PAGE,
    SET_COMICS_CURRENT_PAGE,
    FETCH_HEROES,
    FETCH_COMICS,
    FETCH_COMICS_HERO,
    SHOW_LOADER,
    HIDE_LOADER,
    FETCH_HEROES_SAGA,
    FETCH_COMICS_SAGA,
} from '../actionTypes/types'

export interface ISetHeroParameter {
    currentHeroesPage: number
    heroes: IHero[],
    totalOfItems: number,
    type: string,
    payload: string
}

export interface ISetComicsParameter {
    heroName: string
    comics: IComics[]
    totalOfItems: number
    type: string,
    payload: number
}

export interface ISetLoaderParameter {
    type: string,
}

export interface ISetHeroesNameStartWith {
    type: string,
    payload: string
}

export interface ISetHeroesOrderBy {
    type: string,
    payload: string
}

export interface ISetHeroesCurrentPage {
    type: string,
    payload: number
}

export interface ISetComicsCurrentPage {
    type: string,
    payload: number
}

export interface ILoader {
    type: string,
}

export interface IFetchHeroes {
    type: string,
    heroes: IHero[],
    totalOfItems: number
}

export interface IFetchHeroesSaga {
    type: string,
    payload: {
        orderBy: string,
        currentHeroesPage: number,
        query: string | string[] | null,
        sort: string | string[] | null,
        page: string | string[] | null
    }
}

export interface IFetchComicsSaga {
    type: string,
    payload: {
        page: string | string[] | null,
        heroId: number,
        currentComicsPage: number
    }
}

export interface IFetchComics {
    type: string,
    comics: IComics[],
    totalOfItems: number
}

export interface IFetchComicsHero {
    type: string,
    heroName: string
}

export function setHeroesNameStartWith(nameStartsWith: string): ISetHeroesNameStartWith {
    return {
        type: SET_HEROES_NAME_START_WITH,
        payload: nameStartsWith
    }
}

export function setHeroesOrderBy(orderBy: string): ISetHeroesOrderBy {
    return {
        type: SET_HEROES_ORDER_BY,
        payload: orderBy
    }
}

export function setHeroesCurrentPage(currentHeroesPage: number): ISetHeroesCurrentPage {
    return {
        type: SET_HEROES_CURRENT_PAGE,
        payload: currentHeroesPage
    }
}

export function setComicsCurrentPage(currentComicsPage: number): ISetComicsCurrentPage {
    return {
        type: SET_COMICS_CURRENT_PAGE,
        payload: currentComicsPage
    }
}

export function fetchHeroes(heroes: IHero[], totalOfItems: number): IFetchHeroes {
    return {
        type: FETCH_HEROES,
        heroes,
        totalOfItems
    }
}

export function fetchComicsHero(heroName: string): IFetchComicsHero {
    return {
        type: FETCH_COMICS_HERO,
        heroName
    }
}
export function fetchComics(comics: IComics[], totalOfItems: number): IFetchComics {
    return {
        type: FETCH_COMICS,
        comics,
        totalOfItems
    }
}

export function showLoader(): ILoader {
    return {
        type: SHOW_LOADER,
    }
}

export function hideLoader(): ILoader {
    return {
        type: HIDE_LOADER,
    }
}

export function fetchHeroesSaga(
    orderBy: string,
    currentHeroesPage: number,
    query: string | string[] | null,
    sort: string | string[] | null,
    page: string | string[] | null): IFetchHeroesSaga {
    return {
        type: FETCH_HEROES_SAGA,
        payload: {
            orderBy,
            currentHeroesPage,
            query,
            sort,
            page
        }
    }
}

export function fetchComicsSaga(
    page: string | string[] | null,
    heroId: number,
    currentComicsPage: number
): IFetchComicsSaga {
    return {
        type: FETCH_COMICS_SAGA,
        payload: {
            page,
            heroId,
            currentComicsPage
        }
    }
}
