import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../../API";

import { Link } from "react-router-dom";

import {
  Paper,
  Avatar,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import AssignmentIcon from "@material-ui/icons/Assignment";
import ReportIcon from "@material-ui/icons/Report";

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
    width: 500,
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
    backgroundColor: "white",
    paddingBottom: "10px",
    borderRadius: "5px",
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
}));

export default function Get_Post_User() {
  let { id } = useParams();
  const classes = useStyles();

  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  useEffect(() => {
    function fetchData() {
      API.get(`users/${id}`).then((res) => {
        const data = res.data;
        setState({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact Infos
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                inputProps={{ readOnly: true }}
                variant="outlined"
                label="FirstName"
                name="firstName"
                value={state.firstName}
                className={classes.root}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                inputProps={{ readOnly: true }}
                variant="outlined"
                label="LastName"
                name="lastName"
                value={state.lastName}
                className={classes.root}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputProps={{ readOnly: true }}
                variant="outlined"
                label="Address"
                name="address"
                value={state.address}
                className={classes.root}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                inputProps={{ readOnly: true }}
                variant="outlined"
                label="Phone"
                name="phone"
                value={state.phone}
                className={classes.root}
              />
            </Grid>
          </Grid>

          <div className={classes.ddBoxIconBtnLink}>
            <Link
              to={`/report/user/${id}`}
              className={classes.ddBoxIconBtnLink}
            >
              <Paper align="center" className={classes.ddBoxIconBtn}>
                <ReportIcon className={classes.ddBoxIcon} />
                Report
              </Paper>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
