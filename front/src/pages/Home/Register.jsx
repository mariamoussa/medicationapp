import React, { useState, useContext } from "react";
import API from "../../API";
import { setCookie } from "../../cookie";
import SessionContext from "../../components/sessions/SessionContext";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import moment from "moment";

// import { toast } from "react-toastify"

import {
  FormControl,
  InputLabel,
  Paper,
  Link as LinkNative,
  OutlinedInput,
  IconButton,
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

import MomentUtils from "@date-io/moment";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { Visibility, LockOutlined, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:nth-child(1)": {
      marginBottom: "20px",
    },
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
    margin: theme.spacing(3),
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
    width: 500,
    backgroundColor: "white",
    paddingBottom: "10px",
    borderRadius: "5px",
  },
  linkTo: {
    margin: 10,
    color: "#81917e",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "& .linkSing:hover": {
      color: "red",
    },
    "& .linkSing": {
      color: "#81917e",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: 15,
    },
  },
  flexDiv: {
    display: "flex",
    flexDirection: "row",
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
    fontSize: 30,
  },
  FormControl: {
    display: "flex",
    flexFlow: "row",
    marginLeft: 20,
    "& .radioR1": {
      display: "flex",
      flexFlow: "row",
      marginLeft: 70,
      "& .MuiFormControlLabel-root:nth-child(2)": {
        marginLeft: 35,
      },
    },
    "& .radioR2": {
      display: "flex",
      flexFlow: "row",
      marginLeft: 75,
      "& .MuiFormControlLabel-root:nth-child(2)": {
        marginLeft: 25,
      },
    },
  },
}));

export default function Register() {
  const classes = useStyles();
  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    birthdate: moment().format("YYYY-MM-DD"),
    username: "",
    password: "",
    conPass: "",

    show: false,
    err: "",

    isValidPass: false,

    existingEmail: false,
    existingPhone: false,
    existingUsername: false,
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

  function handleChangeUsername(val) {
    let value = val.replace(/\s/g, "");
    setState({ username: value });
  }

  function handleChangePassword(val) {
    let value = val.replace(/\s/g, "");
    setState({ password: value });
    value.length < 8
      ? setState({ isValidPass: false })
      : setState({ isValidPass: true });
  }

  function handleShow() {
    state.show ? setState({ show: false }) : setState({ show: true });
  }

  function handleDateChange(date) {
    let d = moment(date).format("YYYY-MM-DD");
    setState({ birthdate: d });
  }

  let {
    actions: { setSession },
  } = useContext(SessionContext);

  async function handleRegister(e) {
    console.log("register");
    e.preventDefault();

    let reqBody = {
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      gender: state.gender,
      address: state.address.trim(),
      birthdate: state.birthdate,
      username: state.username,
      password: state.password,
    };

    if (state.password == state.conPass) {
      if (
        reqBody.firstName != "" &&
        reqBody.lastName != "" &&
        reqBody.email != "" &&
        reqBody.phone != "" &&
        reqBody.address != "" &&
        state.isValidPass
      ) {
        let emails = await API.post(`isemail`, { email: reqBody.email });
        let phones = await API.post(`isphone`, { phone: reqBody.phone });
        let usernames = await API.post(`isusername`, {
          username: reqBody.username,
        });

        console.log(emails.data);
        console.log(phones.data);
        console.log(usernames.data);

        if (emails.data.length) setState({ existingEmail: true });
        if (phones.data.length) setState({ existingPhone: true });
        if (usernames.data.length) setState({ existingUsername: true });

        if (
          !emails.data.length &&
          !phones.data.length &&
          !usernames.data.length
        ) {
          await API.post("signUp", reqBody).then((res) => {
            console.log(res.data);
            const success = res.data.success;
            if (success) {
              const result = res.data.result;

              setCookie("_id", result._id, 30);
              setCookie("token", result.token, 30);
              setCookie("role_id", result.role_id, 30);

              setSession({
                user: {
                  _id: result._id,
                  role_id: result.role_id,
                  token: result.token,
                },
              });
            }
          });
        }
      }
    } else {
      setState({ err: "password incorect" });
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.titlecolor}>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="FirstName"
                name="firstName"
                value={state.firstName}
                onChange={handleChange}
                className={classes.root}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="LastName"
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
                className={classes.root}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={state.username}
                onChange={(e) => {
                  setState({ existingUsername: false });
                  handleChangeUsername(e.target.value);
                }}
                className={classes.root}
              />
            </Grid>
            {state.existingUsername ? <p>already exist</p> : null}

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={state.email}
                onChange={(e) => {
                  setState({ existingEmail: false });
                  handleChange(e);
                }}
                className={classes.root}
              />
            </Grid>
            {state.existingEmail ? <p>already exist</p> : null}

            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                variant="outlined"
                label="Phone Number"
                name="phone"
                value={state.phone}
                onChange={(e) => {
                  setState({ existingPhone: false });
                  handleChange(e);
                }}
                className={classes.root}
              />
            </Grid>
            {state.existingPhone ? <p>already exist</p> : null}

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  fullWidth
                  required
                  label="Date Of Birth"
                  variant="outlined"
                  inputVariant="outlined"
                  format="YYYY/MM/DD"
                  value={state.birthdate}
                  onChange={(date) => handleDateChange(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  className={classes.root}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth className={classes.FormControl}>
                <FormLabel className={classes.FormLabel}>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                  className="radioR1"
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.root}
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={state.show ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={(e) => handleChangePassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShow}>
                        {state.show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {/* {!state.isValidPass && state.password != "" ? (
                  <span>{"password<8"}</span>
                ) : null} */}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.root}
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={state.show ? "text" : "password"}
                  name="conPass"
                  value={state.conPass}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShow}>
                        {state.show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={135}
                />
              </FormControl>
            </Grid>
          </Grid>

          <LinkNative
            onClick={handleRegister}
            to="/login"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.ddBoxIconBtnLink}
          >
            <Paper align="center" className={classes.ddBoxIconBtn}>
              <LockOpenIcon className={classes.ddBoxIcon}></LockOpenIcon>Sign Up
            </Paper>
          </LinkNative>

          {/* <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button> */}

          <Grid container justifyContent="center">
            <Grid item className={classes.linkTo}>
              Already have an account?
              <Link to="/login" className="linkSing">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

    // <form onSubmit={handleRegister}>
    //   <table>
    //     <tr>
    //       <th>First Name</th>
    //       <td>
    //         <input
    //           name="firstName"
    //           value={state.firstName}
    //           placeholder="First Name"
    //           onChange={handleChange}
    //           className={classes.root}
    //         />
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Last Name</th>
    //       <td>
    //         <input
    //           name="lastName"
    //           value={state.lastName}
    //           placeholder="Last Name"
    //           onChange={handleChange}
    //         />
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Gender</th>
    //       <td>
    //         <form name="gender" onChange={handleChange}>
    //           <input
    //             type="radio"
    //             id="Male"
    //             name="gender"
    //             value="Male"
    //             checked={state.gender === "Male"}
    //           />
    //           <label for="Male">Male</label>
    //           <input
    //             type="radio"
    //             id="Female"
    //             name="gender"
    //             value="Female"
    //             checked={state.gender === "Female"}
    //           />
    //           <label for="Female">Female</label>
    //         </form>
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Email</th>
    //       <td>
    //         <input
    //           name="email"
    //           value={state.email}
    //           placeholder="Email"
    //           onChange={(e) => {
    //             setState({ existingEmail: false });
    //             handleChange(e);
    //           }}
    //         />
    //       </td>
    //     </tr>
    //     {state.existingEmail ? <p>already exist</p> : null}

    //     <tr>
    //       <th>Phone Number</th>
    //       <td>
    //         <input
    //           name="phone"
    //           value={state.phone}
    //           placeholder="Phone Number"
    //           onChange={(e) => {
    //             setState({ existingPhone: false });
    //             handleChange(e);
    //           }}
    //         />
    //       </td>
    //     </tr>
    //     {state.existingPhone ? <p>already exist</p> : null}

    //     <tr>
    //       <th>Birth Date</th>
    //       <td>
    //         <input
    //           type="date"
    //           name="birthdate"
    //           value={state.birthdate}
    //           onChange={handleChange}
    //         />
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Address</th>
    //       <td>
    //         <input
    //           name="address"
    //           value={state.address}
    //           placeholder="Address"
    //           onChange={handleChange}
    //         />
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Username</th>
    //       <td>
    //         <input
    //           name="username"
    //           value={state.username}
    //           placeholder="Username"
    //           onChange={(e) => {
    //             setState({ existingUsername: false });
    //             handleChangeUsername(e.target.value);
    //           }}
    //         />
    //       </td>
    //     </tr>
    //     {state.existingUsername ? <p>already exist</p> : null}

    //     <tr>
    //       <th>Password</th>
    //       <td>
    //         <input
    //           type={state.show ? "text" : "password"}
    //           name="password"
    //           value={state.password}
    //           placeholder="Password"
    //           onChange={(e) => handleChangePassword(e.target.value)}
    //         />
    //         <button
    //           type="button"
    //           onClick={() => {
    //             setState({ show: !state.show });
    //           }}
    //         >
    //           {state.show ? "Hide" : "Show"}
    //         </button>
    //         {!state.isValidPass && state.password != "" ? (
    //           <span>{"password<8"}</span>
    //         ) : null}
    //       </td>
    //     </tr>

    //     <tr>
    //       <th>Re-Type Password</th>
    //       <td>
    //         <input
    //           type={state.show ? "text" : "password"}
    //           name="conPass"
    //           value={state.conPass}
    //           placeholder="Confirm Password"
    //           onChange={handleChange}
    //         />
    //         <button
    //           type="button"
    //           onClick={() => {
    //             setState({ show: !state.show });
    //           }}
    //         >
    //           {state.show ? "Hide" : "Show"}
    //         </button>
    //       </td>
    //     </tr>
    //   </table>
    //   {state.err}

    //   <button type="submit">Sign Up</button>
    // </form>
  );
}
