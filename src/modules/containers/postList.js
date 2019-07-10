import {connect} from "react-redux";
import List from '../components/Post/List';
const mapStateToProps = state => {
    return {
        fetching: state.postTableReducer.fetching,
        posts: state.postTableReducer.posts,
        error: state.postTableReducer.error
    };
};
export default connect(
    mapStateToProps,
    null
)(List);
