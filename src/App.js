import React, {Component} from 'react';
import './App.css';
import Banner from "./Banner";
import List from "./components/List.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";
import {BrowserRouter, Link, Route} from "react-router-dom";

const DEFAULT_POSTS = [
    {
        id: 1,
        title: "Post 1",
        content: "This is the content of post 1",
        author: "Nam Giang",
        active: false
    },
    {
        id: 2,
        title: "Post 2",
        content: "This is the content of post 2",
        author: "Nam Giang",
        active: true
    },
    {
        id: 3,
        title: "Post 3",
        content: "This is the content of post 3",
        author: "Văn Quang",
        active: true
    },
    {
        id: 4,
        title: "Post 4",
        content: "This is the content of post 4",
        author: "Nam Giang",
        active: true
    },
    {
        id: 5,
        title: "Post 5",
        content: "This is the content of post 5",
        author: "Văn Quang",
        active: true
    },
    {
        id: 6,
        title: "Post 6",
        content: "This is the content of post 6",
        author: "Nam Giang",
        active: true
    },
    {
        id: 7,
        title: "Post 7",
        content: "This is the content of post 7",
        author: "Văn Quang",
        active: true
    },
    {
        id: 8,
        title: "Post 8",
        content: "This is the content of post 8",
        author: "Nam Giang",
        active: true
    },
    {
        id: 9,
        title: "Post 9",
        content: "This is the content of post 9",
        author: "Văn Quang",
        active: true
    },
    {
        id: 10,
        title: "Post 10",
        content: "This is the content of post 10",
        author: "Nam Giang",
        active: true
    }];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [...DEFAULT_POSTS],
            post: {id: '', title: '', content: '', author: '', active: 1}
        };
        this.filterUser = this.filterUser.bind(this);
    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };

    onEditItem(itemInput) {
        let {posts} = this.state;
        let newPost = posts.map(item => {
            if (itemInput.id === item.id){
                item.title = itemInput.title;
                item.content = itemInput.content;
                item.author = itemInput.author;
                item.active = itemInput.active;
            }
            return item;
        });
        this.setState({post: {id: '', title: '', content: '', author: '', active: 1}, posts: newPost});
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
    }
    componentWillMount() {
        this.setState({
            filteredPost: [...this.state.posts]
        })
    }
    filterUser = (post) => {
        let updatingList = this.state.posts;
        let updatedList = updatingList.filter((item)=>{
           return item.title.toLowerCase().includes(post.filterTitle.toLowerCase()) && item.author.toLowerCase().includes(post.filterAuthor.toLowerCase()) && item.active === post.filterActive
        });
        this.setState({filteredPost: updatedList});
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <BrowserRouter>
                        <div id="mySidenav" className="sidenav">
                            <h3 className="mainTitle text-center">MENU</h3>
                            <button className="closebtn btn text-white" onClick={() => this.closeNav()}>×</button>
                            <Link to="/"><i className="fas fa-home"
                                            style={{fontSize: '18px'}}/> Home</Link>
                            <Link to="/list"><i className="fas fa-list" style={{fontSize: '18px'}}/> List</Link>
                            <Link to="/add"><i className="fas fa-plus-circle" style={{fontSize: '18px'}}/> Add new post</Link>
                        </div>
                        <br/>
                        <div id="main">
                            <Banner />
                            <span style={{fontSize: '30px', cursor: 'pointer'}}
                                  onClick={() => this.openNav()} className="mainTitle">☰MENU</span>
                            <Route exact path="/" render={() => (<h2 className="mainTitle"> Hello Admin</h2>)}/>
                            <Route path="/list" component = {(props) =>
                                <List {...props}
                                      listPosts={this.state.filteredPost}
                                      onDelete={this.onDelete.bind(this)}
                                      onEdit={this.onEdit.bind(this)}
                                      filterUser={this.filterUser}
                                />}/>
                            <Route path="/add" component={Add}/>
                            <Route path="/:id/edit" component={() => <Edit post={this.state.post} onEditItem={this.onEditItem.bind(this)}/>}/>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
