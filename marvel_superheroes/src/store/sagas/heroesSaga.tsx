import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getHeroes } from "../../components/api";
import { fetchHeroes, hideLoader, IFetchHeroesSaga, showLoader } from "../actions/actions";
import { FETCH_HEROES_SAGA } from "../actionTypes/types";

export function* sagaHeroesWatcher(): Generator {
    yield takeEvery(FETCH_HEROES_SAGA, sagaHeroesWorker)
}

function* sagaHeroesWorker({ payload }: IFetchHeroesSaga) {
    try {
        yield put(showLoader())
        const response: AxiosResponse = yield call(getHeroes, payload.orderBy, payload.currentHeroesPage, payload.query, payload.sort, payload.page)
        yield put(fetchHeroes(
            response.data.data.results,
            response.data.data.total
        ))
        yield put(hideLoader())
    } catch (e) {
        yield (console.log('Error'))
        yield put(hideLoader())
    }
}
