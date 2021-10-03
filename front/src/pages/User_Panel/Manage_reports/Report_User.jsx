import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

import { Link } from "react-router-dom";

import {
  Paper,
  Avatar,
  TextareaAutosize,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import ReportIcon from "@material-ui/icons/Report";
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
    margin: theme.spacing(3),
    backgroundColor: "#A2B29F",
    color: "white !important",
  },
  form: {
    padding: 20,
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  titlePage: {
    color: "#A2B29F",
    fontWeight: "bold",
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textAresDex: {
    width: "400px !important",
    padding: 15,
    minHeight: 100,
    borderRadius: 4,
    border: "1.5px solid #A2B29F",
    "&:hover": {
      border: "2px solid #A2B29F",
    },
  },
}));

export default function Report_User() {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    _Reporter: "",
    _Reported: "",
    description: "",

    user_Reporter: "",
    user_Reported: "",
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

  async function handleSave(e) {
    e.preventDefault();
    let reqBody = {
      _Reporter: _id,
      _Reported: id,
      description: state.description,
    };
    console.log(reqBody);
    await API.post(`report`, reqBody).then(() => {
      history.push({ pathname: "/" });
    });
  }

  async function fetchData() {
    API.get(`users/${id}`).then((res) => {
      const result = res.data;
      setState({ user_Reported: result.username });
    });

    API.get(`users/${_id}`).then((res) => {
      const result = res.data;
      setState({ user_Reporter: result.username });
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
            <ReportIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.titlePage}>
            Report {state.user_Reported}
          </Typography>

          <form className={classes.form} onSubmit={handleSave}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextareaAutosize
                  maxRows={6}
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  placeholder="Add Reason"
                  className={classes.textAresDex}
                />
              </Grid>
            </Grid>

            <div className={classes.ddBoxIconBtnLink}>
              <Link
                to={`/list/post`}
                onClick={handleSave}
                className={classes.ddBoxIconBtnLink}
              >
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <AddBoxIcon className={classes.ddBoxIcon} />
                  Report User
                </Paper>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
