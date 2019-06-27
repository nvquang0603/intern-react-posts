import React, {Component} from 'react';
import Filter from '../components/Filter';
import Table from '../components/Table';
import PropTypes from 'prop-types';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPost: [],
            version: 1,
        };
    }

    static getDerivedStateFromProps(props, preState) {
        let newState = {...preState};
        if (preState.version === 1 || props.version > preState.version) {
            newState.filteredPost = props.listPosts;
            newState.version = props.version;
        }

        return newState;
    }

    filterUser = (post) => {
        let active = (post.filterActive === 'true');
        let {listPosts} = this.props;
        let updatedList = listPosts.filter((item) => {
            return post.filterActive === 'all' ? item.title.toLowerCase().includes(post.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(post.filterAuthor.toLowerCase()) :
                item.title.toLowerCase().includes(post.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(post.filterAuthor.toLowerCase()) && item.active === active
    });

        this.setState({filteredPost: updatedList, version: this.state.version + 1});
    };

    resetTable() {
        this.setState({
            filteredPost: this.props.listPosts
        });
    };

    render() {
        let {filteredPost} = this.state;
        return (
            <div>
                <div className="listTopics">
                    <h2 className="mainTitle text-center">List Topics</h2>
                    <Filter filterUser={this.filterUser.bind(this)} resetTable={this.resetTable.bind(this)}/>
                    <Table listPosts={filteredPost} onDelete={this.props.onDelete} onEdit={this.props.onEdit}/>
                </div>
            </div>
        );
    }
}

List.propTypes = {
    version: PropTypes.number,
    listPosts: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

List.defaultProps = {
    version: 1,
    listPosts: [],
    onEdit: () => {},
    onDelete: () => {}
};

export default List;