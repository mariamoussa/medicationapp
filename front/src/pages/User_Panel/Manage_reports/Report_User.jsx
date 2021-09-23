import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

export default function Report_User() {
  let history = useHistory();
  let { id } = useParams();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    _Reporter: "",
    _Reported: "",
    description: "",

    user_Reporter: "",
    user_Reported: "",
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    let reqBody = {
      _Reporter: _id,
      _Reported: id,
      description: state.description,
    };
    await API.post(`report`, reqBody).then(history.push({ pathname: "/" }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  useEffect(() => {
    API.get(`users/${id}`).then((res) => {
      const result = res.data;
      setState({ user_Reported: result.username });
    });

    API.get(`users/${_id}`).then((res) => {
      const result = res.data;
      setState({ user_Reporter: result.username });
    });
  }, []);

  return (
    <form onSubmit={handleSave}>
      <table>
        <tr>
          <th>Report User {state.user_Reported}</th>
        </tr>
        <tr>
          <th>By User:</th>
          <td>{state.user_Reporter}</td>
        </tr>
        <tr>
          <th>Reason:</th>
          <input
            name="description"
            value={state.description}
            placeholder="Description"
            onChange={handleChange}
            //   className={classes.root}
          />
        </tr>
      </table>
      <button type="submit">Report</button>
    </form>
  );
}
