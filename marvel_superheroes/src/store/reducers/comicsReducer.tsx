import { IComics, IComicsState } from "../../components/ComicsPage/ComicsPage"
import { ISetComicsParameter } from "../actions/actions"
import { FETCH_COMICS, FETCH_COMICS_HERO, FETCH_COMICS_SAGA, SET_COMICS_CURRENT_PAGE } from "../actionTypes/types"

interface IComicsInitialState {
    currentComicsPage: number,
    comics: IComics[],
    totalOfItems: number
    heroName: string
}

const initialState = {
    comics: [],
    totalOfItems: 0,
    heroName: '',
    currentComicsPage: 1,
}

export default function comicsReducer(state: IComicsState | undefined, action: ISetComicsParameter): IComicsInitialState {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case SET_COMICS_CURRENT_PAGE:
            return {
                ...state,
                currentComicsPage: action.payload
            }
        case FETCH_COMICS:
            return {
                ...state,
                comics: action.comics,
                totalOfItems: action.totalOfItems
            }
        case FETCH_COMICS_HERO:
            return {
                ...state,
                heroName: action.heroName
            }
        case FETCH_COMICS_SAGA:
            return {
                ...state
            };
        default:
            return state
    }
}
