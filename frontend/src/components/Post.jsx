import moment from 'moment';
import 'moment/locale/fr';

const Post = ({ post, postsUpdate, setPostsUpdate }) => {
  console.log(post);
  return (
    <div className="posts__post">
      <div className="posts__post__header">
        <span className="posts__post__header__date">
          {`Le ${moment(`${post.createdAt}`).locale('fr').format('L')} à 
          ${moment(`${post.createdAt}`).locale('fr').format('LT')}`}
        </span>
        <div className="posts__post__header__user">
          <figure className="posts__post__header__user__avatar">
            <img
              width="30"
              height="30"
              className="posts__post__header__user__avatar__img"
              src={post.User.avatar}
              alt={`avatar de profil de ${post.User.username}`}
            />
          </figure>
          <figcaption className="posts__post__header__user__name">
            {post.User.username}
          </figcaption>
        </div>
      </div>
      <div className="posts__post__content">{post.content}</div>
      <div className="posts__post__footer"></div>
    </div>
  );
};

export default Post;
