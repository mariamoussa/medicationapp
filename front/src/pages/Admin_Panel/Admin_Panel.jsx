import React, { useContext } from "react";
import SessionContext from "../../components/sessions/SessionContext";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import moment from "moment";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  TableRow,
  Container,
  Paper,
  TextField,
  CssBaseline,
  makeStyles,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: "10px",
    borderRadius: "5px",
  },
    bigPaper: {
    width: "80%",
    height: 140,
    backgroundColor: "#FFFFFF",
    margin: 15,
  },
  smallPaper: {
    width: "30%",
    height: "50%",
    backgroundColor: "#A2B29F",
    position: "relative",
    top: -70,
    left: -15,
  },
  smallPaperText: {
    width: "80%",
    height: "50%",
    backgroundColor: "#A2B29F",
    position: "relative",
    top: 40,
    left: "10%",
  },
  smallPaperInside: {
    width: "50%",
    height: "30%",
    backgroundColor: "#A2B29F",
    position: "relative",
    top: 60,
    left: "40%",
  },
  paperFilter: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textstyle:{
    color:"#FFFFFF",
    fontSize:25,
    paddingTop:20
  },
  titlePage:{
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
    paddingTop:10,
    paddingBottom:10,
  },
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
}));

export default function Admin_Panel() {
  const classes = useStyles();

  const history = useHistory();

  let {
    session: {
      user: { _id, username },
    },
    actions: { signOut },
  } = useContext(SessionContext);

  return (
    <>
        <Typography variant="h3" align="center" className={classes.titlePage}>
          Welcome Admin {username}
        </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper className={classes.bigPaper}>
                <Paper className={classes.smallPaperText}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.textstyle}
                  >Total Medications: 200</Typography>
                </Paper>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.bigPaper}>
                <Paper className={classes.smallPaperText}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.textstyle}
                  >Every Donation Counts!</Typography>
                </Paper>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.bigPaper}>
                <Paper className={classes.smallPaperText}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.textstyle}
                  >Let's Support Each other</Typography>
                </Paper>
              </Paper>
            </Grid>

           <Grid item xs={6}>
              <Paper className={classes.bigPaper}>
                <Paper className={classes.smallPaperText}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.textstyle}
                  >Total Users: 150</Typography>
                </Paper>
              </Paper>
            </Grid>
          </Grid>
    </>
  );
}
