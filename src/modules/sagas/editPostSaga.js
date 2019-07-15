import { takeLatest, call, put, delay } from "redux-saga/effects";
import axios from "axios";
import {toastr} from "react-redux-toastr";

export default function* () {
    yield takeLatest("API_CALL_EDIT_REQUEST", editPostSaga);
    yield takeLatest("API_CALL_SAVE_EDIT_REQUEST", saveEditSaga);
}

function* editPostSaga(action) {
    try {
        const response = yield call(editPost, action);
        const data = response.data;
        yield put({ type: "API_CALL_EDIT_SUCCESS", data });

    } catch (error) {
        yield put({ type: "API_CALL_EDIT_FAILURE", error });
    }
}

function editPost(action) {
    return axios({
        method: "GET",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts/${action.post}`
    });
}

function* saveEditSaga(action) {
    try {
        const response = yield call(saveEditPost, action.payload);
        const post = response.data;
        const {history} = action.payload;
        yield put({ type: "API_CALL_SAVE_EDIT_SUCCESS", post });
        yield history.push('/list');
        yield delay(1000);
        yield toastr.success('Finish', 'Post #' + action.payload.post.id + ' has been updated')

    } catch (error) {
        yield put({ type: "API_CALL_EDIT_SAVE_FAILURE", error });
        yield toastr.error('An error has been occurred')
    }
}

function saveEditPost(action) {
    return axios({
        method: "PUT",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts/${action.post.id}`,
        data: {
            title: action.post.title,
            content: action.post.content,
            author: action.post.author,
            active: action.post.active
        },
    });
}