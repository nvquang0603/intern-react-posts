import React, {Component} from 'react';

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
        console.log("handleChange");
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        console.log("handleSubmit");
        this.props.filterUser({...this.state});
    };

    handleReset = (event) => {
        console.log("handleReset");
        this.setState({
            filterTitle: '',
            filterAuthor: '',
            filterActive: false
        });
        this.props.resetTable()
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
                            <input
                                type={'checkbox'}
                                className={"form-check-input"}
                                name={"filterActive"}
                                value={this.state.filterActive}
                                checked={this.state.filterActive}
                                onChange={this.handleChange}
                            /> Active</label> &nbsp;
                        <button
                            className="btn btn-outline-warning mx-2"
                            onClick={this.handleSubmit}
                        ><i className="fas fa-search text-white" /></button>
                        <button
                            className="btn btn-outline-primary mx-2"
                            onClick={this.handleReset}
                        ><i className="fas fa-undo text-white"/></button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Filter;