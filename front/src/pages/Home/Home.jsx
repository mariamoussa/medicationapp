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
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  pageStyle: {
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  styleLogin: {
    position: "absolute",
    top: 20,
    right: 40,
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
      width: 120,
      paddingTop: 13,
      paddingBottom: 13,
      border: "2px solid #839F85",
    },
  },
  logoStyle: {
    width: "55%",
    position: "absolute",
    top: 75,
    left: -50,
  },
  textstyle: {
    color: "#839F85",
    position: "absolute",
    left: 195,
    top: 390,
    fontSize: 45,
    fontWeight: "bold",
  },
  lebstyle: {
    color: "red",
    position: "absolute",
    left: 320,
    top: 315,
    fontSize: 45,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#839F85",
    marginLeft: 15,
    marginBottom: 15,
    // marginTop: 15,

  },
  contentStyle: {
    fontSize: 24,
    color: "black",
    marginLeft: 15,
    marginRight: 55,

  },
  styleDivText: {
    width: "60%",
    marginLeft: 100,
    marginTop: 80,
  },
  styleFooter: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#839F85",
    marginTop: 90,
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
  styleOfIcon: {
    // color: "red",
    position: "absolute",
    marginTop: 5,
    fontSize: 200,
    right: 20,
  },
  aboutstyle: {
    position: "absolute",
    top: 20,
    right: 310,
    width: 200,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 25,
    borderRadius: 5,
    "&:hover": {
      color: "#839F85",
      width: 200,
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
  contactstyle: {
    position: "absolute",
    top: 20,
    right: 160,
    width: 200,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 25,
    borderRadius: 5,
    "&:hover": {
      color: "#839F85",
      width: 200,
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
}));

export default function Home() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.pageStyle}>
      <div class="bg-image"></div>
      <img src={Logo} className={classes.logoStyle} />
      {/* <a href="#bottom">testest</a> */}
      {/* <a href="#aboutus" className={classes.aboutstyle}>
        {" "}
        About Us
      </a> */}
      <a href="#aboutus" className={classes.contactstyle}>
        {" "}
        About Us
      </a>

      <Link to="/login" className={classes.styleLogin}>
        Login
      </Link>

      <Typography className={classes.lebstyle}>Lebanon Needs YOU</Typography>
      <Typography className={classes.textstyle}>
        Every Donation Counts!
      </Typography>
      <div className={classes.styleAllContent} id="aboutus">
        <div className={classes.styleDivText}>
          <Typography className={classes.titleStyle}>About Us</Typography>
          <Typography className={classes.contentStyle}>
            With every passing day, more Lebanese lives are being put at risk
            due to the shortage in medicine.
  
            This is why, now more than ever, we need your help to face this
            crisis. Whether you have one spare pill, or several boxes; whether
            you are in Lebanon or abroad, your donations make a difference.
            Donate and be part of this initiative <br/>by spreading hope and
            restoring faith in humanity.
          </Typography>
        </div>
<img className={classes.styleOfIcon} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDY0IDY0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJoZWFsdGhjYXJlLWNvdmlkMTktY29yb25hdmlydXMtaGFuZC1oZWFydGgiPjxwYXRoIGQ9Im0xNS43MSAzMC4yNy00LjUzLTEzLjA1YTMuMTI1IDMuMTI1IDAgMCAwIC0zLjU2LTIuMzIgMy4wMDcgMy4wMDcgMCAwIDAgLTIuMjggMy43MWw0LjY2IDE0LjM5eiIgZmlsbD0iIzgzOWY4NSIgZGF0YS1vcmlnaW5hbD0iI2ZmYWM5NiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Im00OC4yOSAzMC4yNyA0LjUzLTEzLjA1YTMuMTI1IDMuMTI1IDAgMCAxIDMuNTYtMi4zMiAzLjAwNyAzLjAwNyAwIDAgMSAyLjI4IDMuNzFsLTQuNjYgMTQuMzl6IiBmaWxsPSIjODM5Zjg1IiBkYXRhLW9yaWdpbmFsPSIjZmZhYzk2IiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTI1LjA0NiAzNS42ODItOC44NC01LjE4MmEyLjk5NCAyLjk5NCAwIDAgMCAtMy44LjY3OWwtMy4yMjYtOS45NTlhMy4xMjUgMy4xMjUgMCAwIDAgLTMuNTYtMi4zMiAzLjAwNyAzLjAwNyAwIDAgMCAtMi4yOCAzLjcxbDQuMzUgMTYuMjNhMy45NDggMy45NDggMCAwIDAgMS4yMSAxLjk2bDYuNzYgNi4wMWE0IDQgMCAwIDEgMS4zNCAyLjk5djMuMmgxMnYtMTAuNDE2YTggOCAwIDAgMCAtMy45NTQtNi45MDJ6IiBmaWxsPSIjOWFhYTliIiBkYXRhLW9yaWdpbmFsPSIjZmZiY2FiIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTU4LjM4IDE4LjlhMy4xMjUgMy4xMjUgMCAwIDAgLTMuNTYgMi4zMmwtMy4yMyA5Ljk1OWEyLjk5NCAyLjk5NCAwIDAgMCAtMy44LS42NzlsLTguODQgNS4xODJhOCA4IDAgMCAwIC0zLjk1IDYuOTAydjEwLjQxNmgxMnYtMy4yYTQgNCAwIDAgMSAxLjM0LTIuOTlsNi43Ni02LjAxYTMuOTQ4IDMuOTQ4IDAgMCAwIDEuMjEtMS45Nmw0LjM1LTE2LjIzYTMuMDA3IDMuMDA3IDAgMCAwIC0yLjI4LTMuNzF6IiBmaWxsPSIjOWFhYTliIiBkYXRhLW9yaWdpbmFsPSIjZmZiY2FiIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTM0IDUzdjhoMTR2LThoLTEtMTJ6IiBmaWxsPSIjODM5Zjg1IiBkYXRhLW9yaWdpbmFsPSIjMDA2ZGYwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTMwIDUzaC0xLTEyLTF2OGgxNHoiIGZpbGw9IiM4MzlmODUiIGRhdGEtb3JpZ2luYWw9IiMwMDZkZjAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtNDUuNDQgMTguNTYtLjcxLjcxLTEyLjczIDEyLjczLTEyLjczLTEyLjczLS43MS0uNzFhOSA5IDAgMSAxIDEyLjczLTEyLjcybC43MS43MS43MS0uNzFhOSA5IDAgMSAxIDEyLjczIDEyLjcyeiIgZmlsbD0iI2Q4MDAyNyIgZGF0YS1vcmlnaW5hbD0iI2Q4MDAyNyIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Im00NS40NCA1Ljg0YTguOSA4LjkgMCAwIDAgLTcuMzY4LTIuNTc5IDguOTk0IDguOTk0IDAgMCAxIDUuMzY4IDE1LjNsLS43MS43MS0xMS43MyAxMS43MjkgMSAxIDEyLjczLTEyLjczLjcxLS43MWE5IDkgMCAwIDAgMC0xMi43MnoiIGZpbGw9IiNiZDAwMjIiIGRhdGEtb3JpZ2luYWw9IiNiZDAwMjIiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMzQgMjJ2LTRoNHYtNGgtNHYtNGgtNHY0aC00djRoNHY0eiIgZmlsbD0iI2YxZjJmMiIgZGF0YS1vcmlnaW5hbD0iI2YxZjJmMiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxnIGZpbGw9IiNmZmFjOTYiPjxwYXRoIGQ9Im01MC43OTQgMzMuNy02LjY4NCAzLjdhLjg2Ny44NjcgMCAwIDAgLS4zNDEgMS4xMzguODY1Ljg2NSAwIDAgMCAxLjIwNy4zNjJsNS44MTgtMy4yYTMgMyAwIDAgMCAxLjMxOS0zLjYwOSAyLjk3MSAyLjk3MSAwIDAgMSAtMS4zMTkgMS42MDl6IiBmaWxsPSIjODM5Zjg1IiBkYXRhLW9yaWdpbmFsPSIjZmZhYzk2IiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTEzLjIwNiAzMy43IDYuNjg0IDMuN2EuODY3Ljg2NyAwIDAgMSAuMzQxIDEuMTM4Ljg2NS44NjUgMCAwIDEgLTEuMjA3LjM2MmwtNS44MTgtMy4yYTMgMyAwIDAgMSAtMS4zMTktMy42MDkgMi45NzEgMi45NzEgMCAwIDAgMS4zMTkgMS42MDl6IiBmaWxsPSIjODM5Zjg1IiBkYXRhLW9yaWdpbmFsPSIjZmZhYzk2IiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+" />        {/* <FontAwesomeIcon
          icon={faHandHoldingHeart}
          className={classes.styleOfIcon}
        />
        <Favorite className={classes.styleOfIcon} /> */}
      </div>
      <div className={classes.styleFooter} id="contactus">
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
