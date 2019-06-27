import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            active: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
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
            [name]:value
        });
    };
    handleSubmit() {
        this.props.onEditItem(this.state);
        this.props.history.push('/list');
    }
    handleReset() {
        let post = this.props.post;
        this.setState({...post});
    }
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
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-file-contract"} style={{fontSize: '20px'}}/></span>
                            </div>
                            <textarea
                                rows={"10"}
                                className={"form-control"}
                                name={"content"}
                                onChange={this.handleChange}
                                value={this.state.content}
                            />
                        </div>
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
                    </div>

                    <div className={"form-check form-check-inline p-3"}>
                        <label className={"form-check-label"}>Active status &nbsp;</label>
                        <input
                            className={"form-check-input"}
                            type={"checkbox"}
                            name={"active"}
                            onChange={this.handleChange}
                            value={this.state.active}
                            checked={this.state.active}
                        />
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

export default withRouter(Edit);