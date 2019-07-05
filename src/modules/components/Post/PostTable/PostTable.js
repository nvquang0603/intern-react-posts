import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class PostTable extends Component {
    handleDelete(post) {
        let confirmDelete = window.confirm('Are you sure? Press Enter or click Ok to delete');
        if ( confirmDelete ) {
            this.props.onDelete(post);
        }
    }
    handleEdit(post) {
        this.props.onEdit(post);
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
                    this.props.listPosts.map(post => {
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

const mapStateToProps = (state) => {
    return {
        ...state.todos,
        ...state.todo
    };
};

PostTable.propTypes = {
    listPosts: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

PostTable.defaultProps = {
    listPosts: [],
    onEdit: () => {},
    onDelete: () => {}
};
export default connect(
    mapStateToProps
)(PostTable);