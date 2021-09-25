import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import {get} from "lodash";

import { useHistory } from "react-router-dom";

import SessionContext from "../../../components/sessions/SessionContext";

export default function List_Requests() {
  const history = useHistory();

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  const [requests, setRequests] = useState([]);
  const [isSent, setIsSent] = useState(true); 

  function fetchData() {
    setRequests([]);
    isSent
      ? API.get(`getBySenderId/${_id}`).then((res) => {
          const data = res.data;
          console.log({ data });
          if (data.length) setRequests(data);
        })
      : API.get(`getByReceiverId/${_id}`).then((res) => {
          const data = res.data;
          console.log(data);
          if (data.length) setRequests(data);
        });
  }

  function handleAccept(id) {
    API.put(`requests/${id}`, { status: "Accepted" }).then(fetchData());
  }

  function handleReject(id) {
    API.put(`requests/${id}`, { status: "Rejected" }).then(fetchData());
  }

  useEffect(() => {
    fetchData();
  }, [isSent]);

  return (
    <>
      <button onClick={() => setIsSent(false)}>Received</button>
      <button onClick={() => setIsSent(true)}>Sent</button>

      {!requests.length ? (
        <h1>No requests</h1>
      ) : (
        requests.map((request) => (
          <div key={request._id}>
            <h1>Username: 
              {isSent?get(request.receiverId,"username"):get(request.senderId,"username")}
              </h1>
            <h1>Description: {get(request._post,"description","No description")}</h1>
            {/* <h1>{request._post && request._post.description}</h1> */}
            <h1>Status: {get(request,"status")}</h1>
            <h1>Medication Name: {get(request._post,"medicationName")}</h1>
            <h1>Medication Type: {get(request._post,"medicationType")}</h1>

            {isSent ? (
              request.status == "Accepted" ? (
                <button
                  onClick={() =>
                    history.push({
                      pathname: `/get/contactinfo/${request.receiverId._id}`,
                    })
                  }
                >
                  View contact info
                </button>
              ) : null
            ) : request.status == "Waiting" ? (
              <>
                <button onClick={() => handleAccept(request._id)}>
                  Accept
                </button>
                <button onClick={() => handleReject(request._id)}>
                  reject
                </button>
              </>
            ) : null}
          </div>
        ))
      )}
    </>
  );
}
