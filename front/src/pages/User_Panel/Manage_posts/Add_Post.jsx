import React, { useState, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";

import SessionContext from "../../../components/sessions/SessionContext";

export default function Add_Post() {
  const history = useHistory();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  console.log(_id);

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: 1,
    description: "",
    image: "",
    date: new Date(),
    isPost: "Post",
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

  async function handleSave(e) {
    e.preventDefault();

    let reqBody = {
      medicationName: state.medicationName,
      medicationType: state.medicationType,
      quantity: state.quantity,
      description: state.description,
      image: state.image,
      date: state.date,
      isPost: state.isPost == "Post" ? true : false,
      isActive: true,
      _User: _id,
    };

    await API.post(`posts`, reqBody).then(
      history.push({ pathname: "/list/post" })
    );
  }

  return (
    <form onSubmit={handleSave}>
      <table>
        <tr>
          <th>Medication Name</th>
          <td>
            <input
              name="medicationName"
              value={state.medicationName}
              placeholder="Medication Name"
              onChange={handleChange}
              //   className={classes.root}
            />
          </td>
        </tr>
        <tr>
          <th>Medication Type</th>
          <td>
            <form name="medicationType" onChange={handleChange}>
              <input
                type="radio"
                id="Pill"
                name="medicationType"
                value="Pill"
                checked={state.medicationType === "Pill"}
              />
              <label for="Pill">Pill</label>
              <input
                type="radio"
                id="Tablet"
                name="medicationType"
                value="Tablet"
                checked={state.medicationType === "Tablet"}
              />
              <label for="Tablet">Tablet</label>
            </form>
          </td>
        </tr>
        <tr>
          <th>Quantity</th>
          <td>
            <input
              name="quantity"
              value={state.quantity}
              placeholder="Quantity"
              onChange={handleChange}
              //   className={classes.root}
            />
          </td>
        </tr>
        <tr>
          <th>Description</th>
          <td>
            <input
              name="description"
              value={state.description}
              placeholder="Description"
              onChange={handleChange}
              //   className={classes.root}
            />
          </td>
        </tr>
        <tr>
          <th>Image</th>
          <td>
            <input
              name="text"
              value={state.image}
              placeholder="Image"
              onChange={handleChange}
              //   className={classes.root}
            />
          </td>
        </tr>
        <tr>
          <th>Date</th>
          <td>
            <input
              type="date"
              name="date"
              value={state.date}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <th>Post Type</th>
          <td>
            <form name="isPost" onChange={handleChange}>
              <input
                type="radio"
                id="Post"
                name="isPost"
                value="Post"
                checked={state.isPost === "Post"}
              />
              <label for="Post">Post</label>
              <input
                type="radio"
                id="Request"
                name="isPost"
                value="Request"
                checked={state.isPost === "Request"}
              />
              <label for="Request">Request</label>
            </form>
          </td>
        </tr>
      </table>
      <button type="submit">Post</button>
    </form>
  );
}
