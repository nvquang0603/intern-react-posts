import React from 'react';

let initialState = {
    posts: [],
    post:
        {
            id: 0,
            title: '',
            content: '',
            author: '',
            active: false
        }
};

let postFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return {...state};
    }
};
export default postFilterReducer;