import {createSelector} from 'reselect';
import ActiveMark from "../../common/ActiveMark";
import React from 'react';

export const showActive = createSelector(
    (state) => state.posts,
    (posts) => posts.map(post => {
        return post = {...post, showActive: <ActiveMark active={post.active}/>}
    })
);

