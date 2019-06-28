import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Switch} from "antd";
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

    componentWillMount() {
        let post = this.props.post;
        this.setState({...post});
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
        if (this.handleValidation()) {
            this.props.onEditItem(this.state);
            this.props.history.push('/list');
        }
    };

    handleReset() {
        let post = this.props.post;
        this.setState({errors:{title: '', content: '', author: ''}});
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
                            defaultChecked={this.state.active}
                            onChange={this.onHandleChangeSwitch.bind(this, "active")}/>
                    </div>

                    <hr/>

                    <div className="button-group text-center">
                        <button
                            type={"submit"}
                            className={"btn btn-success mr-2"}
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
Edit.propTypes = {
    post: PropTypes.object,
    onEditItem: PropTypes.func
};
Edit.defaultProps = {
    post: {},
    onEditItem: () => {}
};
export default withRouter(Edit);