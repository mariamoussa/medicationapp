import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import { useHistory } from "react-router-dom";

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
        <h1>{request._user}</h1>
        <h1>{request._post}</h1>
        <h1>{request.status}</h1>
        <button onClick={() => handleDelete(request._id)}>Delete</button>
      </div>
    ))
  );
}
