import {connect} from "react-redux";
import List from '../components/Post/List';
import {showActive} from "../selectors";
const mapStateToProps = state => {
    return {
        fetching: state.postTableReducer.fetching,
        posts: showActive(state.postTableReducer),
        error: state.postTableReducer.error
    };
};
export default connect(
    mapStateToProps,
    null
)(List);
