import React, { useState, useContext } from "react";
import API from "../../API";
import { setCookie } from "../../cookie";
import SessionContext from "../../components/sessions/SessionContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const [state, updateState] = useState({
    username: "",
    password: "",
  });

  function setState(nextState) {
    updateState((prevState) => ({
      ...prevState,
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

  async function handleLogin(e) {
    e.preventDefault();
    await API.post("signIn", state).then((res) => {
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

  return (
    <form onSubmit={handleLogin}>
      <input name="username" value={state.username} onChange={handleChange} />
      <input name="password" value={state.password} onChange={handleChange} />
      <button type="submit"> Login </button>
      <h2>Don't have an account?</h2>
      <button onClick={() => history.push({ pathname: `/register` })}>
        Register{" "}
      </button>
    </form>
  );
}
