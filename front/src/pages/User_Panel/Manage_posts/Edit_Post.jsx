import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";

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

export default function Edit_Post() {
  let history = useHistory();
  let { id } = useParams();

  const classes = useStyles();

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: "",
    description: "",
    image: "",
    isPost: "",
    isActive: "",
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
      medicationName: state.medicationName,
      medicationType: state.medicationType,
      quantity: state.quantity,
      description: state.description,
      image: state.image,
      isPost: state.isPost == "Post" ? true : false,
      isActive: state.isActive == "Active" ? true : false,
    };

    API.put(`posts/${id}`, reqBody).then(() => {
      history.push({ pathname: "/list/mymedications" });
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
          <PersonIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Edit Medication
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

            <Grid item xs={6}>
              <FormControl fullWidth className={classes.FormControl}>
                <FormLabel className={classes.FormLabel}>Status</FormLabel>
                <RadioGroup
                  name="isActive"
                  value={state.isActive}
                  onChange={handleChange}
                  className="radioR1"
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio />}
                    label="Active"
                    checked={state.isActive === "Active"}
                  />
                  <FormControlLabel
                    value="Cloded"
                    control={<Radio />}
                    label="Closed"
                    checked={state.isActive === "Closed"}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* <tr>
              <th>Image</th>
              <td>
                <input
                  name="image"
                  value={state.image}
                  placeholder="Image"
                  onChange={handleChange}
                />
              </td>
            </tr> */}
          </Grid>
          <div className={classes.flexDiv}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save Changes
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

          {/* <button type="submit">update</button> */}
        </form>
      </div>
    </Container>
  );
}
