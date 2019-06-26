import React, {Component} from 'react';
import {Link} from "react-router-dom";
class List extends Component {
    handleDelete(post) {
        this.props.onDelete(post);
    }
    handleEdit(post) {
        this.props.onEdit(post);
    }
    render() {
        return (
            <div>
                <div className="listTopics">
                    <h2 className="mainTitle text-center">List Topics</h2>
                    <table className="table table-dark table-hover">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Active</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.listPosts.map(post => {
                                return (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.content}</td>
                                        <td>{post.author}</td>
                                        <td>
                                            <input type={'checkbox'} checked={post.active} />
                                        </td>
                                        <td>
                                            <div className="form-group">
                                                <Link to={`/${post.id}/edit`} className="btn btn-warning" onClick={this.handleEdit.bind(this, post)}>Edit</Link>
                                                <button className="btn btn-danger" onClick={this.handleDelete.bind(this, post.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default List;