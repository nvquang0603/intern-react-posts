import * as types from './../../constants/ActionTypes';

let initialState = {
    posts: [],
    post: {
        id: 0,
        title: '',
        content: '',
        author: '',
        active: false
    },
    errors: {},
    version: 1
};

let postTableReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LIST_POST:
            return {
                ...state,
                posts: action.posts,
                post: {
                    id: 0,
                    title: '',
                    content: '',
                    author: '',
                    active: false
                }
            };

        case types.ADD_POST:
            return {
                posts: [
                    {
                        title: action.post.title,
                        content: action.post.content,
                        author: action.post.author,
                        active: action.post.active
                    },
                    ...state.posts
                ],
                post:
                    {
                        id: 0,
                        title: '',
                        content: '',
                        author: '',
                        active: false
                    }
            };

        case types.DELETE_POST:
            let {posts} = state;
            let items = posts.filter((item) => {
                return item.id !== action.post.id
            });
            return {
                ...state,
                posts: items,
                post: {text: '', id: 0}
            };

        case types.EDIT_POST:
            return {
                ...state,
                post: {...action.post}
            };

        case types.SAVE_EDIT_POST:
            let editPosts = state.posts;
            let newItem = editPosts.map(item => {
                if (action.post.id === item.id){
                    item.title = action.post.title;
                    item.content = action.post.content;
                    item.author = action.post.author;
                    item.active = action.post.active;
                }
                return item;
            });
            return {
                ...state,
                posts: newItem,
                post:
                    {
                        id: 0,
                        title: '',
                        content: '',
                        author: '',
                        active: false
                    }
            };

        default: return {
            ...state,
            posts: state.posts
        };
    }
};
export default postTableReducer;