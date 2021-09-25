import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

export default function List_Posts() {
  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

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

      <button
        onClick={() => {
          setIsTrue(true);
          setPosts([]);
        }}
      >
        Available M
      </button>
      <button
        onClick={() => {
          setIsTrue(false);
          setPosts([]);
        }}
      >
        Needed M
      </button>

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
        {posts.map((post) =>
          post._user ? (
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
                {isTrue ? (
                  <button
                    onClick={() =>
                      history.push({ pathname: `/get/post/${post._id}` })
                    }
                  >
                    View
                  </button>
                ) : post._user._id == _id ? null : (
                  <button
                    onClick={() =>
                      history.push({
                        pathname: `/get/contactinfo/${post._user._id}`,
                      })
                    }
                  >
                    contact us
                  </button>
                )}
              </td>
            </tr>
          ) : null
        )}
      </table>
    </>
  );
}
