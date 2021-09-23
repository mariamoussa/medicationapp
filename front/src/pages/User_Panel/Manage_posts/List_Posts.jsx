import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";

export default function List_Posts() {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [isTrue, setIsTrue] = useState(true);

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
      <button onClick={() => history.push({ pathname: `/add/post` })}>
        Add Post
      </button>

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
          post._user?
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
              <button
                onClick={() =>
                  history.push({ pathname: `/get/post/${post._id}` })
                }
              >
                View
              </button>
            </td>
          </tr> : null
        ))}
      </table>
    </>
  );
}
