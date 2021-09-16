import React, { useContext } from "react";
import SessionContext from "../../components/sessions/SessionContext";

export default function User_Panel() {
  let {
    actions: { signOut },
  } = useContext(SessionContext);

  return (
    <>
      <h1>Welcome User</h1>
      <button onClick={signOut}>Logout</button>
    </>
  );
}
