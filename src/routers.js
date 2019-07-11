import React from 'react';
import Index from "./modules/components/Post/List";
import Add from "./modules/components/Post/Add.js";
import Edit from "./modules/components/Post/Edit.js";
import Home from "./modules/components/Home";
const routers = [
        {
            path: '/',
            exact: true,
            main: () => <Home listPosts={this.props.posts}/>
        },
        {
            path: '/list',
            exact: false,
            main: () => <Index
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
export default routers;