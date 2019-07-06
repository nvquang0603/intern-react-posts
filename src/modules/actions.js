import * as types from './../constants/ActionTypes';
export const listPost = (posts) => {
    return {
        type: types.LIST_POST,
        posts
    }
};
export const addPost = (post) => {
    return {
        type: types.ADD_POST,
        post
    }
};

export const deletePost = (post) => {
    return {
        type: types.DELETE_POST,
        post
    }
};
export const editPost = (post) => {
    return {
        type: types.EDIT_POST,
        post
    }
};
export const saveEditPost = (post) => {
    return {
        type: types.SAVE_EDIT_POST,
        post
    }
};