import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../API";
import SessionContext from "../../../components/sessions/SessionContext";

export default function List_MyPosts() {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [isTrue, setIsTrue] = useState(true);

  let {
    session: {
      user: { _id },
    },
  } = useContext(SessionContext);

  async function deletePost(id) {
    try {
      await API.delete(`posts/${id}`);
      let filter = [...posts].filter((posts) => posts.id !== id);
      setPosts(filter);
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
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
      <button onClick={() => history.push({ pathname: `/add/post` })}>
        Add Post
      </button>
      <button onClick={() => setIsTrue(true)}>Available Medications</button>
      <button onClick={() => setIsTrue(false)}>Needed Medications</button>


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
          post._user._id === _id ? (
            <tr>
              <th>{post.medicationName}</th>
              <th>{post.medicationType}</th>
              <th>{post.quantity}</th>
              <th>{post.description}</th>
              <th>{post.date}</th>
              <th>
                {post._user.firstName} {post._user.lastName}
              </th>
              <td>
                <button
                  onClick={() =>
                    history.push({ pathname: `/edit/post/${post._id}` })
                  }
                >
                  edit
                </button>
              </td>
              <td>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </td>
              <td>
                <button
                  onClick={() =>
                    history.push({ pathname: `/get/post/${post._id}` })
                  }
                >
                  view
                </button>
              </td>
            </tr>
          ) : null
        )}
      </table>
    </>
  );
}
