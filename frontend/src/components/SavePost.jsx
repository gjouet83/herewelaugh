import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const SavePost = ({ currentUser, currentUserdecoded, post }) => {
  const [savePostStatus, setSavePostStatus] = useState(0);

  useEffect(() => {
    const getSavePostStatus = () => {
      axios
        .get('http://localhost:3000/api/savedposts/user', {
          headers: { Authorization: `Bearer ${currentUser}` },
          params: { postId: post.id, userId: currentUserdecoded?.userId },
        })
        .then((status) => {
          if (status.data) {
            setSavePostStatus(1);
          } else if (status.data === 0) {
            setSavePostStatus(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (currentUser != null) {
      getSavePostStatus();
    }
  }, [currentUser, currentUserdecoded?.userId, post.id]);

  const savePost = () => {
    const savedPost = { userId: currentUserdecoded.userId, postId: post.id };
    axios
      .post('http://localhost:3000/api/savedposts/', savedPost, {
        headers: { Authorization: `Bearer ${currentUser}` },
      })
      .then(() => {
        setSavePostStatus(1);
      })
      .catch((error) => {
        if (error.response.data.error === 'TokenExpiredError') {
          window.location.assign('/login');
        }
      });
  };

  const deleteSavedPost = () => {
    axios
      .delete('http://localhost:3000/api/savedposts/:savedPost_id', {
        headers: { Authorization: `Bearer ${currentUser}` },
        params: {
          postId: post.id,
          userId: currentUserdecoded.userId,
        },
      })
      .then(() => {
        setSavePostStatus(0);
        console.log('savedPost deleted');
      })
      .catch(() => {
        console.log('failed to delete savedpost');
      });
  };
  const handleClick = () => {
    currentUser && savePostStatus === 0
      ? savePost()
      : currentUser && savePostStatus === 1
      ? deleteSavedPost()
      : window.location.assign('/login');
  };
  return (
    <button
      className="footerButtons"
      aria-label="boutton enregistrer le post "
      onClick={() => handleClick()}
    >
      {savePostStatus === 0 && (
        <FontAwesomeIcon
          icon={farBookmark}
          size="2xl"
          aria-label="Icone qui représente un smiley qui pleure de rire"
        ></FontAwesomeIcon>
      )}
      {savePostStatus === 0 && (
        <span className="footerButtons__addVote">+1</span>
      )}
      {savePostStatus === 1 && (
        <FontAwesomeIcon
          icon={faBookmark}
          size="2xl"
          aria-label="Icone qui représente un smiley qui pleure de rire"
        ></FontAwesomeIcon>
      )}
      {savePostStatus === 1 && (
        <FontAwesomeIcon
          icon={faCheck}
          aria-label="Icone qui représente un check"
          className="footerButtons__checkVote"
        ></FontAwesomeIcon>
      )}
    </button>
  );
};

export default SavePost;
