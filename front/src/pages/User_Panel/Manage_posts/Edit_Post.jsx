import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";

export default function Edit_Post() {
  let history = useHistory();
  let { id } = useParams();

  const [state, updateState] = useState({
    medicationName: "",
    medicationType: "",
    quantity: "",
    description: "",
    image: "",
    isPost: "",
    isActive: "",
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

  function handleSave(e) {
    e.preventDefault();

    let reqBody = {
      medicationName: state.medicationName,
      medicationType: state.medicationType,
      quantity: state.quantity,
      description: state.description,
      image: state.image,
      isPost: state.isPost == "Post" ? true : false,
      isActive: state.isActive == "Active" ? true : false,
    };

    API.put(`posts/${id}`, reqBody).then(
      history.push({ pathname: "/list/myposts" })
    );
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
        });
      });
    }
    fetchData();
  }, []);

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
            />
          </td>
        </tr>
        <tr>
          <th>Image</th>
          <td>
            <input
              name="image"
              value={state.image}
              placeholder="Image"
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
        <tr>
          <th>Status</th>
          <td>
            <form name="isActive" onChange={handleChange}>
              <input
                type="radio"
                id="active"
                name="isActive"
                value="Active"
                checked={state.isActive === "Active"}
              />
              <label for="active">Active</label>
              <input
                type="radio"
                id="closed"
                name="isActive"
                value="Closed"
                checked={state.isActive === "Closed"}
              />
              <label for="closed">Closed</label>
            </form>
          </td>
        </tr>
      </table>
      <button type="submit">update</button>
    </form>
  );
}
