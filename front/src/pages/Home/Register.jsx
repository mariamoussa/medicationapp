import React, { useState, useContext } from "react";
import API from "../../API";
import { setCookie } from "../../cookie";
import SessionContext from "../../components/sessions/SessionContext";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'red',
    color: 'white'
  },
});

export default function Register() {

  const classes=useStyles();
  const [state, updateState] = useState({
    firstname: "",
    lastname: "",
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

  let {
    actions: { setSession },
  } = useContext(SessionContext);

  async function handleRegister(e) {
    e.preventDefault();
    if (state.password == state.conPass) {
      await API.post("signUp", state).then((res) => {
        console.log(res.data);
        const success = res.data.success;
        if (success) {
          const result = res.data.result;

          setCookie("_id", result._id, 30);
          setCookie("token", result.token, 30);

          setSession({
            user: {
              _id: result._id,
              role_id: result.role_id,
              token: result.token,
            },
          });
        }
      });
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
              name="firstname"
              value={state.firstname}
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
              name="lastname"
              value={state.lastname}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <button
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
