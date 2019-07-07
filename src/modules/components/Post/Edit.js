import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch} from "antd";
import axios from 'axios';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import * as actions from "../../actions";
import {withRouter} from "react-router";
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            active: false,
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
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
        this.props.editPost(this.props.match.params.id);

    }

    handleValidation = () => {
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
        let isInputValid = true;
        if (this.state.title === '') {
            isInputValid = false;
            error.title.message = "Title field is required!";
            error.title.dangerBorder = true;
        }
        if (this.state.content === '') {
            isInputValid = false;
            error.content.message = "Content field is required!";
            error.content.dangerBorder = true;
        }
        if (this.state.author === '') {
            isInputValid = false;
            error.author.message = "Author field is required!";
            error.author.dangerBorder = true;
        }
        this.setState({errors: error});
        return isInputValid;
    };
    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]:value
        });
    };

    onHandleChangeSwitch = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        let post = this.state;
        if (this.handleValidation()) {
            this.props.saveEditPost(this.state);
            if (this.props.fetching === false) {
                this.props.editNotification(post.id);
                this.props.history.push('/list');
            }
        }
    };

    handleReset() {
        let post = this.props.post;
        this.setState({errors:{
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
            }});
        this.setState({...post});
    };

    render() {
        let {errors} = this.state;
        return (
            <div>
                <div className={"jumbotron"}>
                    <h2 className={"text-center"}>Edit Topic</h2>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-comment-alt"}/></span>
                            </div>
                            <input
                                type={"text"}
                                className={errors.title.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                id={"title"}
                                name={"title"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={this.state.title}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.title.message !== '' && <span className={"text-danger mx-5"}>{errors.title.message}</span>}
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-file-contract"} style={{fontSize: '20px'}}/></span>
                            </div>
                            <textarea
                                rows={"10"}
                                className={errors.content.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                name={"content"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={this.state.content}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.content.message !== '' && <span className={"text-danger mx-5"}>{errors.content.message}</span>}
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-at"}/></span>
                            </div>
                            <input
                                type={"text"}
                                className={errors.author.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                id={"author"}
                                name={"author"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={this.state.author}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.author.message !== '' && <span className={"text-danger mx-5"}>{errors.author.message}</span>}
                        </div>
                    </div>

                    <div className={"form-check form-check-inline p-3"}>
                        <label className={"form-check-label"}>Active status &nbsp;</label>
                        <Switch
                            checked={this.state.active}
                            onChange={this.onHandleChangeSwitch.bind(this, "active")}/>
                    </div>

                    <hr/>

                    <div className="button-group text-center">
                        <button
                            type={"submit"}
                            className={errors.title.message !== '' || errors.content.message !== '' || errors.author.message !== '' ? "btn btn-success mr-2 disabled" : "btn btn-success mr-2"}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            <i className={"far fa-paper-plane"} style={{fontSize: '18px'}}/>&nbsp;
                            Submit
                        </button>
                        <button
                            type={"submit"}
                            className={"btn btn-danger"}
                            onClick={this.handleReset}
                        >
                            <i className={"fas fa-eraser"} style={{fontSize: '18px'}}/>&nbsp;
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    let post = state.postTableReducer.post;
    let fetching = state.postTableReducer.fetching;
    return {
        post:
            {
                id: post.id,
                title: post.title,
                content: post.content,
                author: post.author,
                active: post.active
            },
        fetching: fetching
    }
};
const mapDispatchToProps  = (dispatch, props) => {
    return {
        saveEditPost: (post) => {
            dispatch({ type: "API_CALL_SAVE_EDIT_REQUEST", post })
        },
        editPost: (post) => {
            dispatch({ type: "API_CALL_EDIT_REQUEST", post })
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit));