import * as types from './../../common/Constant';

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
        case types.API_CALL_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case types.API_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                posts: action.data
            };
        case types.API_CALL_FAILURE:
            return { ...state,
                fetching: false,
                error: action.error };

        // case types.ADD_POST:
        //     return {
        //         posts: [
        //             {
        //                 title: action.post.title,
        //                 content: action.post.content,
        //                 author: action.post.author,
        //                 active: action.post.active
        //             },
        //             ...state.posts
        //         ],
        //         post:
        //             {
        //                 id: 0,
        //                 title: '',
        //                 content: '',
        //                 author: '',
        //                 active: false
        //             }
        //     };

        case types.API_CALL_DELETE_REQUEST:
            return {
                ...state,
                fetching: false,
                deleting: true,
                error: null
            };
        case types.API_CALL_DELETE_SUCCESS:
            let {posts} = state;
            let items = posts.filter((item) => {
                return item.id !== action.data.id
            });
            return {
                ...state,
                fetching: false,
                deleting: false,
                error: null,
                posts: items
            };
        case types.API_CALL_DELETE_FAILURE:
            return {
                ...state,
                fetching: false,
                deleting: false,
                error: action.error
            };
        case types.API_CALL_EDIT_REQUEST:
            return {
                ...state,
                fetching: true,
                post: {...action.post}
            };
        case types.API_CALL_EDIT_SUCCESS:

            return {
                ...state,
                fetching: false,
                post: {...action.data}
            };
        case types.API_CALL_EDIT_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case types.API_CALL_SAVE_EDIT_REQUEST:
            return {
                ...state,
                fetching: false,
            };
        case types.API_CALL_SAVE_EDIT_SUCCESS:
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
                fetching: false,
            };
        case types.API_CALL_SAVE_EDIT_FAILURE:
            return {
                ...state,
                error: action.error,
                fetching: false,
            };
        default: return {
            ...state,
            posts: state.posts
        };
    }
};
export default postTableReducer;
