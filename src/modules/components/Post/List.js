import React, {Component} from 'react';
import PostFilter from '../../containers/postFilter';
import PostTable from '../../containers/postTable';
import PropTypes from 'prop-types';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPost: [],
            version: 1,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.posts !== prevProps.posts) {
            this.setState({
                filteredPost: this.props.posts
            });
        }
    };
    filterPost = (filter) => {
        let active = (filter.filterActive === 'true');
        let {posts} = this.props;
        let updatedList = posts.filter((item) => {
            return filter.filterActive === 'all' ? item.title.toLowerCase().includes(filter.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(filter.filterAuthor.toLowerCase()) :
                item.title.toLowerCase().includes(filter.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(filter.filterAuthor.toLowerCase()) && item.active === active
        });

        this.setState({filteredPost: updatedList, version: this.state.version + 1});
    };

    resetTable() {
        this.setState({
            filteredPost: this.props.posts
        });
    };

    render() {
        return (
            <div>
                <div className="listTopics">
                    <h2 className="mainTitle text-center">List Topics</h2>
                    <PostFilter filterPost={this.filterPost.bind(this)} resetTable={this.resetTable.bind(this)} />
                    <PostTable posts={this.state.filteredPost} fetching={this.props.fetching}/>
                </div>
            </div>
        );
    }
}


List.propTypes = {
    version: PropTypes.number,
    posts: PropTypes.array,
};
List.defaultProps = {
    version: 1,
};
export default List;