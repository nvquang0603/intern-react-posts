import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Switch} from 'antd';
import 'antd/dist/antd.css';
import {connect} from "react-redux";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: 0,
                title: '',
                content: '',
                author: '',
                active: false,
            },
            errors: {
                title: {
                    dangerBorder: '',
                    message: ''
                },
                content: {
                    dangerBorder: '',
                    message: ''
                },
                author: {
                    dangerBorder: '',
                    message: ''
                }
            }
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.post !== prevProps.post) {
            this.setState({
                id: this.props.post.id,
                title: this.props.post.title,
                content: this.props.post.content,
                author: this.props.post.author,
                active: this.props.post.active,
            });
        }
    };

    componentDidMount() {
        this.props.addPost(this.props.match.params.id);
    }

    validation = () => {
        let datas = this.state.data;
        let error = {
            title: {
                dangerBorder: false,
                message: ''
            },
            content: {
                dangerBorder: false,
                message: ''
            },
            author: {
                dangerBorder: false,
                message: ''
            }
        };
        let validation = true;
        if (!datas['title'] || datas['title'] === "") {
            validation = false;
            error.title.dangerBorder = true;
            error['title.message'] = "Title is required!"
        }
        if (!datas['content'] || datas['content'] === "") {
            validation = false;
            error.content.dangerBorder = true;
            error['content.message'] = "Content is required!"
        }
        if (!datas['title'] || datas['author'] === "") {
            validation = false;
            error.author.dangerBorder = true;
            error['author.message'] = "Author is required!"
        }
        this.setState({errors: error});
        return validation;
    };

    componentWillMount() {
        this.setState({
            lstPosts: this.props.listPosts
        })
    };

    onHandleChange = (name, e) => {
        this.setState({
            data: {
                ...this.state.data,
                [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
            }
        });
    };
    onHandleChangeSwitch = (name, value) => {
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };

    onSubmit = (event) => {
        if (this.validation()) {
            this.props.addPost(this.state.data, this.props.history);
        }
    };

    cancel = () => {
        alert('Adding new post has been canceled!');
        this.props.history.push('/list');
    };

    render() {
        let {errors} = this.state;
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="text-center">Add a new Topic</h2>
                    <form>
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-comment-alt"/></span>
                                </div>
                                <input type="text"
                                       placeholder="Title"
                                       className={errors.title.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                       defaultValue=""
                                       value={this.state.title}
                                       onChange={this.onHandleChange.bind(this, "title")}
                                       id={"title"}
                                       name={"title"}
                                />
                            </div>
                            <span style={{color: "red"}}>{this.state.errors["title.message"]}</span>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-file-contract"
                                                                          style={{fontSize: '20px'}}/></span>
                                </div>
                                <textarea rows="10"
                                          placeholder="Content"
                                          defaultValue=""
                                          onChange={this.onHandleChange.bind(this, "content")}
                                          className={errors.content.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                          id="content"
                                />
                                <span
                                    className="glyphicon glyphicon-filter"/>
                            </div>
                            <span style={{color: "red"}}>{this.state.errors["content.message"]}</span>
                        </div>
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-at"/></span>
                                </div>
                                <input type="text"
                                       placeholder="Author"
                                       defaultValue=""
                                       onChange={this.onHandleChange.bind(this, "author")}
                                       className={errors.author.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                       id="author"
                                />
                                <span
                                    className="glyphicon glyphicon-filter"/>
                            </div>
                            <span style={{color: "red"}}>{this.state.errors["author.message"]}</span>
                        </div>
                        <div className="col-6">
                            <label style={{fontSize: '15px', fontWeight: 'bold'}}>Active status:</label>
                            <Switch
                                onChange={this.onHandleChangeSwitch.bind(this, "active")}/>
                        </div>
                        <hr/>
                    </form>
                    <div className="button-group text-center">
                        <button
                            onClick={this.onSubmit.bind(this)}
                            className="btn btn-success btnadd">
                            <i className="fas fa-plus" style={{fontSize: '18px'}}/> Add
                        </button>
                        <button
                            onClick={this.cancel}
                            className="btn btn-danger btnadd">
                            <i className="fas fa-times"
                               style={{fontSize: '18px'}}/> Cancel
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    let posts = state.postTableReducer.posts;
    let post = state.postTableReducer.post;
    return {
        posts: posts,
        post: post
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addPost: (post, history) => {
            dispatch({type: "API_CALL_ADD_REQUEST", payload: {post, history}})
        }
    }
};

AddPost.propTypes = {
    listPosts: PropTypes.array,
    onSetPost: PropTypes.func,
};

AddPost.defaultProps = {
    listPosts: [],
    onSetPost: () => {
    },
};
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost));