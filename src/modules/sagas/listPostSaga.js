import { takeLatest, call, put } from "redux-saga/dist/redux-saga-effects-npm-proxy.esm";
import axios from "axios/index";
export default function* () {
    yield takeLatest("API_CALL_REQUEST", listPostSaga);
   }

function* listPostSaga() {
    try {
        const response = yield call(fetchPost);
        const data = response.data;
        yield put({ type: "API_CALL_SUCCESS", data });
    } catch (error) {
        yield put({ type: "API_CALL_FAILURE", error });
    }
}

function fetchPost() {
    return axios({
        method: "GET",
        url: "http://5d20186c3036a60014d68a1d.mockapi.io/posts"
    });
}