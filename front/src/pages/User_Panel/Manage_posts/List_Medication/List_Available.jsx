import React, { useState, useEffect, useContext } from "react";
import API from "../../../../API";
import SessionContext from "../../../../components/sessions/SessionContext";

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
    backgroundColor: "#FFFFFF",
    color: "#8BE3D9",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#8BE3D9",
    },
  },
  ddBoxIconBtnLink: {
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
}));

export default function List_Posts() {
  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [posts, setPosts] = useState([]);

  async function fetchData() {
    await API.post(`isPost`, { isPost: true }).then((res) => {
      let data = res.data;
      setPosts(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CssBaseline />
      <Typography variant="h3" align="center" className="titlePage">
        Posts
      </Typography>
      <Container className={classes.container}>
        <Link to={`/add/post`} className={classes.ddBoxIconBtnLink}>
          <Paper align="center" className={classes.ddBoxIconBtn}>
            <AddBoxIcon className={classes.ddBoxIcon} />
            Add Post
          </Paper>
        </Link>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">user</TableCell>
                <TableCell align="center">Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) =>
                post._user ? (
                  <TableRow key={post.id}>
                    <TableCell align="center">{post.medicationName}</TableCell>
                    <TableCell align="center">{post.medicationType}</TableCell>
                    <TableCell align="center">{post.quantity}</TableCell>
                    <TableCell align="center">{post.description}</TableCell>
                    <TableCell align="center">{post.date}</TableCell>
                    <TableCell align="center">
                      {post._user && post._user.firstName}{" "}
                      {post._user && post._user.lastName}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/get/post/${post._id}`}>View</Link>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
