import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";

import DeleteIcon from "@material-ui/icons/Delete";

import { Link } from "react-router-dom";
import moment from "moment";

import {
  TableContainer,
  Link as LinkNative,
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

import Image from "material-ui-image";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
// import PreviewIcon from '@material-ui/icons/Preview';
import VisibilityIcon from "@material-ui/icons/Visibility";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "#A2B29F",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#A2B29F",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#A2B29F",
      },
      "&:hover fieldset": {
        borderColor: "#A2B29F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A2B29F",
      },
    },
    marginTop: 15,
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#A2B29F",
    color: "white !important",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    width: 120,
    marginBottom: 20,
    marginTop: 50,
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: "10px",
    borderRadius: "5px",
  },
  FormLabel: {
    color: "#A2B29F",
    textAlign: "center",
    marginTop: 12,
  },
  FormControl: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-around",
    "& .radioR1": {
      display: "flex",
      flexFlow: "row",
      justifyContent: "space-between",
    },
    "& .radioR2": {
      display: "flex",
      flexFlow: "row",
    },
  },
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  postImage: {
    width: 300,
    height: "300px",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  ddBoxIconBtn: {
    width: 160,
    padding: 6,
    paddingBottom: 10,
    margin: 10,
    border: "2px solid transparent",
    backgroundColor: "#A2B29F",
    color: "#FFFFFF",
    "&:hover": {
      border: "2px solid #A2B29F",
      color: "#A2B29F",
      backgroundColor: "#FFFFFF",
    },
  },
  ddBoxIconColor: {
    color: "#A2B29F",
    cursor: "pointer",
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
  stylebutton: {
    paddingLeft: 750,
    paddingTop: 10,
  },
  headerstyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
  headercolor: {
    backgroundColor: "#A2B29F",
  },
  titlePage: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bodycolor: {
    color: "black",
    fontWeight: "strong",
  },
}));

export default function List_Users() {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  async function deleteUser(id) {
    try {
      await API.delete(`users/${id}`);
    } catch (e) {
      console.log(e);
    }
    await fetchData();
  }

  async function fetchData() {
    await API.get("users").then((res) => {
      let data = res.data;
      console.log("users");
      console.log(data);
      setUsers(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="miniContainer">

      <CssBaseline />
      <Typography variant="h3" align="center" className={classes.titlePage}>
        ALL Users
      </Typography>
      <Container className={classes.container}>
        <div className={classes.stylebutton}></div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className={classes.headercolor}>
              <TableRow>
                <TableCell className={classes.headerstyle} align="center">
                  Full Name
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Username
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Email
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Gender
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Phone Number
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Date of Birth
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.username}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.email}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.gender}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.phone}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {user.birthdate}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    <LinkNative onClick={() => deleteUser(user._id)}>
                      <DeleteIcon
                        className={classes.ddBoxIconColor}
                      ></DeleteIcon>
                    </LinkNative>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
