import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../layout/Header';
import Post from '../components/Post';
import AddNewPost from '../components/AddNewPost';
import jwt_decode from 'jwt-decode';

const Posts = () => {
  const [postsUpdate, setPostsUpdate] = useState(true);
  const [posts, setPosts] = useState([]);
  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);

  const getPosts = () => {
    axios
      .get('http://localhost:3000/api/posts/')
      .then((datas) => {
        setPosts(datas.data);
      })
      .catch((errors) => {
        console.warn(errors);
      });
  };

  useEffect(() => {
    getPosts();
  }, [postsUpdate]);

  return (
    <>
      <Header />
      <main>
        <section className="AddNewPost">
          <AddNewPost
            postsUpdate={postsUpdate}
            setPostsUpdate={setPostsUpdate}
            currentUser={currentUser}
            currentUserdecoded={currentUserdecoded}
          />
        </section>
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
        </section>
      </main>
    </>
  );
};

export default Posts;
