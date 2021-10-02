import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

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
import VisibilityIcon from "@material-ui/icons/Visibility";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from '@material-ui/icons/Delete';

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
    marginTop: 30,
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
  },

  flexDivtest: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingRight: 100,
  },
  postImage: {
    width: 300,
    height: "300px",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  // ddBoxIconBtntest:{
  //   width: 300,
  //   padding: 6,
  //   paddingBottom: 10,
  //   margin: 10,
  //   border: "2px solid transparent",
  //   backgroundColor: "#A2B29F",
  //   color: "#FFFFFF",
  //   display:"flex",
  //   flexDirection:"row",
  //   justifyContent:"flex-end",
  //   alignItems:"center",

  //   "&:hover": {
  //     border: "2px solid #A2B29F",
  //     color: "#A2B29F",
  //     backgroundColor: "#FFFFFF",
  //   },

  // },
  ddBoxIconBtn: {
    width: 250,
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
    cursor: "pointer",
    textDecoration: "none !important",
    fontSize: 16,
    marginRight: 20,
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
  containerSpacing: {
    paddingTop: 30,
  },
}));

export default function List_Requests() {
  const history = useHistory();

  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [requests, setRequests] = useState([]);
  const [isSent, setIsSent] = useState(true);

  async function fetchData() {
    setRequests([]);
    isSent
      ? await API.get(`getBySenderId/${_id}`).then((res) => {
          const data = res.data;
          console.log({ data });
          if (data.length) setRequests(data);
        })
      : await API.get(`getByReceiverId/${_id}`).then((res) => {
          const data = res.data;
          // console.log(data[0].senderId.username);
          if (data.length) setRequests(data);
        });
  }

  async function handleAccept(id) {
    await API.put(`requests/${id}`, { status: "Accepted" }).then(() =>
      fetchData()
    );
  }

  async function handleReject(id) {
    await API.put(`requests/${id}`, { status: "Rejected" }).then(() =>
      fetchData()
    );
  }

  async function handleDelete(id) {
    await API.delete(`requests/${id}`).then(() => fetchData());
  }

  useEffect(() => {
    fetchData();
  }, [isSent]);

  return (
    <div className="miniContainer">

    <Container>
      <Typography variant="h3" align="center" className={classes.titlePage}>
        My Requests
      </Typography>

      <Container className={classes.container}>
        <div className={classes.flexDivtest}>
          <LinkNative
            onClick={() => setIsSent(true)}
            className={classes.ddBoxIconBtnLink}
          >
            <Paper align="center" className={classes.ddBoxIconBtn}>
              <AddBoxIcon className={classes.ddBoxIcon} />
              Sent Requests
            </Paper>
          </LinkNative>
          <LinkNative
            onClick={() => setIsSent(false)}
            className={classes.ddBoxIconBtnLink}
          >
            <Paper align="center" className={classes.ddBoxIconBtn}>
              <AddBoxIcon className={classes.ddBoxIcon} />
              Received Requests
            </Paper>
          </LinkNative>
        </div>
        <TableContainer component={Paper}>
          <Table style={{ width: 700 }}>
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
                  Status
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                    User
                  </TableCell>
                {/* {isSent ? null : (
                  <TableCell className={classes.headerstyle} align="center">
                    User
                  </TableCell>
                )} */}
                <TableCell className={classes.headerstyle} align="center">
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell align="center">
                    <Image
                      src={`http://localhost:3000/uploads/${request._post.image}`}
                    />
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {request._post.medicationName}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {request._post.medicationType}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {request._post.quantity}
                  </TableCell>
                  <TableCell className={classes.bodycolor} align="center">
                    {request.status}
                  </TableCell>
                  {isSent ? <TableCell className={classes.bodycolor} align="center">
                      {request.receiverId.username}
                    </TableCell> : (
                    <TableCell className={classes.bodycolor} align="center">
                      {request.senderId.username}
                    </TableCell>
                  )}
                  <TableCell className={classes.bodycolor} align="center">
                    {isSent ? (
                      request.status == "Accepted" ? (
                        <div>
                          <LinkNative onClick={() => handleDelete(request._id)}>
                          <DeleteIcon  className={classes.ddBoxIconColor}></DeleteIcon>
                          </LinkNative>
                          <Link
                            to={`/get/contactinfo/${request.receiverId._id}`}
                          >
                            <ContactPhoneIcon className={classes.ddBoxIconColor}></ContactPhoneIcon>
                          </Link>
                        </div>
                      ) : request.status == "Rejected" ? (
                        <LinkNative onClick={() => handleDelete(request._id)}>
                          <DeleteIcon  className={classes.ddBoxIconColor}></DeleteIcon>
                        </LinkNative>
                      ) : request.status == "Waiting" ? (
                        <LinkNative onClick={() => handleDelete(request._id)}>
                          {" "}
                          <CancelIcon className={classes.ddBoxIconColor} />
                        </LinkNative>
                      ) : null
                    ) : null}

                    {isSent ? null : request.status == "Waiting" ? (
                      <div>
                        <LinkNative onClick={() => handleAccept(request._id)}>
                          <CheckCircleIcon className={classes.ddBoxIconColor} />
                        </LinkNative>
                        <LinkNative onClick={() => handleReject(request._id)}>
                          <CancelIcon className={classes.ddBoxIconColor} />
                        </LinkNative>
                        {/* <button onClick={() => handleAccept(request._id)}>
                          Accept
                        </button> */}
                        {/* <button onClick={() => handleReject(request._id)}>
                          reject
                        </button> */}
                      </div>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
    </div>

  );
}
