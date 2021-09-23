import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";

export default function List_Users() {
  let history = useHistory();
  const [users, setUsers] = useState([]);

  function handleDelete(id) {
    API.delete(`users/${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      await API.get("users").then((res) => {
        let data = res.data;
        console.log("users");
        console.log(data);
        setUsers(data);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <table>
        <tr>
          <th>role_id</th>
          <th>username</th>
          <th>email</th>
          <th>phone</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>birthdate</th>
          <th>address</th>
          <th>gender</th>
        </tr>
        {users.map((user) => (
          <tr>
            <th>{user.role_id}</th>
            <th>{user.username}</th>
            <th>{user.email}</th>
            <th>{user.phone}</th>
            <th>{user.firstName}</th>
            <th>{user.lastName}</th>
            <th> {user.birthdate}</th>
            <th>{user.address}</th>
            <th>{user.gender}</th>
            <td>
              <button onClick={() => handleDelete(user._id)}>delete</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
