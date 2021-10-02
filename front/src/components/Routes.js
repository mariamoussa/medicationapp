import React, { useContext } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Register from "../pages/Home/Register";

import User_Panel from '../pages/User_Panel/User_Panel';
import Admin_Panel from '../pages/Admin_Panel/Admin_Panel';

import All_Posts from "../pages/Admin_Panel/Manage_posts/All_Posts";

import Add_Post from '../pages/User_Panel/Manage_posts/Add_Post';
import List_MyPosts from '../pages/User_Panel/Manage_posts/List_My_Medications/List_MyPosts';
import List_MyRequests from '../pages/User_Panel/Manage_posts/List_My_Medications/List_MyRequests';
import List_All_MyMedications from '../pages/User_Panel/Manage_posts/List_My_Medications/List_All_MyMedications';
import Edit_Post from "../pages/User_Panel/Manage_posts/Edit_Post";
import PostInfo from "../pages/User_Panel/Manage_posts/PostInfo";
import Get_Post_User from "../pages/User_Panel/Manage_posts/Get_Post_User";

import List_Post from '../pages/User_Panel/Manage_posts/List_Medication/List_Posts';
import List_Needed from '../pages/User_Panel/Manage_posts/List_Medication/List_Needed';
import List_Available from '../pages/User_Panel/Manage_posts/List_Medication/List_Available';

import List_Requests from "../pages/Admin_Panel/Manage_Requests/List_Requests";
import My_Requests from "../pages/User_Panel/Manage_requests/My_Request";

import SessionContext from "./sessions/SessionContext";
import Report_User from "../pages/User_Panel/Manage_reports/Report_User";
import List_Users from "../pages/Admin_Panel/Manage_users/List_Users";
import List_Reports from "../pages/Admin_Panel/Manage_Reports/List_Reports";
import User_Reports from "../pages/Admin_Panel/Manage_Reports/User_Reports";
import My_Profile from "../pages/User_Panel/Manage_User/My_Profile";
import Change_Password from "../pages/User_Panel/Manage_User/Change_Password";
import Sidebar from "./Sidebar";

function PrivateRouteAdmin({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={p => (user.token && user.role_id == "admin") ?
            <Comp {...p} /> :
            <Redirect {...p} to="/" />
        } />
    )
}

function PrivateRouteUser({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={p => (user.token && user.role_id == "user") ?
            <Comp {...p} /> :
            <Redirect {...p} to="/" />
        }
        />
    )
}

function PrivateRoute({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={p => (user.token) ?
            <Comp {...p} /> :
            <Redirect {...p} to='/' />
        } />
    )
}

function PublicRoute({ user, component: Comp, ...props }) {
    return (
        <Route {...props} render={p => user.token ?
            <Redirect {...p} to={user.role_id == "admin" ? "/admin/panel" : (user.role_id == "user" ? "/user/panel" : "/")} /> :
            <Comp {...p} />
        } />
    )
}

export default function Routes() {

    let { session: { user } } = useContext(SessionContext);

    return (
        <div className="superContainer">
            <Sidebar view={user.token && user.role_id ? true : false} />

                <Switch>
                    <PublicRoute user={user} path="/" component={Home} exact />
                    <PublicRoute user={user} path="/login" component={Login} />
                    <PublicRoute user={user} path="/register" component={Register} />

                    <PrivateRouteAdmin user={user} path="/admin/panel" component={Admin_Panel} />
                    <PrivateRouteAdmin user={user} path="/all/post" component={All_Posts} />
                    <PrivateRouteAdmin user={user} path='/list/requests' component={List_Requests} />

                    <PrivateRouteAdmin user={user} path='/list/users' component={List_Users} />
                    <PrivateRouteAdmin user={user} path='/list/reports' component={List_Reports} />
                    <PrivateRouteAdmin user={user} path='/user/reports/:_Reported' component={User_Reports} />

                    <PrivateRouteUser user={user} path="/user/panel" component={User_Panel} />

                    <PrivateRouteUser user={user} path="/add/post" component={Add_Post} />
                    <PrivateRouteUser user={user} path="/get/post/:id" component={PostInfo} />
                    <PrivateRouteUser user={user} path="/edit/post/:id" component={Edit_Post} />
                    <PrivateRouteUser user={user} path="/list/myposts" component={List_MyPosts} />
                    <PrivateRouteUser user={user} path="/list/myrequests" component={List_MyRequests} />
                    <PrivateRouteUser user={user} path="/list/mymedications" component={List_All_MyMedications} />
                    <PrivateRouteUser user={user} path="/get/contactinfo/:id" component={Get_Post_User} />

                    <PrivateRouteUser user={user} path="/list/post" component={List_Post} />
                    <PrivateRouteUser user={user} path="/list/needed" component={List_Needed} />
                    <PrivateRouteUser user={user} path="/list/available" component={List_Available} />

                    <PrivateRouteUser user={user} path="/myrequests" component={My_Requests} />
                    <PrivateRouteUser user={user} path="/report/user/:id" component={Report_User} />


                    <PrivateRoute user={user} path="/myprofile" component={My_Profile} />
                    <PrivateRouteUser user={user} path="/changepassword" component={Change_Password} />

                </Switch>
        </div>
    )
}