import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

import { Link } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Link as LinkNative,
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  RadioGroup,
  FormLabel,
  Radio,
} from "@material-ui/core";

import Image from "material-ui-image";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AssignmentIcon from "@material-ui/icons/Assignment";
import AddBoxIcon from "@material-ui/icons/AddBox";

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
  ddBoxIconBtnLink: {
    marginTop: 30,
    width: 160,
    textDecoration: "none !important",
    fontSize: 16,
    cursor: "pointer",

  },
  ddBoxIcon: {
    position: "relative",
    top: 6,
    right: 10,
  },
  titlecolor: {
    color: "#A2B29F",
    fontWeight: "bold",
  },
}));

export default function PostInfo() {
  let history = useHistory();
  let { id } = useParams();

  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: "",
    description: "",
    image: "",
    isPost: "",
    isActive: "",
    _user: "",
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  function handleRequest() {
    let reqBody = {
      _user: _id,
      _post: id,
    };
    API.post("requests", reqBody).then(() => {
      history.push({ pathname: "/myrequests" });
    });
  }

  useEffect(() => {
    function fetchData() {
      API.get(`posts/${id}`).then((res) => {
        const data = res.data;
        setState({
          medicationName: data.medicationName,
          medicationType: data.medicationType,
          quantity: data.quantity,
          description: data.description,
          image: data.image,
          isPost: data.isPost ? "Post" : "Request",
          isActive: data.isActive ? "Active" : "Closed",
          _user: data._user,
        });
      });
    }
    fetchData();
  }, []);

  return (
    <Container component="main" className={classes.container}>
      <Typography
        variant="h3"
        align="center"
        className="titlePage"
      ></Typography>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.titlecolor}>
          Medication Infos
        </Typography>
        <form className={classes.form}>
          <div className={classes.flexDiv}>
            <div className={classes.postImage}>
              <Grid spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Medication Name"
                    name="medicationName"
                    value={state.medicationName}
                    // onChange={handleChange}
                    className={classes.root}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth className={classes.FormControl}>
                    <FormLabel className={classes.FormLabel}>
                      Medication Type
                    </FormLabel>
                    <RadioGroup
                      name="medicationType"
                      value={state.medicationType}
                      className="radioR1"
                    >
                      <FormControlLabel
                        value="Pill"
                        control={<Radio />}
                        label="Pill"
                        checked={state.medicationType === "Pill"}
                      />
                      <FormControlLabel
                        value="Tablet"
                        control={<Radio />}
                        label="Tablet"
                        checked={state.medicationType === "Tablet"}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Quantity"
                    name="quantity"
                    value={state.quantity}
                    className={classes.root}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Description"
                    name="description"
                    value={state.description}
                    className={classes.root}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth className={classes.FormControl}>
                    <FormLabel className={classes.FormLabel}>
                      Post Type
                    </FormLabel>
                    <RadioGroup
                      name="isPost"
                      value={state.isPost}
                      className="radioR1"
                    >
                      <FormControlLabel
                        value="Post"
                        control={<Radio />}
                        label="Post"
                        checked={state.isPost === "Post"}
                      />
                      <FormControlLabel
                        value="Request"
                        control={<Radio />}
                        label="Request"
                        checked={state.isPost === "Request"}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className={classes.postImage}>
              <Image src={`http://localhost:3000/uploads/${state.image}`} />
            </div>
          </div>
          {!state._user || state._user == _id ? null : (
            <div className={classes.flexDiv}>
              <LinkNative
                to={`/list/myrequests`} 
                onClick={handleRequest}
                className={classes.ddBoxIconBtnLink}
              >
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <AddBoxIcon
                    className={classes.ddBoxIcon}
                  />
                  Send Request
                </Paper>
              </LinkNative>

              {/* 
              <Link
                to={`/list/myrequests`}
                className={classes.ddBoxIconBtnLink}
              >
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <AddBoxIcon
                    className={classes.ddBoxIcon}
                    onClick={handleRequest}
                  />
                  Send Request
                </Paper>
              </Link> */}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}
