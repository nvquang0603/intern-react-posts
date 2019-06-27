import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Table extends Component {
    handleDelete(post) {
        let confirmDelete = prompt('Are you sure to delete this post? Type "OK" to delete!');
        if ( confirmDelete === 'OK' || confirmDelete === 'ok') {
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
                            <tr key={post.id} className={"text-center"}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>
                                    {post.active === true ? <i className="fas fa-check text-success"/> : <i className="fas fa-ban text-danger" />}
                                </td>
                                <td>
                                    <div className="form-group">
                                        <Link to={`/${post.id}/edit`} className="btn btn-warning btn-sm font-weight-bold" onClick={this.handleEdit.bind(this, post)}>Edit</Link>
                                        <button className="btn btn-danger btn-sm ml-2 font-weight-bold" onClick={this.handleDelete.bind(this, post.id)}>Delete</button>
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
export default Table;