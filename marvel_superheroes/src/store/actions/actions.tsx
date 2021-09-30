import { IComics } from '../../components/ComicsPage/ComicsPage';
import { IHero } from '../../components/HomePage/HomePage';
import {
  GET_COMICS_ERROR,
  GET_COMICS_REQUEST,
  GET_COMICS_SUCCESS,
  GET_COMICS_SAGA,
  GET_HEROES_ERROR,
  GET_HEROES_REQUEST,
  GET_HEROES_SUCCESS,
  GET_HEROES_SAGA
} from '../actionTypes/types';

export interface IGetHeroesSaga {
  type: typeof GET_HEROES_SAGA;
  payload: {
    currentHeroesPage: number;
    orderBy: string;
    nameStartsWith?: string;
  };
}

export interface IGetHeroesRequest {
  type: typeof GET_HEROES_REQUEST;
  payload: {
    progressBar: boolean;
  };
}

export interface IGetHeroesSuccess {
  type: typeof GET_HEROES_SUCCESS;
  payload: {
    heroes: IHero[];
    totalOfItems: number;
    progressBar: boolean;
  };
}

export interface IGetHeroesError {
  type: typeof GET_HEROES_ERROR;
  payload: {
    error: string;
    progressBar: boolean;
  };
}

export interface IGetComicsSaga {
  type: typeof GET_COMICS_SAGA;
  payload: {
    heroId: number;
    currentComicsPage: number;
  };
}

export interface IGetComicsRequest {
  type: typeof GET_COMICS_REQUEST;
  payload: {
    progressBar: boolean;
  };
}

export interface IGetComicsSuccess {
  type: typeof GET_COMICS_SUCCESS;
  payload: {
    heroName: string;
    comics: IComics[];
    totalOfItems: number;
    progressBar: boolean;
  };
}

export interface IGetComicsError {
  type: typeof GET_COMICS_ERROR;
  payload: {
    error: string;
    progressBar: boolean;
  };
}

export function getHeroesSaga(
  currentHeroesPage: number,
  orderBy: string,
  nameStartsWith?: string
): IGetHeroesSaga {
  return {
    type: GET_HEROES_SAGA,
    payload: {
      currentHeroesPage,
      orderBy,
      nameStartsWith
    }
  };
}

export function getHeroesRequest(progressBar: boolean): IGetHeroesRequest {
  return {
    type: GET_HEROES_REQUEST,
    payload: {
      progressBar
    }
  };
}

export function getHeroesSuccess(
  heroes: IHero[],
  totalOfItems: number,
  progressBar: boolean
): IGetHeroesSuccess {
  return {
    type: GET_HEROES_SUCCESS,
    payload: {
      heroes,
      totalOfItems,
      progressBar
    }
  };
}

export function getHeroesError(
  error: string,
  progressBar: boolean
): IGetHeroesError {
  return {
    type: GET_HEROES_ERROR,
    payload: {
      error,
      progressBar
    }
  };
}

export function getComicsSaga(
  heroId: number,
  currentComicsPage: number
): IGetComicsSaga {
  return {
    type: GET_COMICS_SAGA,
    payload: {
      heroId,
      currentComicsPage
    }
  };
}

export function getComicsRequest(progressBar: boolean): IGetComicsRequest {
  return {
    type: GET_COMICS_REQUEST,
    payload: {
      progressBar
    }
  };
}

export function getComicsSuccess(
  heroName: string,
  comics: IComics[],
  totalOfItems: number,
  progressBar: boolean
): IGetComicsSuccess {
  return {
    type: GET_COMICS_SUCCESS,
    payload: {
      heroName,
      comics,
      totalOfItems,
      progressBar
    }
  };
}
export function getComicsError(
  error: string,
  progressBar: boolean
): IGetComicsError {
  return {
    type: GET_COMICS_ERROR,
    payload: {
      error,
      progressBar
    }
  };
}
