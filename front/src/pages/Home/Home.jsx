import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


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


export default function Home() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <>
      <button onClick={() => history.push({ pathname: `/login` })}>
        Login
      </button>
      <h1>Home</h1>
    </>
  );
}
