import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// import { Switch } from 'antd';
import 'antd/dist/antd.css';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: this.props.listPosts.length + 1,
                title: '',
                content: '',
                author: '',
                active: false,
                errors: {}
            }
        };
    }

    validation = () => {
        let datas = this.state;
        let error = {};
        let validation = true;
        if (!datas['title'] || datas['title'] === "") {
            validation = false;
            error['title'] = "Title is required!"
        }
        if (!datas['title'] || datas['content'] === "") {
            validation = false;
            error['content'] = "Content is required!"
        }
        if (!datas['title'] || datas['author'] === "") {
            validation = false;
            error['author'] = "Author is required!"
        }
        this.setState({errors: error});
        console.log(error);
        return validation;
    }

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
    onSubmit = async () => {
        await this.setState({lstPosts: [...this.state.lstPosts, this.state.data]});
        if (this.validation()) {
            this.props.onSetPost(this.state.lstPosts);
            this.props.history.push('/list');
        }

    };

    cancel = () => {
        alert('Adding new post has been canceled!');
        this.props.history.push('/list');
    }

    render() {
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
                                       className="form-control"
                                       defaultValue=""
                                       value={this.state.title}
                                       onChange={this.onHandleChange.bind(this, "title")}
                                       id={"title"}
                                       name={"title"}
                                />
                            </div>
                            {/*<span style={{color: "red"}}>{this.state.errors["title"]}</span>*/}
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
                                          className="form-control" id="content"
                                />
                                <span
                                    className="glyphicon glyphicon-filter"/>
                            </div>
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
                                       className="form-control" id="author"
                                />
                                <span
                                    className="glyphicon glyphicon-filter"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <label>Active status:</label>
                            <input type="checkbox"
                                   onChange={this.onHandleChange.bind(this, "active")}
                                   name="active"
                                   className={"checkbox"}
                            />
                            {/*<Switch defaultUnChecked onChange={this.onHandleChange.bind(this, "active")}/>*/}
                        </div>
                        <hr/>
                    </form>
                    <div className="button-group text-center">
                        <button
                            onClick={this.onSubmit}
                            className="btn btn-success btnadd">
                            <i className="fas fa-folder-plus" style={{fontSize: '18px'}}/> Add
                        </button>
                        <button
                            onClick={this.cancel}
                            className="btn btn-danger btnadd">
                            <i className="fas fa-eraser"
                               style={{fontSize: '18px'}}/> Cancel
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(AddPost);