import React, {Component} from 'react';
import './App.css';
import Menu from './modules/components/Menu';
import Banner from "./modules/components/Banner";
import List from "./modules/containers/postList";
import Add from "./modules/components/Post/Add.js";
import Edit from "./modules/containers/editPost";
import Home from "./modules/components/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ActiveMark from "./common/ActiveMark";

class App extends Component {

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

    };

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

                            </div>
                            <Switch>
                                <Route exact path="/" component={() => <Home />}/>
                                <Route path="/list" component={() =>
                                    <List />}
                                />
                                <Route path="/add"
                                       component={() => <Add onSetPost={this.onSetPost}
                                                             listPosts={this.state.posts}/>}/>
                                <Route path="/:id/edit" component={() => <Edit />}/>
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
