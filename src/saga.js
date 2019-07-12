import { takeLatest, call, put, delay } from "redux-saga/effects";
import axios from "axios";
import {toastr} from 'react-redux-toastr'
import Constant from "./common/Constant";


export function* watcherSaga() {
    yield takeLatest("API_CALL_REQUEST", workerSaga);
    yield takeLatest("API_CALL_ADD_REQUEST", addSaga);
    yield takeLatest("API_CALL_ADD_SUCCESS", addSagaSuccess);
    // yield takeLatest("API_CALL_ADD_FAILURE", addSagaFailure);
    yield takeLatest("API_CALL_DELETE_REQUEST", deleteSaga);
    // yield takeLatest("API_CALL_DELETE_SUCCESS", deleteSuccess);
    // yield takeLatest("API_CALL_DELETE_FAILURE", deleteFailure);
    yield takeLatest("API_CALL_EDIT_REQUEST", editSaga);
    yield takeLatest("API_CALL_SAVE_EDIT_REQUEST", saveEditSaga);
    // yield takeLatest("API_CALL_SAVE_EDIT_SUCCESS", saveEditSuccess);
    // yield takeLatest("API_CALL_SAVE_EDIT_FAILURE", saveEditFailure);
}

function fetchPost() {
    return axios({
        method: "GET",
        url: "http://5d20186c3036a60014d68a1d.mockapi.io/posts"
    });
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

function addSagaSuccess(action) {
    action.payload.history.push('/list');
    toastr.success('Success', 'The post has been added!');
}

function editPost(action) {
    return axios({
        method: "GET",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts/${action.post}`
    });
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

function deletePost(action) {
    return axios({
        method: "DELETE",
        url: `http://5d20186c3036a60014d68a1d.mockapi.io/posts/${action.post.id}`
    });
}

function* workerSaga() {
    try {
        const response = yield call(fetchPost);
        const data = response.data;
        yield put({ type: "API_CALL_SUCCESS", data });
    } catch (error) {
        yield put({ type: "API_CALL_FAILURE", error });
    }
}

function* addSaga(action) {
    try {
        yield call(addPost, action);
        yield put({ type: "API_CALL_ADD_SUCCESS", payload: {...action.payload} });

    } catch (error) {
        yield put({ type: "API_CALL_ADD_FAILURE", error });
    }
}

function* deleteSaga(action) {
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

function* editSaga(action) {
    try {
        const response = yield call(editPost, action);
        const data = response.data;
        yield put({ type: "API_CALL_EDIT_SUCCESS", data });

    } catch (error) {
        yield put({ type: "API_CALL_EDIT_FAILURE", error });
    }
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
