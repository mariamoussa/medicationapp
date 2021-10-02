import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";
import { get } from "lodash";
import SessionContext from "../../../components/sessions/SessionContext";
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
    cursor:"pointer"
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


export default function List_Requests() {
  const history = useHistory();
  const classes=useStyles();

  const [requests, setRequests] = useState([]);

  async function deletePost(id) {
    try {
      await API.delete(`requests/${id}`);
    } catch (e) {
      console.log(e);
    }
    await fetchData();
  }
  

  function fetchData() {
    API.get(`requests`).then((res) => {
      let data = res.data;
      console.log(data);
      if (data.length) {
        setRequests(data);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <>
      <CssBaseline />
      <Typography variant="h3" align="center" className={classes.titlePage}>
        REQUESTS LIST
      </Typography>
      <Container className={classes.container}>
        <div className={classes.stylebutton}>
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
                  Sender
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Receiver
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Status
                </TableCell>
                <TableCell className={classes.headerstyle} align="center">
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {requests.map((request) => 
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
                    {request.receiverId.username}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                    {request.senderId.username}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                    {request.status}
                    </TableCell>
                    <TableCell className={classes.bodycolor} align="center">
                      <LinkNative onClick={() => deletePost(request._id)}>
                        <DeleteIcon
                          className={classes.ddBoxIconColor}
                        ></DeleteIcon>
                      </LinkNative>
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
