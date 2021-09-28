import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

const bcrypt = require("bcryptjs");

export default function Change_Password() {
  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  let history = useHistory();

  const [state, updateState] = useState({
    oldPassword: "",
    password: "",
    newPass: "",
    confNewPass: "",

    showPas: false,
    showNew: false,
    showCon: false,

    isValidPass: true,
    isValidNew: true,
    isValidConf: true,
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    value = value.replace(/\s/g, "");
    setState({ [name]: value });
  }

  function handleChangeNewPassword(val) {
    let value = val.replace(/\s/g, "");
    setState({ newPass: value });
    value.length < 8
      ? setState({ isValidNew: false })
      : setState({ isValidNew: true });
  }

  function handleChangeConfirm(val) {
    let value = val.replace(/\s/g, "");
    setState({ confNewPass: value });
    state.newPass == value
      ? setState({ isValidConf: true })
      : setState({ isValidConf: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let isMatch = await bcrypt.compare(state.password, state.oldPassword);
    if (!isMatch) setState({ isValidPass: false });

    if (isMatch && state.isValidNew && state.isValidConf) {
      API.put(`users/${_id}`, { password: state.newPass }).then(
        history.push(`/myprofile`)
      );
    }
  }

  useEffect(() => {
    function fetchData() {
      API.get(`users/${_id}`).then((res) => {
        const data = res.data;
        setState({ oldPassword: data.password });
      });
    }
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <h1>Change Password</h1>
        <tr>
          <th>Current Password</th>
          <td>
            <input
              type={state.showPas ? "text" : "password"}
              name="password"
              value={state.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {state.isValidPass ? null : <span>Password Incorrect</span>}
            <button
              type="button"
              onClick={() => setState({ showPas: !state.showPas })}
            >
              {state.showPas ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
        <tr>
          <th>New Password</th>
          <td>
            <input
              type={state.showNew ? "text" : "password"}
              name="newPass"
              value={state.newPass}
              placeholder="Password"
              onChange={(e) => handleChangeNewPassword(e.target.value)}
            />
            {state.isValidNew ? null : (
              <span>Password must be at least 8 characters</span>
            )}
            <button
              type="button"
              onClick={() => setState({ showNew: !state.showNew })}
            >
              {state.showNew ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
        <tr>
          <th>Re-Type New Password</th>
          <td>
            <input
              type={state.showCon ? "text" : "password"}
              name="confNewPass"
              value={state.confNewPass}
              placeholder="Confirm Password"
              onChange={(e) => handleChangeConfirm(e.target.value)}
            />
            {state.isValidConf ? null : <span>Passwords didn't match</span>}

            <button
              type="button"
              onClick={() => {
                setState({ showCon: !state.showCon });
              }}
            >
              {state.showCon ? "Hide" : "Show"}
            </button>
          </td>
        </tr>
      </table>
      <button type="submit">Change Password</button>
    </form>
  );
}
