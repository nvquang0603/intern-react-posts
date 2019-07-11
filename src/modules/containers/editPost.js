import Edit from '../components/Post/Edit';
import {withRouter} from "react-router";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    let post = state.postTableReducer.post;
    let fetching = state.postTableReducer.fetching;
    return {
        post:
            {
                id: post.id,
                title: post.title,
                content: post.content,
                author: post.author,
                active: post.active
            },
        fetching: fetching
    }
};
const mapDispatchToProps  = (dispatch, props) => {
    let {history} = props;
    return {
        saveEditPost: (post) => {
            dispatch({ type: "API_CALL_SAVE_EDIT_REQUEST", payload: {post, history} })
        },
        editPost: (post) => {
            dispatch({ type: "API_CALL_EDIT_REQUEST", post })
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit));
