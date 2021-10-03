import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";
import { get } from "lodash";

// import Person from "@material-ui/icons/Assignment";

import { Link } from "react-router-dom";

import {
  FormControl,
  Link as LinkNative,
  Paper,
  Avatar,
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

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import moment from "moment";
import MomentUtils from "@date-io/moment";

import Person from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

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
    marginTop: 10,
  },
  rootItem: {
    "& label.Mui-focused": {
      color: "#A2B29F",
    },
    marginTop: 10,
    alignContent: "center",
    paddingTop: 8,
    paddingBottom: 3,
    borderRadius: 4,
    border: "1.5px solid #A2B29F",
    "&:hover": {
      border: "2px solid #A2B29F",
      paddingTop: 7.5,
      paddingBottom: 2.5,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
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
    width: 700,
  },
  container: {
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
  ddBoxIconBtn: {
    fontSize: 15,
    fontWeight: "bold",
    width: 190,
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
    width: 210,
    textDecoration: "none !important",
    cursor: "pointer",
    fontSize: 16,
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

  function handleDateChange(date) {
    let d = moment(date).format("YYYY-MM-DD");
    setState({ birthdate: d });
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
    <div className="miniContainer">
      <Container component="main" className={classes.container}>
        <Typography
          variant="h3"
          align="center"
          className="titlePage"
        ></Typography>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            className={classes.titlecolor}
          >
            My Profile
          </Typography>
          <form className={classes.form}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {state.isEdit ? (
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      label="Firstname"
                      name="firstName"
                      value={state.firstName}
                      onChange={handleChange}
                      className={classes.root}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Firstname"
                      value={state.firstName}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {state.isEdit ? (
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      label="Lastname"
                      name="lastName"
                      value={state.lastName}
                      onChange={handleChange}
                      className={classes.root}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Lastname"
                      value={state.lastName}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {state.isEdit ? (
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      label="Email"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      className={classes.root}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Email"
                      value={state.email}
                      className={classes.root}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {state.isEdit ? (
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      label="Username"
                      name="username"
                      value={state.username}
                      onChange={handleChange}
                      className={classes.root}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Username"
                      value={state.username}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
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
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      type="number"
                      variant="outlined"
                      label="Phone Number"
                      value={state.phone}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {state.isEdit ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        required
                        label="Date Of Birth"
                        variant="outlined"
                        inputVariant="outlined"
                        format="YYYY/MM/DD"
                        value={moment(state.birthdate).format("YYYY-MM-DD")}
                        onChange={(date) => handleDateChange(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        className={classes.root}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Birthdate"
                      value={moment(state.birthdate).format("D   MMMM   YYYY")}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
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
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      label="Address"
                      value={state.address}
                      className={classes.root}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  <div className={classes.rootItem}>
                    <FormControl className={classes.FormControl}>
                      <FormLabel xs={4} className={classes.FormLabel}>
                        Gender
                      </FormLabel>
                      {state.isEdit ? (
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
                      ) : (
                        <RadioGroup
                          name="gender"
                          value={state.gender}
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
                      )}
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className={classes.flexDiv}>
              {state.isEdit ? (
                <LinkNative
                  onClick={handleSave}
                  className={classes.ddBoxIconBtnLink}
                >
                  <Paper align="center" className={classes.ddBoxIconBtn}>
                    <LockIcon className={classes.ddBoxIcon} />
                    Update Profile
                  </Paper>
                </LinkNative>
              ) : (
                <LinkNative
                  onClick={() => setState({ isEdit: true })}
                  className={classes.ddBoxIconBtnLink}
                >
                  <Paper align="center" className={classes.ddBoxIconBtn}>
                    <EditIcon className={classes.ddBoxIcon} />
                    Edit
                  </Paper>
                </LinkNative>
              )}

              <Link to={`/changepassword`} className={classes.ddBoxIconBtnLink}>
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <LockIcon className={classes.ddBoxIcon} />
                  Change Password
                </Paper>
              </Link>

              <Link to={`/user/panel`} className={classes.ddBoxIconBtnLink}>
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <CancelIcon className={classes.ddBoxIcon} />
                  Cancel
                </Paper>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
