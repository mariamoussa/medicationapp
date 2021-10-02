import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/LOGO.png";

import { Typography } from "@material-ui/core";
import {
  Facebook,
  Instagram,
  WhatsApp,
  Email,
  Favorite,
} from "@material-ui/icons";

import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  pageStyle: {
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  styleLogin: {
    position: "absolute",
    top: 20,
    right: 25,
    width: 120,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    textDecoration: "none",
    backgroundColor: "#839F85",
    color: "#FFFFFF",
    fontSize: 20,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "transparent",
      color: "#839F85",
      width: 116,
      paddingTop: 13,
      paddingBottom: 13,
      border: "2px solid #839F85",
    },
  },
  logoStyle: {
    width: "50%",
    position: "absolute",
    top: 100,
    left: -10,
  },
  textstyle: {
    color: "#839F85",
    position: "absolute",
    left: 200,
    top: 350,
    fontSize: 40,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#839F85",
    marginLeft: 20,
    marginBottom: 20,
  },
  contentStyle: {
    fontSize: 24,
    color: "#839F85",
  },
  styleDivText: {
    width: "60%",
    marginLeft: 100,
    marginTop: 40,
  },
  styleFooter: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#839F85",
    marginTop: 100,
    width: "100%",
    alignContent: "center",
  },
  styleSocialmedia: {
    color: "#FFFFFF",
    fontSize: 50,
  },
  styleIcons: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
  },
  styleAllContent: {
    display: "flex",
    flexDirection: "row",
  },
  styleOfIcon:{
    color:"#839F85",
    position:"absolute",
    marginTop:150,
    fontSize:250,
    right:100
    
  }
}));

export default function Home() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.pageStyle}>
      <div class="bg-image"></div>
      <img src={Logo} className={classes.logoStyle} />
      <Link to="/login" className={classes.styleLogin}>
        Login
      </Link>
      <Typography className={classes.textstyle}>
        Every Donation Counts
      </Typography>
      <div className={classes.styleAllContent}>
        <div className={classes.styleDivText}>
          <Typography className={classes.titleStyle}>Title</Typography>
          <Typography className={classes.contentStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </div>
        <Favorite className={classes.styleOfIcon} />
      </div>
      <div className={classes.styleFooter}>
        <div className={classes.styleIcons}>
          <Facebook className={classes.styleSocialmedia} />
          <Instagram className={classes.styleSocialmedia} />
          <WhatsApp className={classes.styleSocialmedia} />
          <Email className={classes.styleSocialmedia} />
        </div>
      </div>
    </div>
  );
}
