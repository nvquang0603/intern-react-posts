import React, {Component} from 'react';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            active: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        let post = this.props.post;
        this.setState({...post});
    }
    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]:value
        });
    };
    handleSubmit() {
        this.props.onEditItem(this.state);
        this.setState({
            id: '',
            title: '',
            content: '',
            author: '',
            active: 0
        });
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="text-center">Edit Topic</h2>
                    <div className="col-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Title</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name={"title"}
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Content</span>
                            </div>
                            <textarea
                                rows="10"
                                className="form-control"
                                id="content"
                                name={"content"}
                                onChange={this.handleChange}
                                value={this.state.content}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Author</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name={"author"}
                                onChange={this.handleChange}
                                value={this.state.author}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <label>Active </label>
                        <input
                            type="checkbox"
                            name={"active"}
                            onChange={this.handleChange}
                            checked={this.state.active}
                        />
                    </div>
                    <hr/>
                    <div className="button-group text-center">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.handleSubmit.bind(this)}
                        >
                            <i className="far fa-paper-plane" style={{fontSize: '18px'}}/>
                            Submit
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={this.handleReset}
                        >
                            <i className="fas fa-eraser" style={{fontSize: '18px'}}/>
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Edit;