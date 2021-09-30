import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getHeroes } from '../../components/api';
import {
  getHeroesError,
  getHeroesRequest,
  getHeroesSuccess,
  IGetHeroesSaga
} from '../actions/actions';
import { GET_HEROES_SAGA } from '../actionTypes/types';

export function* sagaHeroesWatcher(): Generator {
  yield takeEvery(GET_HEROES_SAGA, sagaHeroesWorker);
}

function* sagaHeroesWorker({ payload }: IGetHeroesSaga) {
  try {
    yield put(getHeroesRequest(true));
    const response: AxiosResponse = yield call(
      getHeroes,
      payload.currentHeroesPage,
      payload.orderBy,
      payload.nameStartsWith
    );
    yield put(
      getHeroesSuccess(
        response.data.data.results,
        response.data.data.total,
        false
      )
    );
  } catch (e) {
    yield put(getHeroesError('Error of getting heroes', false));
  }
}
