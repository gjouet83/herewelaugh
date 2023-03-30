import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const AddNewPost = ({
  postsUpdate,
  setPostsUpdate,
  currentUser,
  currentUserdecoded,
  showHideTextArea,
  setShowHideTextArea,
}) => {
  const [postContent, setPostContent] = useState('');
  const post = {
    userId: currentUserdecoded.userId,
    content: postContent,
  };
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/posts/', post, {
        headers: { Authorization: `Bearer ${currentUser}` },
      })
      .then(() => {
        setShowHideTextArea(!showHideTextArea);
        setPostsUpdate(!postsUpdate);
        setPostContent('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="newPost__formContainer">
      <form className="newPost__formContainer__form" onSubmit={handleClick}>
        <textarea
          className="newPost__formContainer__form__textArea"
          type="text"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        ></textarea>
        <button className="newPost__formContainer__form__send" type="submit">
          <FontAwesomeIcon
            className="newPost__formContainer__form__send__ico"
            icon={faPaperPlane}
            size="xl"
            aria-label="Icone qui représente un avion en papier"
          ></FontAwesomeIcon>
        </button>
      </form>
    </div>
  );
};

export default AddNewPost;
