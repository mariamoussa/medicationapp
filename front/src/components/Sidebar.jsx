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
  List,
  CallMissed,
  CallMissedOutgoing,
  ExitToApp,
  Report,
  Home,
  Person,
  Settings,
  FlipCameraAndroid,
    Group,
  Menu,
  ClearAll,
  EnhancedEncryption
} from "@material-ui/icons";

import Logo from "../images/LOGO.png";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    height: "100vh",
    color: "#A2B29F",
    paddingTop: theme.spacing(15),
    backgroundColor: "#FFFFFF",
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
    color: "#A2B29F",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "10px",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#A2B29F",
    },
  },
  item2: {
    display: "flex",
    alignItems: "center",
    color: "#A2B29F",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "6px",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#A2B29F",
    },
  },
  options: {
    display: "flex",
    alignItems: "center",
    color: "#A2B29F",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "5px",
    marginLeft: "10px",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#A2B29F",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  bottomDiv: {
    paddingTop: theme.spacing(1),
    position: "absolute",
    bottom: 0,
    width: "80%",
    borderTop: "2px solid #A2B29F ",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: "#FFFFFF",
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
    position: "absolute",
    width: "150px",
  },
  bigLogo: {
    position: "absolute",
    top: 10,
    left: 10,
    width: "190px",
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
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  logo: {
    display: "block",
  },
  showHideIcon: {
    position: "absolute",
    top: 20,
    right: 15,
    color: "#A2B29F",
    fontSize: 30,
  },
}));

export default function Sidebar(props) {
  let view = props.view;

  const [show, setShow] = useState(true);
  const classes = useStyles();

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
            <img src={Logo} className={classes.smallLogo} alt="MEDONATIONS" />

            <div>
              <a onClick={handleHideShow}>
                {show ? (
                  <ClearAll className={classes.showHideIcon} />
                ) : (
                  <Menu className={classes.showHideIcon} />
                )}
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
          <img src={Logo} className={classes.bigLogo} alt="MEDonations" />

          {user.role_id === "admin" ? (
            <div className={classes.topDiv}>
              <Link to="/admin/panel" className={classes.item}>
                <Home className={classes.icon} />
                <Typography className={classes.text}>HOME</Typography>
              </Link>

              <Link to="/all/post" className={classes.item}>
                <EnhancedEncryption className={classes.icon} />
                <Typography className={classes.text}>MEDICATIONS</Typography>
              </Link>

              {/* <div>
                <Link to="/all/post" className={classes.options}>
                  <List className={classes.icon} />
                  <Typography className={classes.text}>POSTS</Typography>
                </Link>
              </div> */}

              <Link to="/list/requests" className={classes.item}>
                <CallMissedOutgoing className={classes.icon} />
                <Typography className={classes.text}>REQUESTS</Typography>
              </Link>

              <Link to="/list/users" className={classes.item}>
                <Group className={classes.icon} />
                <Typography className={classes.text}>USERS</Typography>
              </Link>

              <Link to="/list/reports" className={classes.item}>
                <Report className={classes.icon} />
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
                  <CallMissed className={classes.icon} />
                  <Typography className={classes.text}>NEEDED</Typography>
                </Link>

                <Link to="/list/available" className={classes.options}>
                  <CallMissedOutgoing className={classes.icon} />
                  <Typography className={classes.text}>AVAILABLE</Typography>
                </Link>
              </div>

              <Link to="/list/mymedications" className={classes.item}>
                <List  className={classes.icon} />
                <Typography className={classes.text}>MY MEDICATIONS</Typography>
              </Link>

              <div style={{ marginLeft: 20 }}>
                <Link to="/list/myposts" className={classes.options}>
                  <CallMissed className={classes.icon} />
                  <Typography className={classes.text}>POSTS</Typography>
                </Link>

                <Link to="/list/myrequests" className={classes.options}>
                  <CallMissedOutgoing className={classes.icon} />
                  <Typography className={classes.text}>REQUESTS</Typography>
                </Link>
              </div>

              <Link to="/myrequests" className={classes.options}>
                <FlipCameraAndroid className={classes.icon} />
                <Typography className={classes.text}>MY REQUESTS</Typography>
              </Link>
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
