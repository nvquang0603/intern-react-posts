import React, {Component} from 'react';
import './App.css';
import Menu from './modules/components/Menu';
import Banner from "./modules/components/Banner";
import Index from "./modules/components/Post/List";
import Add from "./modules/components/Post/Add.js";
import Edit from "./modules/components/Post/Edit.js";
import Constant from './common/Constant';
import DataDefault from './common/Data';
import Home from "./modules/components/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import {showNotification} from './common/Notification';
import PropTypes from 'prop-types';

const DEFAULT_POSTS = DataDefault.DATA;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [...DEFAULT_POSTS],
            post: {
                id: '',
                title: '',
                content: '',
                author: '',
                active: false
            },
            errors: {},
            version: 1,
        };

        this.notificationDOMRef = React.createRef();
        this.filterUser = this.filterUser.bind(this);
        this.resetTable = this.resetTable.bind(this);
    }

    successAddNotification() {
        showNotification(this, Constant.NOTIFICATION.SUCCESS, 'success', 'The post has been added!')
    }

    editNotification() {
        showNotification(this, Constant.NOTIFICATION.SUCCESS, 'success', 'The post has been updated!');
    }

    deleteNotification() {
        showNotification(this, Constant.NOTIFICATION.DELETE, 'success', 'The post has been deteted!');
    }

    toggleNav = (navWidth) => {
        if (document.getElementById("mySidenav").style.width === "0px" || document.getElementById("mySidenav").style.width === "") {
            document.getElementById("mySidenav").style.width = navWidth;
        } else {
            document.getElementById("mySidenav").style.width = "0px";
        }
    };
    onSetPost = (data) => {
        this.setState({
            posts: data,
            filteredPost: data
        });
        this.successAddNotification();
    };

    onEditItem(itemInput) {
        let {posts} = this.state;
        let newPost = posts.map(item => {
            if (itemInput.id === item.id) {
                item.title = itemInput.title;
                item.content = itemInput.content;
                item.author = itemInput.author;
                item.active = itemInput.active;
            }
            return item;
        });
        this.setState({post: {id: '', title: '', content: '', author: '', active: false}, posts: newPost});
        this.editNotification();
    };

    onEdit(post) {
        this.setState({
            post,
        });
    }

    onDelete(post) {
        let prevItems = this.state.posts;
        let prevFilteredItems = this.state.filteredPost;
        let posts = prevItems.filter((item) => {
            return item.id !== post.id
        });
        let filteredPost = prevFilteredItems.filter((item) => {
            return item.id !== post.id
        });
        this.setState({
            posts,
            filteredPost
        });
        this.deleteNotification();
    }

    componentWillMount() {
        this.setState({
            filteredPost: [...this.state.posts],
            editState: false
        })
    }

    filterUser = (post) => {
        let {posts} = this.state;
        let updatedList = posts.filter((item) => {
            return item.title.toLowerCase().includes(post.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(post.filterAuthor.toLowerCase()) && item.active === post.filterActive
        });
        this.setState({filteredPost: updatedList});
    };

    resetTable() {
        this.setState({
            filteredPost: [...this.state.posts]
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <BrowserRouter>
                        <Menu />
                        <br/>
                        <div id="main">
                            <Banner/>
                            <span style={{fontSize: '30px', cursor: 'pointer'}}
                                  onClick={() => this.toggleNav("250px")} className="mainTitle">☰MENU</span>
                            <div className="app-content">
                                <ReactNotification ref={ this.notificationDOMRef }/>
                            </div>
                            <Switch>
                                <Route exact path="/" component={() => <Home listPosts={this.state.posts}/>}/>
                                <Route path="/list" component={() =>
                                    <Index
                                        version={this.state.version}
                                        listPosts={this.state.filteredPost}
                                        onDelete={this.onDelete.bind(this)}
                                        onEdit={this.onEdit.bind(this)}
                                        filterUser={this.filterUser}
                                        resetTable={this.resetTable}
                                    />}
                                />
                                <Route path="/add"
                                       component={() => <Add onSetPost={this.onSetPost}
                                                             listPosts={this.state.posts}/>}/>
                                <Route path="/:id/edit" component={() => <Edit post={this.state.post}
                                                                               onEditItem={this.onEditItem.bind(this)}/>}/>
                            </Switch>

                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
App.propTypes = {

};
App.defaultProps = {

};
export default App;
