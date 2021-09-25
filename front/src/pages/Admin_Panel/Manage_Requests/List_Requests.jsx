import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";
import { get } from "lodash";
import SessionContext from "../../../components/sessions/SessionContext";

export default function List_Requests() {
  const history = useHistory();

  const [requests, setRequests] = useState([]);

  function handleDelete(id) {
    API.delete(`requests/${id}`).then(fetchData());
  }

  function fetchData() {
    API.get(`requests`).then((res) => {
      let data = res.data;
      console.log(data);
      if (data.length) {
        setRequests(data);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !requests.length ? (
    <h1>No requests</h1>
  ) : (
    requests.map((request) => (
      <div>
        <table>
          <tr>
            <th>Description</th>
            <th>Medication Name</th>
            <th>Medication Type</th>
            <th>Receiver ID</th>
            <th>Sender ID</th>
            <th>Status</th>
            <th>Qty</th>
          </tr>
          
          <tr>
            <td>{get(request._post, "description")}</td>
            <td>{get(request._post, "medicationName")}</td>
            <td>{get(request._post, "medicationType")}</td>
            <td>{get(request.receiverId, "username")}</td>
            <td>{get(request.senderId, "username")}</td>
            <td>{request.status}</td>
            <td>{get(request._post, "quantity")}</td>
            <button onClick={() => handleDelete(request._id)}>Delete</button>
          </tr>
        </table>
      </div>
    ))
  );
}
