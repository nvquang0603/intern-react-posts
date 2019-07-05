import React from 'react';
import List from "./components/List.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";
import Home from "./components/Home";
const routes = [
        {
            path: '/',
            exact: true,
            main: () => <Home listPosts={this.props.posts}/>
        },
        {
            path: '/list',
            exact: false,
            main: () => <List
                version={this.props.version}
                listPosts={this.props.filteredPost}
                onDelete={this.onDelete.bind(this)}
                onEdit={this.onEdit.bind(this)}
                filterUser={this.filterUser}
                resetTable={this.resetTable}
            />
        },
        {
            path: '/add',
            exact: false,
            main: () => <Add
                onSetPost={this.onSetPost}
                listPosts={this.state.posts}/>
        },
        {
            path: '/:id/edit',
            exact: false,
            main: () => <Edit post={this.state.post}
                              onEditItem={this.onEditItem.bind(this)}/>
        }
    ];
export default routes;