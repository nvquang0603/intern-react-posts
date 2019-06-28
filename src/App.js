import React, {Component} from 'react';
import './App.css';
import Banner from "./Banner";
import List from "./components/List.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import {showNotification} from './common/Notification'
import Constant from './common/Constant'
import DataDefault from './common/Data'

const DEFAULT_POSTS = DataDefault.DATA;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [...DEFAULT_POSTS],
            post: {id: '', title: '', content: '', author: '', active: 1},
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

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
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
        this.setState({post: {id: '', title: '', content: '', author: '', active: 1}, posts: newPost});
        this.editNotification()
    }

    onEdit(post) {
        this.setState({
            post,
        });
    }

    onDelete(id) {
        let prevItems = this.state.posts;
        let prevFilteredItems = this.state.filteredPost;
        let posts = prevItems.filter((item) => {
            return item.id !== id
        });
        let filteredPost = prevFilteredItems.filter((item) => {
            return item.id !== id
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
                        <div id="mySidenav" className="sidenav">
                            <h3 className="mainTitle text-center">MENU</h3>
                            <button className="closebtn btn text-white" onClick={() => this.closeNav()}>×</button>
                            <NavLink exact to="/" activeClassName={"active"}><i className="fas fa-home"
                                                                                style={{fontSize: '18px'}}/> Home</NavLink>
                            <NavLink to="/list" activeClassName={"active"}><i className="fas fa-list"
                                                                              style={{fontSize: '18px'}}/> List</NavLink>
                            <NavLink to="/add" activeClassName={"active"}><i className="fas fa-plus-circle"
                                                                             style={{fontSize: '18px'}}/> Add new
                                post</NavLink>
                        </div>
                        <br/>
                        <div id="main">
                            <Banner/>
                            <div className="app-content">
                                <ReactNotification ref={this.notificationDOMRef}/>
                            </div>
                            <span style={{fontSize: '30px', cursor: 'pointer'}}
                                  onClick={() => this.openNav()} className="mainTitle">☰MENU</span>
                            <Route exact path="/" render={() => (
                                <h2 className="mainTitle p-5 d-flex justify-content-center"> Hello Admin</h2>)}/>
                            <Route path="/list" component={(props) =>
                                <List
                                    version={this.state.version}
                                    listPosts={this.state.filteredPost}
                                    onDelete={this.onDelete.bind(this)}
                                    onEdit={this.onEdit.bind(this)}
                                    filterUser={this.filterUser}
                                    resetTable={this.resetTable}
                                />}/>
                            <Route path="/add"
                                   component={() => <Add onSetPost={this.onSetPost}
                                                         listPosts={this.state.posts}/>}/>
                            <Route path="/:id/edit" component={() => <Edit post={this.state.post}
                                                                           onEditItem={this.onEditItem.bind(this)}/>}/>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
