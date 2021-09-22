import { ISetLoaderParameter } from "../actions/actions";
import { HIDE_LOADER, SHOW_LOADER } from "../actionTypes/types";

interface ILoader {
    progressBar: boolean
}

const initialState = {
    progressBar: false
}

export default function loaderReducer(state = initialState, action: ISetLoaderParameter): ILoader {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                progressBar: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                progressBar: false
            }
        default:
            return state
    }
}
