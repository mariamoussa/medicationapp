import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";

import SessionContext from "../../../components/sessions/SessionContext";

export default function List_Reports() {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  function handleDelete(id) {
    const isTrue = window.confirm("are you sure ?");

    if (isTrue) {
      API.delete(`requestsOfUser/${id}`).then(
        API.delete(`postsOfUser/${id}`).then(
          API.delete(`users/${id}`).then((res) => fetchData())
        )
      );
    }
  }

  function fetchData() {
    API.get(`getReportsCount`).then((res) => {
      let data = res.data;
      console.log(data);
      if (data.length) {
        setUsers(data);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Reported</th>
          <th>Count of reports</th>
          <th>View</th>
        </tr>

        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.count}</td>
            <td>
              <button
                onClick={() =>
                  history.push({ pathname: `/user/reports/${user._id}` })
                }
              >
                View
              </button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
