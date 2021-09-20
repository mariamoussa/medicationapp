import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

export default function PostInfo() {

  let history = useHistory();
  let { id } = useParams();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: "",
    description: "",
    image: "",
    isPost: "",
    isActive: "",
    _user: "",
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  function handleRequest() {
    let reqBody = {
      _user: _id,
      _post: id,
    };
    API.post('requests',reqBody).then(history.push({pathname:'/my/request'}))
  }

  useEffect(() => {
    function fetchData() {
      API.get(`posts/${id}`).then((res) => {
        const data = res.data;
        setState({
          medicationName: data.medicationName,
          medicationType: data.medicationType,
          quantity: data.quantity,
          description: data.description,
          image: data.image,
          isPost: data.isPost ? "Post" : "Request",
          isActive: data.isActive ? "Active" : "Closed",
          _user: data._user,
        });
      });
    }
    fetchData();
  }, []);

  return (
    <form>
      <table>
        <tr>
          <th>Medication Name:</th>
          <td>{state.medicationName}</td>
        </tr>
        <tr>
          <th>Medication Type</th>
          <td>{state.medicationType === "Pill" ? "Pill" : "Tablet"}</td>
        </tr>
        <tr>
          <th>Quantity</th>
          <td>{state.quantity}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{state.description}</td>
        </tr>
        <tr>
          <th>Image</th>
          <td>{state.image}</td>
        </tr>
        <tr>
          <th>Post Type</th>
          <td>{state.isPost === "Post" ? "Post" : "Request"}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{state.isActive === "Active" ? "Active" : "Closed"}</td>
        </tr>
        <tr>
          <td>{state._user}</td>
        </tr>
      </table>
      <button onClick={handleRequest}>Send Request</button>
    </form>
  );
}
