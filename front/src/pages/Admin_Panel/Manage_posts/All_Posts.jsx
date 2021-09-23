import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";

export default function All_Post() {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [isTrue, setIsTrue] = useState(true);

  function handleDelete(id) {
    API.delete(`posts/${id}`);
  }

  useEffect(() => {
    async function fetchData() {
      await API.post(`isPost`, { isPost: isTrue }).then((res) => {
        let data = res.data;
        setPosts(data);
      });
    }
    fetchData();
  }, [isTrue]);

  return (
    <>
      <button onClick={() => setIsTrue(true)}>Available M</button>

      <button onClick={() => setIsTrue(false)}>Needed M</button>

      <table>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>description</th>
          <th>date</th>
          <th>user</th>
          <th>Manage</th>
        </tr>
        {posts.map((post) => (
          <tr>
            <th>{post.medicationName}</th>
            <th>{post.medicationType}</th>
            <th>{post.quantity}</th>
            <th>{post.description}</th>
            <th>{post.date}</th>
            <th>
              {post._user && post._user.firstName}{" "}
              {post._user && post._user.lastName}
            </th>
            <td>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
