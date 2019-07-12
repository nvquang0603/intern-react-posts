// import api cần thiết. ở đây là createSelector
import { createSelector } from 'reselect';
import ActiveMark from "../../common/ActiveMark";
import React from "react";



export const showActive = createSelector(
    (state) => state.posts,
    (posts) => posts.map(post => {
        return post = {...post, active: <ActiveMark active={post.active}/>}
    })
);

