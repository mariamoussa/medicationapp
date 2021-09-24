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

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: 1,
    description: "",
    image: "",
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

  function handleImage(e) {
    // const a = undefined;
    // const b = a || "maria";
    // console.log({ b }); // if a is undefined b=Maria else b = a;

    // let a = [];
    // console.log(a.length);
    // a ? console.log("isArr") : console.log("isNotArr");
    // a.length ? console.log("true") : console.log("fasle");

    let files = e.target.files;
    if (!files.length) return;
    setState({ image: files[0] });
  }

  async function handleSave(e) {
    e.preventDefault();

    // let reqBody = {
    //   medicationName: state.medicationName,
    //   medicationType: state.medicationType,
    //   quantity: state.quantity,
    //   description: state.description,
    //   date: new Date(),
    //   isPost: state.isPost == "Post" ? true : false,
    //   isActive: true,
    //   _user: _id,
    //   fileSrc: { uri, name, type }
    // };

    let reqBody = new FormData();
    reqBody.append("medicationName", state.medicationName);
    reqBody.append("medicationType", state.medicationType);
    reqBody.append("quantity", state.quantity);
    reqBody.append("description", state.description);
    reqBody.append("date", new Date());
    reqBody.append("isPost", state.isPost == "Post" ? true : false);
    reqBody.append("isActive", true);
    reqBody.append("_user", _id);

    let uri = URL.createObjectURL(state.image);
    let name = uri.split("/").pop();
    let match = /.(\w+)$/.exec(name);
    let type = match ? `image/${match[1]}` : `image`;

    reqBody.append("fileSrc", { uri, name, type });

    console.log(reqBody);
    // await API.post(`posts`, reqBody).then(
    //   history.push({ pathname: "/list/myposts" })
    // );
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
              type="number"
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
            <input type="file" onChange={handleImage} />
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
