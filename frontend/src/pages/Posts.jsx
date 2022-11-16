import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../layout/Header';
import Post from '../components/Post';

const Posts = () => {
  const [postsUpdate, setPostsUpdate] = useState(true);
  const [posts, setPosts] = useState([]);

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
        <section className="posts">
          <div className="posts__background"></div>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              postsUpdate={postsUpdate}
              setPostsUpdate={setPostsUpdate}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default Posts;
