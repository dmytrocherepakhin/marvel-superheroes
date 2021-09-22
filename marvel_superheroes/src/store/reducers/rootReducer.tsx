import { combineReducers } from 'redux'
import comicsReducer from './comicsReducer'
import heroesReducer from './heroesReducer'
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
    heroesReducer,
    comicsReducer,
    loaderReducer
});

export default rootReducer
