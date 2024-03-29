import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import Header from '../layout/Header';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import Sort from '../components/Sort';
import jwt_decode from 'jwt-decode';

const Posts = () => {
  const [postsUpdate, setPostsUpdate] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showHideTextArea, setShowHideTextArea] = useState(true);
  const [sortBy, setSortBy] = useState('newer');
  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);

  const getPosts = () => {
    sortBy === 'newer'
      ? axios
          .get(`${process.env.REACT_APP_REQ_URL}/api/posts`)
          .then((datas) => {
            setPosts(datas.data);
          })
          .catch((errors) => {
            console.warn(errors);
          })
      : axios
          .get(
            `${process.env.REACT_APP_REQ_URL}/api/posts/sort=rate&order=desc`
          )
          .then((datas) => {
            setPosts(datas.data);
          })
          .catch((errors) => {
            console.warn(errors);
          });
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsUpdate, sortBy]);

  return (
    <>
      <Header />
      <main>
        <Sort sortBy={sortBy} setSortBy={setSortBy} />
        <section className="posts">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              postsUpdate={postsUpdate}
              setPostsUpdate={setPostsUpdate}
              currentUser={currentUser}
              currentUserdecoded={currentUserdecoded}
            />
          ))}
          {currentUserdecoded && (
            <div className={`addNewPost ${showHideTextArea && 'hideNewPost'}`}>
              <AddNewPost
                postsUpdate={postsUpdate}
                setPostsUpdate={setPostsUpdate}
                currentUser={currentUser}
                currentUserdecoded={currentUserdecoded}
                showHideTextArea={showHideTextArea}
                setShowHideTextArea={setShowHideTextArea}
              />
            </div>
          )}

          {currentUserdecoded && (
            <button
              className="addPostButton"
              aria-label="créer un post"
              onClick={() => setShowHideTextArea(!showHideTextArea)}
            >
              <FontAwesomeIcon
                className="addPostButton__icon"
                icon={faPencil}
                size="xl"
              />
            </button>
          )}
        </section>
      </main>
    </>
  );
};

export default Posts;
