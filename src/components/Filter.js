import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTitle: '',
            filterAuthor: '',
            filterActive: 'all'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        this.props.filterUser({...this.state});
    };

    handleReset = (event) => {
        this.setState({
            filterTitle: '',
            filterAuthor: '',
            filterActive: 'all'
        });
        this.props.resetTable()
    };

    render() {
        return (
            <div className={"filterField p-4 bg-deep-ocean"}>
                <div className={"row"}>
                    <div className="col-3">
                        <input
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
                            <select
                                    className={"form-control"}
                                    name={"filterActive"}
                                    value={this.state.filterActive}
                                    onChange={this.handleChange}>
                                <option value={"all"}>All</option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </label> &nbsp;
                        <button
                            className="btn btn-outline-warning mx-1"
                            onClick={this.handleSubmit}
                        ><i className="fas fa-search text-white" /></button>
                        <button
                            className="btn btn-outline-primary mx-1"
                            onClick={this.handleReset}
                        ><i className="fas fa-undo text-white"/></button>
                    </div>
                </div>

            </div>
        );
    }
}
Filter.propTypes = {
    filterUser: PropTypes.func,
    resetTable: PropTypes.func
};
Filter.defaultProps = {
    filterUser: () => {},
    resetTable: () => {}
};
export default Filter;