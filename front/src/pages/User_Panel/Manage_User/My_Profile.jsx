import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";
import { get } from "lodash";

export default function My_Profile() {
  let history = useHistory();
  let { id } = useParams();

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

    API.put(`users/${id}`, reqBody).then(
      history.push({ pathname: `/myprofile/${id}` })
    );
  }

  async function fetchData() {
    await API.get(`users/${id}`).then((res) => {
      const data = res.data;
      setState({
        firstName: data.firstName,
        lastName: data.lastName,
        role_id: data.role_id,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        birthdate: data.birthdate,
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
              <input
                name="firstName"
                value={state.firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Lastname</th>
            <td>
              <input
                name="firstName"
                value={state.lastName}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{state.role_id}</td>
          </tr>
          <tr>
            <th>Username</th>
            <td>
              <input
                name="Username"
                value={state.username}
                placeholder="username"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                name="email"
                value={state.email}
                placeholder="email"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>
              <input
                name="phone"
                value={state.phone}
                placeholder="phone"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td>
              <input
                type="date"
                name="birthdate"
                value={state.birthdate}
                placeholder="Birthdate"
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
        </table>
        <button type="submit">update profile</button>
      </form>
      <button onClick={() => history.push({ pathname: `/changepassword/${id}` })}>Change Password</button>
    </>
  );
}

