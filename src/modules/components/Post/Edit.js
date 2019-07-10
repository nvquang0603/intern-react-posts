import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch} from "antd";
import FormPost from './formPostTemplate';
import 'antd/dist/antd.css';
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
        let history = this.props.history;
        if (this.handleValidation()) {
            this.props.saveEditPost(post, history);
        }
    };

    handleReset() {
        let post = this.props.post;
        this.setState({
            errors:{
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
        return (
            <FormPost
                state={this.state}
                handleValidation={this.handleValidation}
                handleChange={this.handleChange}
                onHandleChangeSwitch={this.onHandleChangeSwitch}
                handleSubmit={this.handleSubmit}
                handleReset={this.handleReset}
            />
        );
    }
}
export default Edit
