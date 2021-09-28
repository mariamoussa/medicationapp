import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";
import { get } from "lodash";
import moment from "moment";

export default function My_Profile() {
  let history = useHistory();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    role_id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
    gender: "",

    isEdit: false,
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
      firstName: state.firstName,
      lastName: state.lastName,
      role_id: state.role_id,
      username: state.username,
      email: state.email,
      phone: state.phone,
      birthdate: state.birthdate,
      address: state.address,
      gender: state.gender,
    };

    API.put(`users/${_id}`, reqBody).then(setState({ isEdit: false }));
  }

  async function fetchData() {
    await API.get(`users/${_id}`).then((res) => {
      const data = res.data;
      setState({
        firstName: data.firstName,
        lastName: data.lastName,
        role_id: data.role_id,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
        address: data.address,
        gender: data.gender,
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSave}>
        <table>
          <tr>
            <th>FirstName</th>
            <td>
              {state.isEdit ? (
                <input
                  name="firstName"
                  value={state.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                />
              ) : (
                state.firstName
              )}
            </td>
          </tr>

          <tr>
            <th>Lastname</th>
            <td>
              {state.isEdit ? (
                <input
                  name="firstName"
                  value={state.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              ) : (
                state.lastName
              )}
            </td>
          </tr>

          <tr>
            <th>Username</th>
            <td>
              {state.isEdit ? (
                <input
                  name="username"
                  value={state.username}
                  placeholder="username"
                  onChange={handleChange}
                />
              ) : (
                state.username
              )}
            </td>
          </tr>

          <tr>
            <th>Email</th>
            <td>
              {state.isEdit ? (
                <input
                  name="email"
                  value={state.email}
                  placeholder="email"
                  onChange={handleChange}
                />
              ) : (
                state.email
              )}
            </td>
          </tr>

          <tr>
            <th>Phone</th>
            <td>
              {state.isEdit ? (
                <input
                  name="phone"
                  value={state.phone}
                  placeholder="phone"
                  onChange={handleChange}
                />
              ) : (
                state.phone
              )}
            </td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td>
              {state.isEdit ? (
                <input
                  type="date"
                  name="birthdate"
                  value={state.birthdate}
                  placeholder="Birthdate"
                  onChange={handleChange}
                />
              ) : (
                moment(state.birthdate).format("D   MMMM   YYYY")
              )}
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {state.isEdit ? (
                <input
                  name="address"
                  value={state.address}
                  placeholder="Address"
                  onChange={handleChange}
                />
              ) : (
                state.username
              )}
            </td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>
              {state.isEdit ? (
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
              ) : (
                state.gender
              )}
            </td>
          </tr>
        </table>
        {state.isEdit ? <button type="submit">update profile</button> : null}
      </form>
      <button onClick={() => history.push({ pathname: `/changepassword` })}>
        Change Password
      </button>

      {state.isEdit ? null : (
        <button type="button" onClick={() => setState({ isEdit: true })}>
          edit
        </button>
      )}
    </>
  );
}
