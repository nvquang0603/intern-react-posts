import React, {Component} from 'react';
import './App.css';
import Menu from './modules/components/Menu';
import Banner from "./modules/components/Banner";
import List from "./modules/components/Post/List";
import Add from "./modules/components/Post/Add.js";
import Edit from "./modules/components/Post/Edit.js";
import Constant from './common/Constant';
import Home from "./modules/components/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {showNotification} from './common/Notification';

class App extends Component {

    constructor(props) {
        super(props);
        this.deleteNotification = this.deleteNotification.bind(this);
        this.notificationDOMRef = React.createRef();

    }
    successAddNotification() {
        showNotification(this, Constant.NOTIFICATION.SUCCESS, 'success', 'The post has been added!')
    }

    editNotification(id) {
        showNotification(this, Constant.NOTIFICATION.SUCCESS, 'success', 'The #' + id + ' post has been updated!');
    }

    deleteNotification(id) {
        showNotification(this, Constant.NOTIFICATION.DELETE, 'danger', 'The #' + id + ' post has been deleted!');
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
                                <ReactNotification ref={this.notificationDOMRef} />
                            </div>
                            <Switch>
                                <Route exact path="/" component={() => <Home />}/>
                                <Route path="/list" component={() =>
                                    <List deleteNotification={this.deleteNotification.bind(this)}/>}
                                />
                                <Route path="/add"
                                       component={() => <Add/>}/>
                                <Route path="/:id/edit" component={() => <Edit editNotification={this.editNotification.bind(this)}/>}/>
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
