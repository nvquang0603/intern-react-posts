import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Switch} from "antd";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            active: false,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    validation = () => {
        let data = this.state;
        console.log('data=>>> :',data);
        let error = {};
        let validation = true;
        if (!data['title'] || data['title'] === "") {
            validation = false;
            error['title'] = "Title is required!"
        }
        if (!data['content'] || data['content'] === "") {
            validation = false;
            error['content'] = "Content is required!"
        }
        if (!data['author'] || data['author'] === "") {
            validation = false;
            error['author'] = "Author is required!"
        }
        this.setState({errors: error});
        console.log(error);
        return validation;
    }

    componentWillMount() {
        let post = this.props.post;
        this.setState({...post});
    }

    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        if (this.validation()) {
            this.props.onEditItem(this.state);
            this.props.history.push('/list');
        }
    };

    handleReset() {
        let post = this.props.post;
        this.setState({...post});
    }

    onHandleChangeSwitch = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    render() {
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
                                className={"form-control border-danger"}
                                id={"title"}
                                name={"title"}
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                        </div>
                        <span style={{color: "red"}}>{this.state.errors["title"]}</span>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-file-contract"}
                                                                        style={{fontSize: '20px'}}/></span>
                            </div>
                            <textarea
                                rows={"10"}
                                className={"form-control"}
                                name={"content"}
                                onChange={this.handleChange}
                                value={this.state.content}
                            />
                        </div>
                        <span style={{color: "red"}}>{this.state.errors["content"]}</span>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-at"}/></span>
                            </div>
                            <input
                                type={"text"}
                                className={"form-control"}
                                id={"author"}
                                name={"author"}
                                onChange={this.handleChange}
                                value={this.state.author}
                            />
                        </div>
                        <span style={{color: "red"}}>{this.state.errors["author"]}</span>
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
                            className={"btn btn-success mr-2"}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            <i className={"fas fa-check"} style={{fontSize: '18px'}}/>&nbsp;
                            Submit
                        </button>
                        <button
                            type={"submit"}
                            className={"btn btn-danger"}
                            onClick={this.handleReset}
                        >
                            <i className={"fas fa-undo"} style={{fontSize: '18px'}}/>&nbsp;
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Edit);