import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const AddNewPost = ({
  postsUpdate,
  setPostsUpdate,
  currentUser,
  currentUserdecoded,
}) => {
  const [postContent, setPostContent] = useState('');
  const [showHideTextArea, setShowHideTextArea] = useState(false);
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
    <div
      className={`newPost ${showHideTextArea ? 'showNewPost' : 'hideNewPost'}`}
    >
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
      <div className="newPost__buttonContainer">
        <button
          className="newPost__buttonContainer__hideButton"
          type="button"
          onClick={() => setShowHideTextArea(!showHideTextArea)}
        >
          <FontAwesomeIcon
            className="newPost__buttonContainer__hideButton__ico"
            icon={faPencil}
            size="xl"
            aria-label="Icone qui représente un crayon"
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default AddNewPost;
