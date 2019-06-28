import React, {Component} from 'react';
import {Switch} from "antd";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTitle: '',
            filterAuthor: '',
            filterActive: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        this.setState({
            [name]: target.value
        })
    };

    handleSubmit = (event) => {
        this.props.filterUser({...this.state});
    };

    handleReset = (event) => {
        this.setState({
            filterTitle: '',
            filterAuthor: '',
            filterActive: false
        });
        this.props.resetTable()
    };
    onHandleChangeSwitch = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        return (
            <div className={"filterField p-4 bg-deep-ocean"}>
                <div className={"row"}>
                    <div className="col-3">
                        <input
                            type={"title"}
                            className={"form-control"}
                            placeholder={"Search by title"}
                            name={"filterTitle"}
                            value={this.state.filterTitle}
                            onChange={this.handleChange}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }}
                        />
                    </div>
                    <div className="col-3">
                        <input
                            type={"author"}
                            className={"form-control"}
                            placeholder={"Search by author"}
                            name={"filterAuthor"}
                            value={this.state.filterAuthor}
                            onChange={this.handleChange}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }}
                        />
                    </div>
                    <div className="col-4 form-check form-check-inline">
                        <label className={"form-check-label font-weight-bold"} htmlFor={"filterActive"}>
                            <Switch
                                onChange={this.onHandleChangeSwitch.bind(this, "filterActive")}/> Active</label> &nbsp;
                        <button
                            className="btn btn-outline-primary mx-2"
                            onClick={this.handleSubmit}
                        ><i className="fas fa-search text-white"/></button>
                        <button
                            className="btn btn-outline-warning mx-2"
                            onClick={this.handleReset}
                        ><i className="fas fa-undo text-white"/></button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Filter;