import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchProduct() {
    return axios({
        method: "GET",
        url: "http://5d20186c3036a60014d68a1d.mockapi.io/posts"
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        const response = yield call(fetchProduct);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_SUCCESS", data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
    }
}