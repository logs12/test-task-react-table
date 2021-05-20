import axios from "axios";
import { all, call, takeLatest, put } from "redux-saga/effects";
import API from "@/rest";
import { apiData } from "@/rest/constants";
import * as DATA from "@/constants/data";

function* handleFetchData(action) {
  try {
    const { page, limits } = action;
    const responseData = yield call(API.get, apiData, {
      params: { _page: page, _limits: limits },
    });
    yield put({
      type: DATA.FETCH_DATA_SUCCESS,
      data: responseData.data,
    });
  } catch (e) {
    if (!axios.isCancel(e)) {
      yield put({
        type: DATA.FETCH_DATA_ERROR,
        error: { e },
      });
    }
  }
}

function* watchFetchData() {
  yield takeLatest(DATA.FETCH_DATA, handleFetchData);
}

export default function* dataSaga() {
  yield all([watchFetchData()]);
}
