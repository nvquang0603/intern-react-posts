import React, {Component} from 'react';
import {connect} from "react-redux";
import {showActive} from '../selectors/index';

class Home extends Component {
    componentDidMount() {
        this.props.fetchPost();
    }

    render() {

        return (
            <div className={"container"}>
                <div className={"row"}>
                    {this.props.posts.map(post => {
                        return (
                            <div className={"col-md-4 my-2"}>
                                <div key={post.id} className="card w-100 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">#{post.id}: {post.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{post.active===true?'Active':'Inactive'}</h6>
                                        <p className="card-text">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        posts: showActive(state.postTableReducer),
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPost: () => {
            dispatch({type: "API_CALL_REQUEST"})
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);