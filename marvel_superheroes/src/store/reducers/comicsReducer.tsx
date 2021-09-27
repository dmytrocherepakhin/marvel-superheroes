import { IComics } from "../../components/ComicsPage/ComicsPage"
import {
  IGetComicsError,
  IGetComicsRequest,
  IGetComicsSaga,
  IGetComicsSuccess,
} from "../actions/actions"
import {
  GET_COMICS_ERROR,
  GET_COMICS_REQUEST,
  GET_COMICS_SUCCESS,
} from "../actionTypes/types"

interface IComicsState {
  comics: IComics[]
  totalOfItems: number
  progressBar: boolean
  heroName: string
  error: string
}

const initialState = {
  comics: [],
  totalOfItems: 0,
  progressBar: false,
  heroName: "",
  error: "",
}

export default function heroesReducer(
  state: IComicsState | undefined,
  action:
    | IGetComicsRequest
    | IGetComicsSuccess
    | IGetComicsError
    | IGetComicsSaga
): IComicsState {
  if (typeof state === "undefined") {
    return initialState
  }
  switch (action.type) {
    case GET_COMICS_REQUEST:
      return {
        ...state,
        progressBar: action.payload.progressBar,
      }
    case GET_COMICS_SUCCESS:
      return {
        ...state,
        heroName: action.payload.heroName,
        comics: action.payload.comics,
        totalOfItems: action.payload.totalOfItems,
        progressBar: action.payload.progressBar,
      }
    case GET_COMICS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        progressBar: action.payload.progressBar,
      }
    default:
      return state
  }
}
