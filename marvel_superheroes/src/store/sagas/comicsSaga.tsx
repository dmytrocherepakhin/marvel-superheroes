import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getComics, getComicsHero } from '../../components/api';
import {
  getComicsError,
  getComicsRequest,
  getComicsSuccess,
  IGetComicsSaga
} from '../actions/actions';
import { GET_COMICS_SAGA } from '../actionTypes/types';

export function* sagaComicsWatcher(): Generator {
  yield takeEvery(GET_COMICS_SAGA, sagaHeroesWorker);
}

function* sagaHeroesWorker({ payload }: IGetComicsSaga) {
  try {
    yield put(getComicsRequest(true));
    const responseComicsHero: AxiosResponse = yield call(
      getComicsHero,
      payload.heroId
    );
    const responseComics: AxiosResponse = yield call(
      getComics,
      payload.currentComicsPage,
      payload.heroId
    );
    yield put(
      getComicsSuccess(
        responseComicsHero.data.data.results[0].name,
        responseComics.data.data.results,
        responseComics.data.data.total,
        false
      )
    );
  } catch (e) {
    yield put(getComicsError('Error of getting comics', false));
  }
}
