import React, { useState, useEffect, useContext } from "react";
import API from "../../../API";
import { useHistory, useParams } from "react-router-dom";
import { get } from "lodash";

export default function User_Reports() {
  const history = useHistory();
  let { _Reported } = useParams();

  const [reports, setReports] = useState([]);

  
  function handleDelete(id) {
    const isTrue = window.confirm("are you sure ?");

    if (isTrue)
      API.delete(`report/${id}`).then((res) => {
        fetchData();
      });
  }

  function fetchData() {
    API.post(`getUserReports`, { _Reported }).then((res) => {
      let data = res.data;
      if (data.length) {
        setReports(data);
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
          <th>Reporter</th>
          <th>Reason</th>
          <th>Manage</th>
        </tr>

        {reports.map((report) => (
          <tr key={report._id}>
            <td>{get(report._Reported, "username", "unknown")}</td>
            <td>{report._Reporter.username}</td>
            <td>{report.description}</td>
            <td>
              <button onClick={() => handleDelete(report._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
