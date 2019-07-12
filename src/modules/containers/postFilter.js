import {connect} from "react-redux";
import PostFilter from '../components/Post/PostFilter/PostFilter';

const mapStateToProps = (state) => {
    let posts = state.postTableReducer.posts;
    return {
        posts
    }
};
export default connect(
    mapStateToProps,
    null
)(PostFilter);
