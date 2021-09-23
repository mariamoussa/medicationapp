import React, { useState, useContext } from "react";
import API from "../../API";
import { setCookie } from "../../cookie";
import SessionContext from "../../components/sessions/SessionContext";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "red",
    color: "white",
  },
});

export default function Register() {
  const classes = useStyles();
  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    birthdate: new Date(),
    username: "",
    password: "",
    conPass: "",

    show: false,
    err: "",
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

  function handleChangeUsername(val) {
    let value = val.replace(/\s/g, "");
    setState({ username: value });
  }

  function handleChangePassword(val) {
    let value = val.replace(/\s/g, "");
    setState({ password: value });
  }

  let {
    actions: { setSession },
  } = useContext(SessionContext);

  async function handleRegister(e) {
    e.preventDefault();

    let reqBody = {
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      gender: state.gender,
      address: state.address.trim(),
      birthdate: state.birthdate,
      username: state.username,
      password: state.password,
    };

    if (state.password == state.conPass) {
      if (
        reqBody.firstName != "" &&
        reqBody.lastName != "" &&
        reqBody.email != "" &&
        reqBody.phone != "" &&
        reqBody.address != ""
      ) {
        await API.post("signUp", reqBody).then((res) => {
          console.log(res.data);
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
    } else {
      setState({ err: "password incorect" });
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <table>
        <tr>
          <th>First Name</th>
          <td>
            <input
              name="firstName"
              value={state.firstName}
              placeholder="First Name"
              onChange={handleChange}
              className={classes.root}
            />
          </td>
        </tr>

        <tr>
          <th>Last Name</th>
          <td>
            <input
              name="lastName"
              value={state.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Gender</th>
          <td>
            <form name="gender" onChange={handleChange}>
              <input
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                checked={state.gender === "Male"}
              />
              <label for="Male">Male</label>
              <input
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                checked={state.gender === "Female"}
              />
              <label for="Female">Female</label>
            </form>
          </td>
        </tr>

        <tr>
          <th>Email</th>
          <td>
            <input
              name="email"
              value={state.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Phone Number</th>
          <td>
            <input
              name="phone"
              value={state.phone}
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Birth Date</th>
          <td>
            <input
              type="date"
              name="birthdate"
              value={state.birthdate}
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Address</th>
          <td>
            <input
              name="address"
              value={state.address}
              placeholder="Address"
              onChange={handleChange}
            />
          </td>
        </tr>

        <tr>
          <th>Username</th>
          <td>
            <input
              name="username"
              value={state.username}
              placeholder="Username"
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
          </td>
        </tr>

        <tr>
          <th>Password</th>
          <td>
            <input
              type={state.show ? "text" : "password"}
              name="password"
              value={state.password}
              placeholder="Password"
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                setState({ show: !state.show });
              }}
            >
              {state.show ? "Hide" : "Show"}
            </button>
          </td>
        </tr>

        <tr>
          <th>Confirm Password</th>
          <td>
            <input
              type={state.show ? "text" : "password"}
              name="conPass"
              value={state.conPass}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => {
                setState({ show: !state.show });
              }}
            >
              {state.show ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
      </table>
      {state.err}

      <button type="submit">Sign Up</button>
    </form>
  );
}
