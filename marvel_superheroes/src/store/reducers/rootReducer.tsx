import { combineReducers } from "redux"
import comicsReducer from "./comicsReducer"
import heroesReducer from "./heroesReducer"

const rootReducer = combineReducers({
  heroesReducer,
  comicsReducer,
})

export default rootReducer
