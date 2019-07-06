import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import * as actions from "../../../actions";
import PropTypes from 'prop-types';


class PostTable extends Component {
    handleDelete(post) {
        let confirmDelete = window.confirm('Are you sure? Press Enter or click Ok to delete');
        if ( confirmDelete ) {
            axios.delete(`http://5d20186c3036a60014d68a1d.mockapi.io/posts/${post.id}`)
                .then(res => {
                    this.props.deletePost(post);
                    this.props.deleteNotification(post.id);
                });
        }
    }
    handleEdit(post) {
        this.props.editPost(post);
    }

    componentDidMount() {
        axios.get(`http://5d20186c3036a60014d68a1d.mockapi.io/posts`)
            .then(res => {
                let posts = res.data;
                this.props.listPost(posts);
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <table className="table table-dark table-hover">
                <thead className={"text-center"}>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td className={"text-center"}>{post.id}</td>
                                <td>{post.title}</td>
                                <td className={"text-center"}>{post.author}</td>
                                <td className={"text-center"}>
                                    {post.active === true ? <i className="fas fa-check text-success"/> : <i className="fas fa-ban text-danger" />}
                                </td>
                                <td className={"text-center"}>
                                    <div className="form-group">
                                        <Link to={`/${post.id}/edit`} className="btn btn-warning btn-sm font-weight-bold" onClick={this.handleEdit.bind(this, post)}>Edit</Link>
                                        <button className="btn btn-danger btn-sm ml-2 font-weight-bold" onClick={this.handleDelete.bind(this, post)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}

const mapDispatchToProps  = (dispatch, props) => {
    return {
        listPost: (posts) => {
            dispatch(actions.listPost(posts))
        },
        deletePost: (post) => {
            dispatch(actions.deletePost(post))
        },
        editPost: (post) => {
            dispatch(actions.editPost(post))
        }
    }
};

PostTable.propTypes = {
    posts: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default connect(
    null,
    mapDispatchToProps
)(PostTable);