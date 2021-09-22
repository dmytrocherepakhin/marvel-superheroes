import { ISetHeroParameter } from "../actions/actions"
import { IHero, IHeroesState } from "../../components/HomePage/HomePage"
import {
    FETCH_HEROES,
    FETCH_HEROES_SAGA,
    SET_HEROES_CURRENT_PAGE,
    SET_HEROES_NAME_START_WITH,
    SET_HEROES_ORDER_BY
} from "../actionTypes/types"

interface IHeroInitialState {
    heroes: IHero[],
    totalOfItems: number,
    nameStartsWith: string,
    orderBy: string,
    currentHeroesPage: number
}

const initialState = {
    heroes: [],
    nameStartsWith: '',
    totalOfItems: 0,
    orderBy: 'name',
    currentHeroesPage: 1
}

export default function heroesReducer(state: IHeroesState | undefined, action: ISetHeroParameter): IHeroInitialState {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case SET_HEROES_NAME_START_WITH:
            return {
                ...state,
                nameStartsWith: action.payload
            }
        case SET_HEROES_ORDER_BY:
            return {
                ...state,
                orderBy: action.payload
            };
        case SET_HEROES_CURRENT_PAGE:
            return {
                ...state,
                currentHeroesPage: action.currentHeroesPage
            };
        case FETCH_HEROES:
            return {
                ...state,
                heroes: action.heroes,
                totalOfItems: action.totalOfItems
            };
        case FETCH_HEROES_SAGA:
            return {
                ...state
            };
        default:
            return state
    }
}
