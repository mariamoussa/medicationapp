import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
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

import Image from "material-ui-image";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   width: "100%",
  //   margin: 5,
  //   marginBottom: 30,
  // },
  // paperFilter: {
  //   backgroundColor: "#FFFFFF",
  //   padding: 12,
  //   marginBottom: 10,
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
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
  ddBoxIconColor: {
    color: "#A2B29F",
  },
}));

export default function List_MyPosts() {
  let history = useHistory();
  const [posts, setPosts] = useState([]);

  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  async function deletePost(id) {
    try {
      await API.delete(`posts/${id}`);
    } catch (e) {
      console.log(e);
    }
    await fetchData();
  }

  async function fetchData() {
    await API.post(`isPost`, { isPost: true, _user: _id }).then((res) => {
      let data = res.data;
      setPosts(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="miniContainer">
      <CssBaseline />
      <Typography variant="h3" align="center" className={classes.titlePage}>
        I HAVE THESE MEDICATIONS
      </Typography>
      <Container className={classes.container}>
        <div className={classes.stylebutton}>
          <Link to={`/add/post`} className={classes.ddBoxIconBtnLink}>
            <Paper align="center" className={classes.ddBoxIconBtn}>
              <AddBoxIcon className={classes.ddBoxIcon} />
              Add Post
            </Paper>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className={classes.headercolor}>
              <TableRow>
                <TableCell className={classes.headerstyle} align="center">
                  Image
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Medication
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Type
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Quantity
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Description
                </TableCell>
                {/* <TableCell className={classes.headerstyle} align="center">
                  Date
                </TableCell> */}
                <TableCell className={classes.headerstyle} align="center">
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) =>
                post._user ? (
                  <TableRow key={post.id}>
                    <TableCell align="center">
                      <Image
                        src={`http://localhost:3000/uploads/${post.image}`}
                      />
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                      {post.medicationName}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                      {post.medicationType}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                      {post.quantity}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                      {post.description}
                    </TableCell>
                    {/* <TableCell className={classes.bodycolor} align="center">
                      {post.date}
                    </TableCell> */}
                    <TableCell align="center">
                      <Link to={`/edit/post/${post._id}`}>
                        <EditIcon className={classes.ddBoxIconColor}></EditIcon>
                      </Link>
                      {"     "}
                      <LinkNative onClick={() => deletePost(post._id)}>
                        <DeleteIcon
                          className={classes.ddBoxIconColor}
                        ></DeleteIcon>
                      </LinkNative>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>

    // <>
    //   <CssBaseline />
    //   <Typography variant="h3" align="center" className="titlePage">
    //     My Available Medications
    //   </Typography>
    //   <Container className={classes.container}>
    //     <Link to={`/add/post`} className={classes.ddBoxIconBtnLink}>
    //       <Paper align="center" className={classes.ddBoxIconBtn}>
    //         <AddBoxIcon className={classes.ddBoxIcon} />
    //         Add Post
    //       </Paper>
    //     </Link>
    //     <TableContainer component={Paper}>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell align="center">Medication Name</TableCell>
    //             <TableCell align="center">Type</TableCell>
    //             <TableCell align="center">Quantity</TableCell>
    //             <TableCell align="center">Description</TableCell>
    //             <TableCell align="center">Date Posted</TableCell>
    //             <TableCell align="center">Manage</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {posts.map((post) => (
    //             <TableRow key={post.id}>
    //               <TableCell align="center">{post.medicationName}</TableCell>
    //               <TableCell align="center">{post.medicationType}</TableCell>
    //               <TableCell align="center">{post.quantity}</TableCell>
    //               <TableCell align="center">{post.description}</TableCell>
    //               <TableCell align="center">{post.date}</TableCell>
    //               <TableCell align="center">
    //                 <Link to={`/edit/post/${post._id}`}>Edit</Link>
    //                 <LinkNative onClick={() => deletePost(post._id)}>
    //                   Delete
    //                 </LinkNative >
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     {/* // <button onClick={() => deletePost(post._id)}>Delete</button> */}
    //   </Container>
    // </>
  );
}
