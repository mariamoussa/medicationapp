import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

export default function Get_Post_User() {
  let history = useHistory();
  let { id } = useParams();

  const [state, updateState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  function setState(nextState) {
    updateState((previousState) => ({
      ...previousState,
      ...nextState,
    }));
  }

  useEffect(() => {
    function fetchData() {
      API.get(`users/${id}`).then((res) => {
        const data = res.data;
        setState({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
        });
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>hi {id}</h1>
      <h1>{state.firstName}</h1>
    </>
  );
}
