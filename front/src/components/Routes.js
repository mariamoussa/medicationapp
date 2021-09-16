import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";

import User_Panel from '../pages/User_Panel/User_Panel';
import Admin_Panel from '../pages/Admin_Panel/Admin_Panel';

import Add_Post from "../pages/User_Panel/Manage_posts/Add_Post";
import List_Post from '../pages/User_Panel/Manage_posts/List_Posts';

import SessionContext from "./sessions/SessionContext";


function PrivateRouteAdmin({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => (user.token && user.role_id !== "admin") ?
            <Comp {...props} /> :
            <Redirect {...props} to="/" />
        } />
    )
}

function PrivateRouteUser({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => (user.token || user.role_id == "user") ?
            <Comp {...props} /> :
            < Redirect {...props} to="/" />
        } />
    )
}


function PrivateRoute({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => (user.token) ?
            <Comp {...props} /> :
            < Redirect {...props} to="/add/post" />
        } />
    )
}

function PublicRoute({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={props => user.token ?
            <Redirect {...props} to={user.role_id == "admin" ? "/admin/panel" : "/user/panel"} /> :
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

            <PrivateRouteUser user={user} path="/user/panel" component={User_Panel} {...props} />

            <PrivateRoute user={user} path="/add/post" component={Add_Post} {...props} />
            <PrivateRoute user={user} path="/add/post" component={List_Post} {...props} />
        </Switch>
    )
}