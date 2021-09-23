import React from "react";
import { useHistory } from "react-router-dom";


export default function Home() {
  const history = useHistory();

  return (
    <>
      <button onClick={() => history.push({ pathname: `/login` })}>
        Login
      </button>
      <h1>Home</h1>
    </>
  );
}
