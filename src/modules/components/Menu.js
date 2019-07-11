import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'List',
        to: '/list',
        exact: false
    },
    {
        name: 'Add new post',
        to: '/add',
        exact: false
    }
];
class Menu extends Component {
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };
    showMenus = (menus) => {
        let result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <NavLink
                        key={index}
                        exact={menu.exact}
                        to={menu.to}
                        activeClassName={"active"}
                    >
                        {menu.name}
                    </NavLink>
                )
            })
        }
        return result;
    };
    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <h3 className="mainTitle text-center">MENU</h3>
                <button className="closebtn btn text-white" onClick={() => this.closeNav()}>×</button>
                { this.showMenus(menus) }
            </div>
        );
    }
}
export default Menu;