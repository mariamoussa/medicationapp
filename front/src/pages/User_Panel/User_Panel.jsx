import React, { useContext } from "react";
import SessionContext from "../../components/sessions/SessionContext";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import moment from "moment";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Container,
  Paper,
  TextField,
  CssBaseline,
  makeStyles,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: 5,
    marginBottom: 30,
  },
  paperFilter: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  root: {
    "& label.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  ddBoxIconBtn: {
    width: 160,
    padding: 6,
    paddingBottom: 10,
    margin: 10,
    border: "2px solid transparent",
    backgroundColor: "#FFFFFF",
    color: "#A2B29F",
    "&:hover": {
      border: "2px solid #FFFFFF",
      color: "#FFFFFF",
      backgroundColor: "#A2B29F",
    },
  },
  ddBoxIconBtnLink: {
    marginTop: 30,
    width: 160,
    textDecoration: "none",
    fontSize: 16,
  },
  ddBoxIcon: {
    position: "relative",
    top: 6,
    right: 10,
  },
  widthBtn: {
    width: 20,
  },
  editIcon: {
    color: "#8BE3D9",
    "&:hover": {
      color: "#BEF4F4",
    },
  },
  deleteIcon: {
    color: "#ed4f1c",
    "&:hover": {
      color: "#e24414",
    },
  },
  iconDownUp: {
    position: "relative",
    top: 6,
    textDecoration: "none",
    color: "#272727",
  },
  iconDU: {
    fontSize: 26,
  },
  linkOrder: {
    textDecoration: "none",
    color: "#272727",
  },
  paginationDiv: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  btnPagination: {
    display: "flex",
    flexDirection: "row",
    "& Button": {
      marginLeft: 4,
    },
    "& .BtnPageActive": {
      backgroundColor: "#BEF4F4",
    },
    "& .BtnPage": {
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    },
  },
  buttonNextPrev: {
    width: 100,
    padding: 3,
    fontWeight: "none",
    fontSize: 12,
  },
  titlePage:{
    color:"white",
  }
}));

export default function User_Panel() {
  const classes = useStyles();

  const history = useHistory();

  let {
    session: {
      user: { _id, username },
    },
    actions: { signOut },
  } = useContext(SessionContext);

  return (
    <>
      <Container className={classes.container}>
      <Typography variant="h3" align="center" className={classes.titlePage}>Welcome {username}</Typography>          
        <Link
          to={`/list/post` }
          className={classes.ddBoxIconBtnLink}
        >
          <Paper align="center" className={classes.ddBoxIconBtn}>
            <AddBoxIcon className={classes.ddBoxIcon} />
            All Posts
          </Paper>
        </Link>
        <Link
          to= {`/list/myposts` }
          className={classes.ddBoxIconBtnLink}
        >
          <Paper align="center" className={classes.ddBoxIconBtn}>
            <AddBoxIcon className={classes.ddBoxIcon} />
            My Posts
          </Paper>{" "}
        </Link>
        <Link
         to={`/myrequests`}
          className={classes.ddBoxIconBtnLink}
        >
          <Paper align="center" className={classes.ddBoxIconBtn}>
            <AddBoxIcon className={classes.ddBoxIcon} />
            My Requests
          </Paper>{" "}
        </Link>
        <Link
          to={`/myprofile` }
          className={classes.ddBoxIconBtnLink}
        >
          <Paper align="center" className={classes.ddBoxIconBtn}>
            <AddBoxIcon className={classes.ddBoxIcon} />
            My Profile
          </Paper>
        </Link>
      </Container>
    </>
  );
}
