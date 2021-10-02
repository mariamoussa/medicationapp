import React, { useState, useContext } from "react";
import API from "../../API";
import { setCookie } from "../../cookie";
import SessionContext from "../../components/sessions/SessionContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// import { toast } from "react-toastify"

import {
  Container,
  Avatar,
  Button,
  Link as LinkNative,
  Paper,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";

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
}));

export default function Login() {
  const history = useHistory();

  const classes = useStyles();

  const [state, updateState] = useState({
    username: "",
    password: "",
    show: false,
  });

  function setState(nextState) {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  function handleShow() {
    state.show ? setState({ show: false }) : setState({ show: true });
  }

  let {
    actions: { setSession },
  } = useContext(SessionContext);

  async function handleLogin(e) {
    console.log("here");
    e.preventDefault();
    await API.post("signIn", state).then((res) => {
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

  return (
    <div className="miniContainer">
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            className={classes.titlecolor}
          >
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              className={classes.root}
              value={state.username}
              onChange={handleChange}
            />
            <FormControl variant="outlined" fullWidth className={classes.root}>
              <InputLabel htmlFor="pass">Password</InputLabel>
              <OutlinedInput
                required
                id="pass"
                type={state.show ? "text" : "password"}
                name="password"
                value={state.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="button" onClick={handleShow}>
                      {state.show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <LinkNative
              onClick={handleLogin}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.ddBoxIconBtnLink}
            >
              <Paper align="center" className={classes.ddBoxIconBtn}>
                <LockOpenIcon className={classes.ddBoxIcon}></LockOpenIcon>Sign
                In
              </Paper>
            </LinkNative>

            <Grid container justifyContent="center">
              <Grid item className={classes.linkTo}>
                Don't have an account?{"    "}
                <Link to="/register" className="linkSing" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
