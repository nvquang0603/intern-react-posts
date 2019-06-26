import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTitle: '',
            filterAuthor: '',
            filterActive: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]:value
        })
    };
    handleSubmit = (event) => {
        this.props.filterUser(this.state);
    };
    render() {
        return (
            <div className={"filterField p-4"}>
                <div className={"row"}>
                    <div className="col">
                        <input
                            type={"title"}
                            className={"form-control"}
                            placeholder={"Search by title"}
                            name={"filterTitle"}
                            value={this.state.filterTitle}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type={"author"}
                            className={"form-control"}
                            placeholder={"Search by author"}
                            name={"filterAuthor"}
                            value={this.state.filterAuthor}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-3 form-check form-check-inline">
                        <input
                            type={'checkbox'}
                            className={"form-check-input"}
                            name={"filterActive"}
                            value={this.state.filterActive}
                            checked={this.state.filterActive}
                            onChange={this.handleChange}
                        />
                        <label className={"form-check-label font-weight-bold"} htmlFor={"filterActive"}>Active</label>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning btn-sm mr-2" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>

            </div>
        );
    }
}
export default Filter;