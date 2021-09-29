import React, { useContext, useEffect, useState } from "react";
import { getCookie, removeCookie } from "../cookie";
import { Link } from "react-router-dom";
import API from "../API";
import SessionContext from "./sessions/SessionContext";

import {
  Container,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  Settings,
  Storefront,
  Group,
  EventNote,
  Menu,
  ClearAll,
  MonetizationOn,
  InsertInvitation,
  AssignmentTurnedIn,
  AssignmentInd,
  AddBox,
  Timer,
} from "@material-ui/icons";

import Logo from "../images/LOGO.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    height: "100vh",
    color: "#FFFFFF",
    paddingTop: theme.spacing(20),
    backgroundColor: "#8BE3D9",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
      paddingTop: theme.spacing(10),
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    color: "#FFFFFF",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#000000",
    },
  },
  item2: {
    display: "flex",
    alignItems: "center",
    color: "#FFFFFF",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "6px",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#000000",
    },
  },
  options: {
    display: "flex",
    alignItems: "center",
    color: "#FFFFFF",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "5px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#FFFFFF",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
  },
  bottomDiv: {
    paddingTop: theme.spacing(1),
    position: "absolute",
    bottom: 0,
    width: "80%",
    borderTop: "2px solid #FFFFFF ",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: "#8BE3D9",
  },
  topDiv: {
    height: "70%",
    overflowX: "hidden",
    overflowY: "visible",
    "&::-webkit-scrollbar-thumb": {
      background: "#FF0000",
    },
    " &::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },
  smallLogo: {
    width: "10px",
  },
  bigLogo: {
    position: "absolute",
    top: 5,
    left: 20,
    width: "200px",
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  btnShowHide: {
    display: "none",
    position: "absolute",
    top: 10,
    right: 10,
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  toolbar: {
    display: "none",
    justifyContent: "space-between",
    backgroundColor: "#8BE3D9",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  logo: {
    display: "block",
  },
  showIcon: {
    alignItems: "center",
    display: (props) => (props.show ? "none" : "block"),
  },
  hideIcon: {
    alignItems: "center",
    display: (props) => (props.show ? "block" : "none"),
  },
}));

export default function Sidebar(props) {
  let view = props.view;

  const [show, setShow] = useState(true);
  const [postOptions, setPostOptions] = useState(false);
  const [postOptionsUser, setPostOptionsUser] = useState(false);

  const classes = useStyles({ show });

  const {
    session: { user },
    actions: { signOut },
  } = useContext(SessionContext);

  async function handleHideShow() {
    show ? setShow(false) : setShow(true);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      window.innerWidth > 960 ? setShow(true) : setShow(false);
    });
  }, [show]);

  return (
    <>
      {user.role_id === "admin" || user.role_id === "user" ? (
        <AppBar style={{ display: view ? "block" : "none" }}>
          <Toolbar className={classes.toolbar}>
            {/* <img src={Logo} className={classes.smallLogo} alt="MOBAYED" /> */}

            <div className={classes.icons}>
              <a onClick={handleHideShow}>
                <Menu className={classes.showIcon} />
                <ClearAll className={classes.hideIcon} />
              </a>
            </div>
          </Toolbar>
        </AppBar>
      ) : null}

      <div style={{ display: view ? "block" : "none" }}>
        <Container
          className={classes.container}
          style={{ display: show ? "block" : "none" }}
        >
          {/* <img src={Logo} className={classes.bigLogo} alt="MOBAYED" /> */}

          {user.role_id === "admin" ? (
            <div className={classes.topDiv}>
              <Link to="/admin/panel" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>HOME</Typography>
              </Link>

              <div
                onMouseOver={() => setPostOptions(true)}
                onMouseLeave={() => setPostOptions(false)}
              >
                <Link to="/all/post" className={classes.item}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>POSTS</Typography>
                </Link>

                <div style={{ display: postOptions ? "block" : "none" }}>
                  <Link to="/all/post" className={classes.options}>
                    <List className={classes.icon} />
                    <Typography className={classes.text}>POSTS</Typography>
                  </Link>
                </div>
              </div>

              <Link to="/list/requests" className={classes.item}>
                <Group className={classes.icon} />
                <Typography className={classes.text}>REQUESTS</Typography>
              </Link>

              <Link to="/list/users" className={classes.item}>
                <Person className={classes.icon} />
                <Typography className={classes.text}>USERS</Typography>
              </Link>

              <Link to="/list/reports" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>REPORTS</Typography>
              </Link>
            </div>
          ) : null}

          {user.role_id === "user" ? (
            <div className={classes.topDiv}>
              <Link to="/user/panel" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>HOMEPAGE</Typography>
              </Link>

              <Link to="/list/post" className={classes.item}>
                <List className={classes.icon} />
                <Typography className={classes.text}>MEDICATIONS</Typography>
              </Link>

              <div style={{ marginLeft: 20 }}>
                <Link to="/list/needed" className={classes.options}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>NEEDED</Typography>
                </Link>

                <Link to="/list/available" className={classes.options}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>AVAILABLE</Typography>
                </Link>
              </div>

              {/* <Link to="/list/post" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>POSTS</Typography>
              </Link> */}

              <Link to="/list/mymedications" className={classes.item}>
                <List className={classes.icon} />
                <Typography className={classes.text}>MY MEDICATIONS</Typography>
              </Link>

              <div style={{ marginLeft: 20 }}>
                <Link to="/list/myposts" className={classes.options}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>POSTS</Typography>
                </Link>

                <Link to="/list/myrequests" className={classes.options}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>REQUESTS</Typography>
                </Link>
              </div>

              {/* <Link to="/list/myposts" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>MY POSTS</Typography>
              </Link>

              <Link to="/myrequests" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>MY REQUESTS</Typography>
              </Link> */}
            </div>
          ) : null}

          <div className={classes.bottomDiv}>
            <Link to="/myprofile" className={classes.item2}>
              <Settings className={classes.icon} />
              <Typography className={classes.text}>MY PROFILE</Typography>
            </Link>

            <a onClick={signOut} className={classes.item2}>
              <ExitToApp className={classes.icon} />
              <Typography className={classes.text}>LOGOUT</Typography>
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
