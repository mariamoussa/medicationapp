import React, { useContext } from "react";
import SessionContext from "../../components/sessions/SessionContext";
import { useHistory } from "react-router-dom";

export default function User_Panel() {
  const history = useHistory();

  let {
    session: {
      user: { _id },
    },
    actions: { signOut },
  } = useContext(SessionContext);

  return (
    <>
      <h1>Welcome User</h1>
      <button onClick={signOut}>Logout</button>
      <button onClick={() => history.push({ pathname: `/list/post` })}>
        All Posts
      </button>
      <button onClick={() => history.push({ pathname: `/list/myposts` })}>
        My Posts
      </button>
      <button onClick={() => history.push({ pathname: `/myrequests` })}>
        My Requests
      </button>
      <button onClick={() => history.push({ pathname: `/myprofile/${_id}` })}>
        My Profile
      </button>
    </>
  );
}
