import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getComics, getComicsHero } from "../../components/api";
import { fetchComics, fetchComicsHero, hideLoader, IFetchComicsSaga, showLoader } from "../actions/actions";
import { FETCH_COMICS_SAGA } from "../actionTypes/types";

export function* sagaComicsWatcher(): Generator {
    yield takeEvery(FETCH_COMICS_SAGA, sagaComicsWorker)
}

function* sagaComicsWorker({ payload }: IFetchComicsSaga) {
    try {
        yield put(showLoader())
        const comicsHeroResult: AxiosResponse = yield call(getComicsHero, payload.heroId)
        const comicsResult: AxiosResponse = yield call(getComics, payload.currentComicsPage, payload.page, payload.heroId)
        yield put(fetchComicsHero(comicsHeroResult.data.data.results[0].name))
        yield put(fetchComics(comicsResult.data.data.results, comicsResult.data.data.total))
        yield put(hideLoader())
    } catch (e) {
        yield (console.log('Error'))
        yield put(hideLoader())
    }
}
