import moment from 'moment';
import 'moment/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinTears } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { decode } from 'html-entities';
import AddLike from './AddLike';
import SavePost from './SavePost';

const Post = ({ post, postsUpdate, currentUser, currentUserdecoded }) => {
  const [fileType, setFileType] = useState('');
  const [likeUpdatePost, setLikeUpdatePost] = useState();
  const [likes, setLikes] = useState(
    post.sumLikes ? parseInt(post.sumLikes) : 0
  );

  useEffect(() => {
    setFileType(post.attachment?.split('_')[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsUpdate, currentUser, post.id]);

  useEffect(() => {
    likeUpdatePost === 1
      ? setLikes(likes + 1)
      : likeUpdatePost === 0 && setLikes(likes - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeUpdatePost]);

  return (
    <div className="posts__post">
      <div className="posts__post__header">
        <span className="posts__post__header__date">
          {`Le ${moment(`${post.createdAt}`).locale('fr').format('L')} à 
          ${moment(`${post.createdAt}`).locale('fr').format('LT')}`}
        </span>
        <span className="posts__post__header__likeSvg">
          <FontAwesomeIcon
            icon={faFaceGrinTears}
            size="xl"
            aria-label="Icone qui représente un pouce en l'air"
          ></FontAwesomeIcon>
        </span>
        <span className="posts__post__header__likeNb">{likes}</span>
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
      <div className="posts__post__content">
        {post.content !== ('undefined' || '') && (
          <div className="posts__post__content__text">
            {decode(post.content)}
          </div>
        )}
        {post.attachment !== ('null' || '' || 'undefined') &&
          post.attachment &&
          fileType.split('/')[0] === 'image' && (
            <div className="posts__post__content__media">
              <img src={post.attachment} alt="illustration du post" />
            </div>
          )}
        {post.attachment !== ('null' || '' || 'undefined') &&
          post.attachment &&
          fileType.split('/')[0] === 'video' && (
            <div className="posts__post__content__media">
              <video controls controlsList="nodownload" width="100%">
                <source src={post.attachment} />
              </video>
            </div>
          )}
      </div>
      <div className="posts__post__footer">
        <AddLike
          currentUser={currentUser}
          currentUserdecoded={currentUserdecoded}
          post={post}
          setLikeUpdatePost={setLikeUpdatePost}
        />
        <SavePost
          currentUser={currentUser}
          currentUserdecoded={currentUserdecoded}
          post={post}
        />
      </div>
    </div>
  );
};

export default Post;
