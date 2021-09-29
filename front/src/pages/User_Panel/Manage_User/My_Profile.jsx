import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";
import { get } from "lodash";
import moment from "moment";

// import { injectStyle } from "react-toastify/dist/inject-style"
// import { toast } from "react-toastify"

import {
  FormControl,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  Container,
  RadioGroup,
  FormLabel,
  Radio,
} from "@material-ui/core";

import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
    marginBottom: 15,
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: "white !important",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  submit: {
    width: 120,
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    backgroundColor: "white",
    paddingBottom: "10px",
    marginBottom: "70px",
    borderRadius: "5px",
  },
  FormLabel: {
    textAlign: "center",
    marginTop: 12,
  },
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  FormControl: {
    display: "flex",
    flexFlow: "row",
    marginLeft: 20,
    "& .radioR2": {
      display: "flex",
      flexFlow: "row",
      marginLeft: 75,
      "& .MuiFormControlLabel-root:nth-child(2)": {
        marginLeft: 25,
      },
    },
    marginBottom: 15,
  },
}));

export default function My_Profile() {
  let history = useHistory();

  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    role_id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
    gender: "",

    isEdit: false,
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  function handleSave(e) {
    e.preventDefault();

    let reqBody = {
      firstName: state.firstName,
      lastName: state.lastName,
      role_id: state.role_id,
      username: state.username,
      email: state.email,
      phone: state.phone,
      birthdate: state.birthdate,
      address: state.address,
      gender: state.gender,
    };

    API.put(`users/${_id}`, reqBody).then(setState({ isEdit: false }));
  }

  async function fetchData() {
    await API.get(`users/${_id}`).then((res) => {
      const data = res.data;
      setState({
        firstName: data.firstName,
        lastName: data.lastName,
        role_id: data.role_id,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
        address: data.address,
        gender: data.gender,
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography
        variant="h3"
        align="center"
        className="titlePage"
      ></Typography>

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSave}>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Firstname"
                name="firstName"
                value={state.firstName}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.firstName
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Lastname"
                name="lastname"
                value={state.lastName}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.lastName
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.isEdit
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={state.username}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.username
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.email
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                required
                fullWidth
                type="number"
                variant="outlined"
                label="Phone Number"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.phone
            )}
          </Grid>

          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Birthdate"
                name="birthdate"
                value={state.birthdate}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              moment(state.birthdate).format("D   MMMM   YYYY")
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                value={state.address}
                onChange={handleChange}
                className={classes.root}
              />
            ) : (
              state.address
            )}
          </Grid>
          <Grid item xs={12}>
            {state.isEdit ? (
              <FormControl className={classes.FormControl}>
                <FormLabel xs={4} className={classes.FormLabel}>
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                  className="radioR2"
                >
                  <FormControlLabel
                    xs={4}
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    xs={4}
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              state.gender
            )}
          </Grid>

          <div className={classes.flexDiv}>
            {state.isEdit ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Profile
              </Button>
            ) : null}

            <Button
              type="button"
              variant="contained"
              className={classes.submit}
              onClick={() => history.push({ pathname: "/patient/panel" })}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="contained"
              className={classes.submit}
              onClick={() => history.push({ pathname: "/changepassword" })}
            >
              Change Password
            </Button>
            {state.isEdit ? null : (
              <Button
                type="button"
                variant="contained"
                className={classes.submit}
                onClick={() => setState({ isEdit: true })}
              >
                Edit
              </Button>
            )}
          </div>
        </form>
        {/* <button onClick={() => history.push({ pathname: `/changepassword` })}>
          Change Password
        </button> */}
        {/* 
        {state.isEdit ? null : (
          <button type="button" onClick={() => setState({ isEdit: true })}>
            edit
          </button>
        )} */}
      </div>
    </Container>
  );
}
