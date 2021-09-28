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

    isValidPass: false,

    existingEmail: false,
    existingPhone: false,
    existingUsername: false,
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
    value.length < 8
      ? setState({ isValidPass: false })
      : setState({ isValidPass: true });
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
        reqBody.address != "" &&
        state.isValidPass
      ) {
        let emails = await API.post(`isemail`, { email: reqBody.email });
        let phones = await API.post(`isphone`, { phone: reqBody.phone });
        let usernames = await API.post(`isusername`, {
          username: reqBody.username,
        });

        console.log(emails.data);
        console.log(phones.data);
        console.log(usernames.data);

        if (emails.data.length) setState({ existingEmail: true });
        if (phones.data.length) setState({ existingPhone: true });
        if (usernames.data.length) setState({ existingUsername: true });

        if (
          !emails.data.length &&
          !phones.data.length &&
          !usernames.data.length
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
              onChange={(e) => {
                setState({ existingEmail: false });
                handleChange(e);
              }}
            />
          </td>
        </tr>
        {state.existingEmail ? <p>already exist</p> : null}

        <tr>
          <th>Phone Number</th>
          <td>
            <input
              name="phone"
              value={state.phone}
              placeholder="Phone Number"
              onChange={(e) => {
                setState({ existingPhone: false });
                handleChange(e);
              }}
            />
          </td>
        </tr>
        {state.existingPhone ? <p>already exist</p> : null}

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
              onChange={(e) => {
                setState({ existingUsername: false });
                handleChangeUsername(e.target.value);
              }}
            />
          </td>
        </tr>
        {state.existingUsername ? <p>already exist</p> : null}

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
            {!state.isValidPass && state.password != "" ? (
              <span>{"password<8"}</span>
            ) : null}
          </td>
        </tr>

        <tr>
          <th>Re-Type Password</th>
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
