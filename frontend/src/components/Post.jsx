const Post = ({ post, postsUpdate, setPostsUpdate }) => {
  return (
    <div className="posts__post">
      <div className="posts__post__header">
        <span className="posts__post__header__date">{post.content}</span>
        <span className="posts__post__header__name"></span>
      </div>
      <div className="posts__post__content"></div>
      <div className="posts__post__footer"></div>
    </div>
  );
};

export default Post;
