import { all } from "redux-saga/effects"
import { sagaComicsWatcher } from "./comicsSaga"
import { sagaHeroesWatcher } from "./heroesSaga"

export function* sagaWatcher(): Generator {
  yield all([sagaHeroesWatcher(), sagaComicsWatcher()])
}
