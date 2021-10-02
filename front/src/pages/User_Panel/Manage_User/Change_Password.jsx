import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Link } from "react-router-dom";


import Image from "material-ui-image";

import Person from "@material-ui/icons/Person";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { AddPhotoAlternate } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import UNKNOWN from "../../../images/UNKNOWN.png";


import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Link as LinkNative,
  IconButton,
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
    textDecoration: "none",
    fontSize: 16,
  },
  ddBoxIcon: {
    position: "relative",
    top: 6,
    right: 10,
  },
}));


const bcrypt = require("bcryptjs");


export default function Change_Password() {
  const classes = useStyles();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  let history = useHistory();

  const [state, updateState] = useState({
    oldPassword: "",
    password: "",
    newPass: "",
    confNewPass: "",

    showPas: false,
    showNew: false,
    showCon: false,

    isValidPass: true,
    isValidNew: true,
    isValidConf: true,
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    value = value.replace(/\s/g, "");
    setState({ [name]: value });
  }

  function handleChangeNewPassword(val) {
    let value = val.replace(/\s/g, "");
    setState({ newPass: value });
    value.length < 8
      ? setState({ isValidNew: false })
      : setState({ isValidNew: true });
  }

  function handleChangeConfirm(val) {
    let value = val.replace(/\s/g, "");
    setState({ confNewPass: value });
    state.newPass == value
      ? setState({ isValidConf: true })
      : setState({ isValidConf: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let isMatch = await bcrypt.compare(state.password, state.oldPassword);
    if (!isMatch) setState({ isValidPass: false });

    if (isMatch && state.isValidNew && state.isValidConf) {
      API.put(`users/${_id}`, { password: state.newPass }).then(() => {
        history.push(`/myprofile`);
      });
    }
  }

  useEffect(() => {
    function fetchData() {
      API.get(`users/${_id}`).then((res) => {
        const data = res.data;
        setState({ oldPassword: data.password });
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
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.flexDiv}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Current Password"
                name="password"
                value={state.password}
                onChange={handleChange}
                className={classes.root}
              />
              {state.isValidPass ? null : <span>Password Incorrect</span>}
              <button
                type="button"
                onClick={() => setState({ showPas: !state.showPas })}
              >
                {state.showPas ? "Hide" : "Show"}
              </button>
            </Grid>
            </div>
            <div className={classes.flexDiv}>


            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="New Password"
                name="newPass"
                value={state.newPass}
                onChange={(e) => handleChangeNewPassword(e.target.value)}
                className={classes.root}
              />
              {state.isValidPass ? null : (
                <span>Password must be at least 8 characters</span>
              )}
              <button
                type="button"
                onClick={() => setState({ showNew: !state.showNew })}
              >
                {state.showNew ? "Hide" : "Show"}
              </button>
            </Grid>
            </div>
            <div className={classes.flexDiv}>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Re-Type New Password"
                name="confNewPass"
                value={state.confNewPass}
                onChange={(e) => handleChangeConfirm(e.target.value)}
                className={classes.root}
              />
              {state.isValidPass ? null : <span>Passwords didn't match</span>}
              <button
                type="button"
                onClick={() => setState({ showCon: !state.showCon })}
              >
                {state.showCon ? "Hide" : "Show"}
              </button>
            </Grid></div>
            {/* <table>
        <h1>Change Password</h1>
        <tr>
          <th>Current Password</th>
          <td>
            <input
              type={state.showPas ? "text" : "password"}
              name="password"
              value={state.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {state.isValidPass ? null : <span>Password Incorrect</span>}
            <button
              type="button"
              onClick={() => setState({ showPas: !state.showPas })}
            >
              {state.showPas ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
        <tr> */}
            {/* <th>New Password</th>
          <td>
            <input
              type={state.showNew ? "text" : "password"}
              name="newPass"
              value={state.newPass}
              placeholder="Password"
              onChange={(e) => handleChangeNewPassword(e.target.value)}
            />
            {state.isValidNew ? null : (
              <span>Password must be at least 8 characters</span>
            )}
            <button
              type="button"
              onClick={() => setState({ showNew: !state.showNew })}
            >
              {state.showNew ? "Hide" : "Show"}
            </button>
          </td>
        </tr> */}
            {/* <tr>
          <th>Re-Type New Password</th>
          <td>
            <input
              type={state.showCon ? "text" : "password"}
              name="confNewPass"
              value={state.confNewPass}
              placeholder="Confirm Password"
              onChange={(e) => handleChangeConfirm(e.target.value)}
            />
            {state.isValidConf ? null : <span>Passwords didn't match</span>}

            <button
              type="button"
              onClick={() => {
                setState({ showCon: !state.showCon });
              }}
            >
              {state.showCon ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
      </table> */}
                <div className={classes.flexDiv}>
                <div className={classes.stylebutton}>
            <Link
              to={`/myprofile`}
              type="submit"
              className={classes.ddBoxIconBtnLink}
            >
              <Paper align="center" className={classes.ddBoxIconBtn}>
                <AddBoxIcon className={classes.ddBoxIcon} />
                Change Password
              </Paper>
            </Link>
          </div>
            {/* <button type="submit">Change Password</button> */}
          </div>
        </form>
      </div>
    </Container>
  );
}
