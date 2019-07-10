import {connect} from "react-redux";
import PostTable from '../components/Post/PostTable/PostTable';

const mapStateToProps = state => {
    return {
        fetching: state.postTableReducer.fetching,
        error: state.postTableReducer.error
    };
};
const mapDispatchToProps  = (dispatch, props) => {
    return {
        fetchPost: () => {
            dispatch({ type: "API_CALL_REQUEST" })
        },
        deletePost: (post) => {
            dispatch({ type: "API_CALL_DELETE_REQUEST", post })
        },
        editPost: (post) => {
            dispatch({ type: "API_CALL_EDIT_REQUEST", post })
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostTable);
