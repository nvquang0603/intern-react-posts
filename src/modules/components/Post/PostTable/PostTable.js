import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {toastr} from 'react-redux-toastr'
import PropTypes from 'prop-types';
import ActiveMark from "../../../../common/ActiveMark";


class PostTable extends Component {
    handleDelete(post) {
        const toastrConfirmOptions = {
            onOk: () => this.props.deletePost(post)
        };
        toastr.confirm('Are you sure about that!?', toastrConfirmOptions);
    }

    componentDidMount() {
        this.props.fetchPost();
    };

    render() {
        const { fetching, posts, fetchProducts, error } = this.props;
        return (
            <table className="table table-dark table-hover">
                <thead className={"text-center"}>
                <tr>
                    <th width={"10px"}>ID</th>
                    <th width={"50%"}>Title</th>
                    <th>Author</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                { fetching ? <tr><td colSpan={5} className={"text-center text-warning p-5"}>Đang tải dữ liệu bài viết. Vui lòng chờ trong giây lát</td></tr> :
                    posts.length === 0 ?
                        <tr><td colSpan={5} className={"text-center text-white p-5"}>Không có bài viết nào</td></tr>:
                        posts.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td className={"text-center"}>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td className={"text-center"}>{post.author}</td>
                                    <td className={"text-center"}>
                                        {post.active}
                                    </td>
                                    <td className={"text-center"}>
                                        <div className="form-group">
                                            <Link to={`/${post.id}/edit`} className="btn btn-warning btn-sm font-weight-bold">Edit</Link>
                                            <button className="btn btn-danger btn-sm ml-2 font-weight-bold" onClick={this.handleDelete.bind(this, post)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                }
                {error && <tr><td colSpan={5} className={"text-center text-warning p-5"}>Có lỗi xảy ra</td></tr>}
                </tbody>
            </table>
        )
    }
}

PostTable.propTypes = {
    posts: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default PostTable;
