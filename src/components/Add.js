import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class AddPost extends Component {

    state = {
        data: {
            id: this.props.listPosts.length + 1,
            title: '',
            content: '',
            author: '',
            active: ''
        }
    };

    componentWillMount() {
        this.setState({
            lstPosts: this.props.listPosts
        })
    };

    onHandleChange = (name, e) => {
        this.setState({data: {...this.state.data, [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}});
    };
    onSubmit = async () => {
        await this.setState({lstPosts: [...this.state.lstPosts, this.state.data]});
        console.log(this.state.lstPosts);
        this.props.onSetPost(this.state.lstPosts);
        this.props.history.push('/list');
    };

    cancel = () =>{
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
                                       onChange={this.onHandleChange.bind(this, "title")}
                                       id="title"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-file-contract" style={{fontSize: '20px'}}/></span>
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
                            />
                        </div>
                        <hr/>
                    </form>
                    <div className="button-group text-center">
                        <button onClick={this.onSubmit}
                                className="btn btn-success">
                            <i className="fas fa-folder-plus" style={{fontSize: '18px'}}/> Add
                        </button>
                        <button onClick={this.cancel}
                                className="btn btn-danger">
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