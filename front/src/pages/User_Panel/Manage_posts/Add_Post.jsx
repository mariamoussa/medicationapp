import React, { useState, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";

import SessionContext from "../../../components/sessions/SessionContext";

import { Link } from "react-router-dom";

import {
  FormControl,
  Link as LinkNative,
  InputLabel,
  OutlinedInput,
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

import Image from "material-ui-image";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AssignmentIcon from "@material-ui/icons/Assignment";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { AddPhotoAlternate } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import UNKNOWN from "../../../images/UNKNOWN.png";

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
    color: "#A2B29F !important",
    textAlign: "center",
    marginTop: 12,
    // "&:select": {
    //   color: "#A2B29F",
    // },
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
    border: "2px solid transparent",
    backgroundColor: "#A2B29F",
    color: "#FFFFFF",
    fontWeight: "bold",
    cursor:"pointer",
    "&:hover": {
      border: "2px solid #A2B29F",
      color: "#A2B29F",
      backgroundColor: "#FFFFFF",
    },
  },
  ddBoxIconBtnLink: {
    marginTop: 40,
    marginBottom: 30,
    width: 160,
    marginLeft: 30,
    marginRight: 30,

    textDecoration: "none !important",
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
  iconImage: {
    color: "#a2b29f",
    fontSize: 80,
    margin: 100,
  },
}));

export default function Add_Post() {
  const classes = useStyles();

  const history = useHistory();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: 1,
    description: "",
    image: "",
    isPost: "Post",
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

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    setState({ image: file });
  };

  // const a = undefined;
  // const b = a || "maria";
  // console.log({ b }); // if a is undefined b=Maria else b = a;

  // let a = [];
  // console.log(a.length);
  // a ? console.log("isArr") : console.log("isNotArr");
  // a.length ? console.log("true") : console.log("fasle");

  async function handleSave(e) {
    e.preventDefault();

    let reqBody = new FormData();
    reqBody.append("medicationName", state.medicationName);
    reqBody.append("medicationType", state.medicationType);
    reqBody.append("quantity", state.quantity);
    reqBody.append("description", state.description);
    reqBody.append("date", new Date());
    reqBody.append("isPost", state.isPost == "Post" ? true : false);
    reqBody.append("isActive", true);
    reqBody.append("_user", _id);
    reqBody.append("image", state.image);

    await API.post(`posts`, reqBody).then(() => {
      history.push("/list/myposts");
    });
  }

  return (
    <div className="miniContainer">
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
          <Typography
            component="h1"
            variant="h5"
            className={classes.titlecolor}
          >
            Add Medication
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
                      onChange={handleChange}
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
                        onChange={handleChange}
                        className="radioR1"
                      >
                        <FormControlLabel
                          value="Pill"
                          control={<Radio />}
                          label="Pill"
                          checked={state.medicationType === "Pill"}
                        />
                        <FormControlLabel
                          value="Box"
                          control={<Radio />}
                          label="Box"
                          checked={state.medicationType === "Box"}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                        onChange={handleChange}
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
                <input
                  type="file"
                  required
                  fullWidth
                  id="file"
                  variant="outlined"
                  label="Image"
                  name="image"
                  style={{ display: "none" }}
                  onChange={onChangeFile}
                  className={classes.inputFile}
                />
                <label for="file">
                  <div className={classes.styleImage}>
                    {!state.image ? (
                      <AddPhotoAlternate className={classes.iconImage} />
                    ) : (
                      <Image
                        src={URL.createObjectURL(state.image)}
                        style={{ borderRadius: 30 }}
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className={classes.flexDiv}>
              <LinkNative
                to={`/list/post`}
                onClick={handleSave}
                className={classes.ddBoxIconBtnLink}
              >
                <Paper align="center" className={classes.ddBoxIconBtn}>
                  <AddBoxIcon className={classes.ddBoxIcon} />
                  Add
                </Paper>
              </LinkNative>
              <Link to={`/list/post`} className={classes.ddBoxIconBtnLink}>
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
