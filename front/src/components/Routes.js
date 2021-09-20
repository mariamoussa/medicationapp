import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";

import User_Panel from '../pages/User_Panel/User_Panel';
import Admin_Panel from '../pages/Admin_Panel/Admin_Panel';

import All_Posts from "../pages/Admin_Panel/Manage_posts/All_Posts";

import Add_Post from '../pages/User_Panel/Manage_posts/Add_Post';
import List_Post from '../pages/User_Panel/Manage_posts/List_Posts';
import List_MyPosts from '../pages/User_Panel/Manage_posts/List_MyPosts';
import Edit_Post from "../pages/User_Panel/Manage_posts/Edit_Post";
import PostInfo from "../pages/User_Panel/Manage_posts/PostInfo";
import Get_Post_User from "../pages/User_Panel/Manage_posts/Get_Post_User";

import List_Requests from "../pages/Admin_Panel/Manage_Requests/List_Requests";
import My_Requests from "../pages/User_Panel/Manage_requests/My_Request";

import SessionContext from "./sessions/SessionContext";

function PrivateRouteAdmin({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => (user.token && user.role_id == "admin") ?
            <Comp {...props} /> :
            <Redirect {...props} to="/" />
        } />
    )
}

function PrivateRouteUser({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => (user.token && user.role_id == "user") ?
            <Comp {...props} /> :
            <Redirect {...props} to="/" />
        } />
    )
}

function PrivateRoute({ user, component: Comp, ...props }) {
    console.log(user);
    return (
        <Route {...props} render={props => (user.token) ?
            <Comp {...props} /> :
            <Redirect to='/' />
        } />
    )
}

function PublicRoute({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => user.token ?
            <Redirect {...props} to={user.role_id == "admin" ? "/admin/panel" : (user.role_id == "user" ? "/user/panel" : "/")} /> :
            <Comp {...props} />
        } />
    )
}

export default function Routes(props) {
    let { session: { user } } = useContext(SessionContext);
    return (
        <Switch>
            <PublicRoute user={user} path="/" component={Home} exact {...props} />
            <PublicRoute user={user} path="/login" component={Login} {...props} />
            <PublicRoute user={user} path="/register" component={Register} {...props} />

            <PrivateRouteAdmin user={user} path="/admin/panel" component={Admin_Panel} {...props} />
            <PrivateRouteAdmin user={user} path="/all/post" component={All_Posts} {...props} />
            <PrivateRouteAdmin user={user} path='/list/requests' component={List_Requests} {...props} />

            <PrivateRouteUser user={user} path="/user/panel" component={User_Panel} {...props} />

            <PrivateRoute user={user} path="/add/post" component={Add_Post} {...props} />
            <PrivateRoute user={user} path="/list/post" component={List_Post} {...props} />
            <PrivateRoute user={user} path="/edit/post/:id" component={Edit_Post} {...props} />
            <PrivateRoute user={user} path="/list/myposts" component={List_MyPosts} {...props} />
            <PrivateRoute user={user} path="/get/post/:id" component={PostInfo} {...props} />
            <PrivateRoute user={user} path="/get/contactinfo/:id" component={Get_Post_User} {...props} />

            <PrivateRoute user={user} path="/my/request" component={My_Requests} {...props} />

        </Switch>
    )
}