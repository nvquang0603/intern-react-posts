import {all, fork} from "redux-saga/effects";
import listPost from "./modules/sagas/listPostSaga";
import addPost from "./modules/sagas/addPostSaga";
import editPost from "./modules/sagas/editPostSaga";
import deletePost from "./modules/sagas/deletePostSaga";

export function* sagaWatcher() {
    yield all([
        fork(listPost),
        fork(addPost),
        fork(editPost),
        fork(deletePost)
    ]);
}