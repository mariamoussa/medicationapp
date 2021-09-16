import React, { useContext } from "react";
import SessionContext from "../../components/sessions/SessionContext";

export default function Admin_Panel() {
  let {
    actions: { signOut },
  } = useContext(SessionContext);

  return (
    <>
      <h1>Welcome Admin</h1>
      <button onClick={signOut}>Logout</button>
    </>
  );
}
