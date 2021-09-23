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
    <form>
      <table>
        <tr>
          <th>Contact Infos</th>
        </tr>
        <tr>
          <th>First Name:</th>
          <td>{state.firstName}</td>
        </tr>
        <tr>
          <th>Last Name:</th>
          <td>{state.lastName}</td>
        </tr>
        <tr>
          <th>Address:</th>
          <td>{state.address}</td>
        </tr>
        <tr>
          <th>Phone:</th>
          <td>{state.phone}</td>
        </tr>
        <button
          onClick={() => history.push({ pathname: `/report/user/${id}` })}
        >
          Report
        </button>
      </table>
    </form>
  );
}
