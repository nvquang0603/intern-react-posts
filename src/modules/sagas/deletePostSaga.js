import { takeLatest, call, put} from "redux-saga/effects";
import axios from "axios";
import {toastr} from "react-redux-toastr";

export default function* () {
    yield takeLatest("API_CALL_DELETE_REQUEST", deletePostSaga);
}


function* deletePostSaga(action) {
    try {
        const response = yield call(deletePost, action);
        const data = response.data;
        yield put({ type: "API_CALL_DELETE_SUCCESS", data });
        yield toastr.success('Finish', 'Post #' + action.post.id + ' has been deleted')
    } catch (error) {
        yield put({ type: "API_CALL_DELETE_FAILURE", error });
        yield toastr.error('An error has been occurred')
    }
}

function deletePost(action) {
    return axios({
        method: "DELETE",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts/${action.post.id}`
    });
}