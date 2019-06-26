import React, {Component} from 'react';
import Filter from '../components/Filter';
import Table from '../components/Table';

class List extends Component {
    render() {
        return (
            <div>
                <div className="listTopics">
                    <h2 className="mainTitle text-center">List Topics</h2>
                    <Filter filterUser={this.props.filterUser}/>
                    <Table listPosts = {this.props.listPosts} onDelete={this.props.onDelete} onEdit={this.props.onEdit}/>
                </div>
            </div>
        );
    }
}

export default List;