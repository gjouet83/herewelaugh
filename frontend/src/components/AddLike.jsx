import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinTears as farFaceGrinTears } from '@fortawesome/free-regular-svg-icons';
import { faFaceGrinTears, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const AddLike = ({
  currentUser,
  currentUserdecoded,
  post,
  likeUpdatePost,
  setLikeUpdatePost,
}) => {
  const [likeStatus, setLikeStatus] = useState(0);
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

  const handleClick = () => {
    if (currentUser) {
      sendLike();
      setLikeUpdatePost(!likeUpdatePost);
    } else {
      window.location.assign('/login');
    }
  };

  useEffect(() => {
    if (currentUser != null) {
      getLikeStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setLikeUpdatePost(!likeUpdatePost);
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
          setLikeUpdatePost(!likeUpdatePost);
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
          setLikeUpdatePost(!likeUpdatePost);
        })
        .catch((error) => {
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    }
  };

  return (
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
  );
};

export default AddLike;
