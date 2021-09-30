import { IHero } from '../../components/HomePage/HomePage';
import {
  IGetHeroesError,
  IGetHeroesRequest,
  IGetHeroesSaga,
  IGetHeroesSuccess
} from '../actions/actions';
import {
  GET_HEROES_REQUEST,
  GET_HEROES_SUCCESS,
  GET_HEROES_ERROR
} from '../actionTypes/types';

interface IHeroState {
  heroes: IHero[];
  totalOfItems: number;
  progressBar: boolean;
  error: string;
}

const initialState = {
  heroes: [],
  totalOfItems: 0,
  progressBar: false,
  error: ''
};

export default function heroesReducer(
  state: IHeroState | undefined,
  action:
    | IGetHeroesRequest
    | IGetHeroesSuccess
    | IGetHeroesError
    | IGetHeroesSaga
): IHeroState {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case GET_HEROES_REQUEST:
      return {
        ...state,
        progressBar: action.payload.progressBar
      };
    case GET_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload.heroes,
        totalOfItems: action.payload.totalOfItems,
        progressBar: action.payload.progressBar
      };
    case GET_HEROES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        progressBar: action.payload.progressBar
      };
    default:
      return state;
  }
}
