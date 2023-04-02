import moment from 'moment';
import 'moment/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinTears as farFaceGrinTears } from '@fortawesome/free-regular-svg-icons';
import { faFaceGrinTears, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { decode } from 'html-entities';

const Post = ({
  post,
  postsUpdate,
  setPostsUpdate,
  currentUser,
  currentUserdecoded,
}) => {
  const [likeStatus, setLikeStatus] = useState(0);
  const [fileType, setFileType] = useState('');

  const handleClick = () => {
    if (currentUser) {
      sendLike();
    } else {
      window.location.assign('/login');
    }
  };

  const sendLike = () => {
    if (likeStatus === 2) {
      const like = {
        userId: currentUserdecoded.userId,
        postId: post.id,
        like: 1,
      };
      axios
        .post('http://localhost:3000/api/likes/', like, {
          headers: { Authorization: `Bearer ${currentUser}` },
        })
        .then(() => {
          setPostsUpdate(!postsUpdate);
        })
        .catch((error) => {
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    } else if (likeStatus === 0) {
      const like = {
        userId: currentUserdecoded.userId,
        postId: post.id,
        like: 1,
      };
      axios
        .put('http://localhost:3000/api/likes', like, {
          headers: { Authorization: `Bearer ${currentUser}` },
        })
        .then(() => {
          setPostsUpdate(!postsUpdate);
        })
        .catch((error) => {
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    } else {
      const like = {
        userId: currentUserdecoded.userId,
        postId: post.id,
        like: 0,
      };
      axios
        .put('http://localhost:3000/api/likes', like, {
          headers: { Authorization: `Bearer ${currentUser}` },
        })
        .then(() => {
          setPostsUpdate(!postsUpdate);
        })
        .catch((error) => {
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    }
  };

  useEffect(() => {
    const getLikeStatus = () => {
      axios
        .get('http://localhost:3000/api/likes/user', {
          headers: { Authorization: `Bearer ${currentUser}` },
          params: { postId: post.id, userId: currentUserdecoded.userId },
        })
        .then((likeStatus) => {
          if (likeStatus.data === null) {
            setLikeStatus(2);
          } else if (likeStatus.data.like === 1) {
            setLikeStatus(1);
          } else if (likeStatus.data.like === 0) {
            setLikeStatus(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (currentUser != null) {
      getLikeStatus();
    }
    setFileType(post.attachment?.split('_')[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsUpdate, currentUser, post.id]);

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
        <span className="posts__post__header__likeNb">
          {post.Likes.map((nb) => nb.like).reduce((total, nb) => total + nb, 0)}
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
      <div className="posts__post__content">
        {post.content !== ('undefined' || '') && (
          <div className="posts__post__content__text">
            {decode(post.content)}
          </div>
        )}
        {post.attachment !== ('null' || '' || 'undefined') &&
          fileType.split('/')[0] === 'image' && (
            <div className="posts__post__content__media">
              <img src={post.attachment} alt="illustration du post" />
            </div>
          )}
        {post.attachment !== ('null' || '' || 'undefined') &&
          fileType.split('/')[0] === 'video' && (
            <div className="posts__post__content__media">
              <video controls controlsList="nodownload" width="100%">
                <source src={post.attachment} />
              </video>
            </div>
          )}
      </div>
      <div className="posts__post__footer">
        <button
          className="footerButtons"
          aria-label="boutton vote"
          onClick={() => handleClick()}
        >
          {(likeStatus === 0 || likeStatus === 2) && (
            <FontAwesomeIcon
              icon={farFaceGrinTears}
              size="2xl"
              aria-label="Icone qui représente un smiley qui pleure de rire"
            ></FontAwesomeIcon>
          )}
          {(likeStatus === 0 || likeStatus === 2) && (
            <span className="footerButtons__addVote">+1</span>
          )}
          {likeStatus === 1 && (
            <FontAwesomeIcon
              icon={faFaceGrinTears}
              size="2xl"
              aria-label="Icone qui représente un smiley qui pleure de rire"
            ></FontAwesomeIcon>
          )}
          {likeStatus === 1 && (
            <FontAwesomeIcon
              icon={faCheck}
              aria-label="Icone qui représente un check"
              className="footerButtons__checkVote"
            ></FontAwesomeIcon>
          )}
        </button>
      </div>
    </div>
  );
};

export default Post;
