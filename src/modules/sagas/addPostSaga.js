import { takeLatest, call, put} from "redux-saga/effects";
import axios from "axios";
import {toastr} from "react-redux-toastr";
export default function* () {
    yield takeLatest("API_CALL_ADD_REQUEST", addPostSaga);
    yield takeLatest("API_CALL_ADD_SUCCESS", addPostSuccess);
}

function* addPostSaga(action) {
    try {
        yield call(addPost, action);
        yield put({ type: "API_CALL_ADD_SUCCESS", payload: {...action.payload} });

    } catch (error) {
        yield put({ type: "API_CALL_ADD_FAILURE", error });
    }
}

function addPost(action) {
    return axios({
        method: "POST",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts`,
        data: {
            title: action.payload.post.title,
            content: action.payload.post.content,
            author: action.payload.post.author,
            active: action.payload.post.active
        },
    });
}

function addPostSuccess(action) {
    action.payload.history.push('/list');
    toastr.success('Success', 'The post has been added!');
}