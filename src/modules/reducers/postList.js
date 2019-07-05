import React from 'react';
import DataDefault from '../../common/Data';

const DEFAULT_POSTS = DataDefault.DATA;

let initialState = {
    posts: [...DEFAULT_POSTS],
    post: {
        id: '',
        title: '',
        content: '',
        author: '',
        active: false
    },
    errors: {},
    version: 1,
};

let postListReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return {...state};
    }
};
export default postListReducer;