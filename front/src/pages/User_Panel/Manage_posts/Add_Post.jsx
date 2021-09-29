import React, { useState, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";

import SessionContext from "../../../components/sessions/SessionContext";

import {
  FormControl,
  InputLabel,
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

import { Visibility, VisibilityOff } from "@material-ui/icons";

import PersonIcon from "@material-ui/icons/Person";

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
    width: "80%",
    backgroundColor: "white",
    paddingBottom: "10px",
    marginBottom: "70px",
    borderRadius: "5px",
  },
  FormLabel: {
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
      "& .MuiFormControlLabel-root:nth-child(2)": {
        // marginLeft: "9%"
      },
    },
    "& .radioR2": {
      display: "flex",
      flexFlow: "row",
      "& .MuiFormControlLabel-root:nth-child(2)": {
        // marginLeft: "8%"
      },
    },
  },
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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

  // function handleImage(e) {
  //   // const a = undefined;
  //   // const b = a || "maria";
  //   // console.log({ b }); // if a is undefined b=Maria else b = a;

  //   // let a = [];
  //   // console.log(a.length);
  //   // a ? console.log("isArr") : console.log("isNotArr");
  //   // a.length ? console.log("true") : console.log("fasle");

  //   // let files = e.target.files;
  //   // if (!files.length) return;
  //   // setState({ image: files[0] });
  // }

  async function handleSave(e) {
    e.preventDefault();

    let reqBody = {
      medicationName: state.medicationName,
      medicationType: state.medicationType,
      quantity: state.quantity,
      description: state.description,
      date: new Date(),
      isPost: state.isPost == "Post" ? true : false,
      isActive: true,
      _user: _id,
      image: state.image,
      // fileSrc: { uri, name, type }
    };

    // let reqBody = new FormData();
    // reqBody.append("medicationName", state.medicationName);
    // reqBody.append("medicationType", state.medicationType);
    // reqBody.append("quantity", state.quantity);
    // reqBody.append("description", state.description);
    // reqBody.append("date", new Date());
    // reqBody.append("isPost", state.isPost == "Post" ? true : false);
    // reqBody.append("isActive", true);
    // reqBody.append("_user", _id);

    // let uri = URL.createObjectURL(state.image);
    // let name = uri.split("/").pop();
    // let match = /.(\w+)$/.exec(name);
    // let type = match ? `image/${match[1]}` : `image`;

    // reqBody.append("fileSrc", { uri, name, type });

    console.log(reqBody);
    await API.post(`posts`, reqBody).then(() => {
      history.push("/list/myposts")
    });
  }

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
          <PersonIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Add Medication
        </Typography>

        <form className={classes.form} onSubmit={handleSave}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                  />
                  <FormControlLabel
                    value="Tablet"
                    control={<Radio />}
                    label="Tablet"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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

            {/* <tr>
          <th>Image</th>
          <td>
            <input type="file" onChange={handleImage} />
          </td>
        </tr> */}

            <Grid item xs={6}>
              <FormControl fullWidth className={classes.FormControl}>
                <FormLabel className={classes.FormLabel}>Post Type</FormLabel>
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
                  />
                  <FormControlLabel
                    value="Request"
                    control={<Radio />}
                    label="Request"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <div className={classes.flexDiv}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Post
              </Button>

              <Button
                type="button"
                variant="contained"
                className={classes.submit}
                onClick={() => history.push(`/list/post`)}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
