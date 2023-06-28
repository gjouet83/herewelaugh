import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Post from '../components/Post';

import Header from '../layout/Header';
import AddNewPost from '../components/AddNewPost';

const UserPosts = () => {
  const [postsUpdate, setPostsUpdate] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postToUpdate, setPostToUpdate] = useState({});
  const [showHideTextArea, setShowHideTextArea] = useState(true);
  const [user, setUser] = useState({});
  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get(
          `${process.env.REACT_APP_REQ_URL}/api/posts/${currentUserdecoded.userId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser}`,
            },
          }
        )
        .then((datas) => {
          setPosts(datas.data);
        })
        .catch((errors) => {
          console.warn(errors);
        });
    };
    getPosts();
  }, [currentUser, currentUserdecoded.userId, postsUpdate]);

  useEffect(() => {
    const getUser = () => {
      axios
        .get(
          `${process.env.REACT_APP_REQ_URL}/api/users/` +
            currentUserdecoded.userId,
          {
            headers: { Authorization: `Bearer ${currentUser}` },
          }
        )
        .then((user) => {
          setUser(user.data.user);
        })
        .catch((errors) => {
          console.log(errors);
          if (errors.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    };
    getUser();
  }, [currentUser, currentUserdecoded.userId]);

  const deletePost = (post) => {
    axios
      .delete(`${process.env.REACT_APP_REQ_URL}/api/posts/` + post.id, {
        headers: { Authorization: `Bearer ${currentUser}` },
      })
      .then(() => {
        setPostsUpdate(!postsUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePost = (post) => {
    setPostToUpdate(post);
    setShowHideTextArea(!showHideTextArea);
  };

  return (
    <>
      <Header />
      <section className="userposts">
        <h2 className="userposts__title">Posts de {user.username}</h2>
        {posts.map((post) => (
          <>
            <Post
              key={post.id}
              post={post}
              postsUpdate={postsUpdate}
              setPostsUpdate={setPostsUpdate}
              currentUser={currentUser}
              currentUserdecoded={currentUserdecoded}
            />
            <div className="userposts__edit">
              <button
                className="userposts__edit__update blueButton"
                onClick={() => updatePost(post)}
              >
                modifier
              </button>
              <button
                className="userposts__edit__delete redButton"
                onClick={() => deletePost(post)}
              >
                supprimer
              </button>
            </div>
          </>
        ))}
        <div className={`addNewPost ${showHideTextArea && 'hideNewPost'}`}>
          <AddNewPost
            mode="update"
            postsUpdate={postsUpdate}
            postToUpdate={postToUpdate}
            setPostsUpdate={setPostsUpdate}
            currentUser={currentUser}
            currentUserdecoded={currentUserdecoded}
            showHideTextArea={showHideTextArea}
            setShowHideTextArea={setShowHideTextArea}
          />
        </div>
      </section>
    </>
  );
};

export default UserPosts;
