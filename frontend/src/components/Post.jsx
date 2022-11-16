import moment from 'moment';
import 'moment/locale/fr';

const Post = ({ post, postsUpdate, setPostsUpdate }) => {
  return (
    <div className="posts__post">
      <div className="posts__post__header">
        <span className="posts__post__header__date">
          Posté le {moment(`${post.createdAt}`).locale('fr').format('llll')}
        </span>
        <span className="posts__post__header__name"></span>
      </div>
      <div className="posts__post__content">{post.content}</div>
      <div className="posts__post__footer"></div>
    </div>
  );
};

export default Post;
