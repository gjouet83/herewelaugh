import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinTears as farFaceGrinTears } from '@fortawesome/free-regular-svg-icons';
import { faFaceGrinTears, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const AddLike = ({
  currentUser,
  currentUserdecoded,
  post,
  setLikeUpdatePost,
}) => {
  const [likeStatus, setLikeStatus] = useState(0);

  const handleClick = () => {
    if (currentUser) {
      sendLike();
    } else {
      window.location.assign('/login');
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
  }, [currentUser, currentUserdecoded.userId, post.id]);

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
          setLikeStatus(1);
          setLikeUpdatePost(1);
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
          setLikeStatus(1);
          setLikeUpdatePost(1);
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
          setLikeStatus(0);
          setLikeUpdatePost(0);
        })
        .catch((error) => {
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    }
  };

  return (
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
  );
};

export default AddLike;
