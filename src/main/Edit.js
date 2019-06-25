import React, {Component} from 'react';

class EditPost extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="text-center">Edit Topic</h2>
                    <form>
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Title</span>
                                </div>
                                <input type="text" className="form-control" id="title"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Content</span>
                                </div>
                                <textarea rows="10" type="text" className="form-control" id="content"/><span
                                className="glyphicon glyphicon-filter"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Author</span>
                                </div>
                                <input type="text" className="form-control" id="author"/><span
                                className="glyphicon glyphicon-filter"/>
                            </div>
                        </div>
                        <hr/>
                        <div className="button-group text-center">
                            <button type="submit" className="btn btn-success"><i className="far fa-paper-plane"
                                                                                 style={{fontSize: '18px'}}/>
                                Submit
                            </button>
                            <button type="submit" className="btn btn-danger"><i className="fas fa-eraser"
                                                                                style={{fontSize: '18px'}}/>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default EditPost;