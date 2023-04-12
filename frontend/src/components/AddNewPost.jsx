import axios from 'axios';
import { useRef, useState } from 'react';
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
  const [image, setImage] = useState(null);
  const contentRef = useRef('');
  const imageRef = useRef('');

  const post = new FormData();
  post.append('userId', currentUserdecoded.userId);
  post.append('content', postContent);
  post.append('attachment', image);

  const cancelImage = () => {
    setImage();
    imageRef.current.value = '';
  };

  const cancelPost = () => {
    setImage();
    imageRef.current.value = '';
    setPostContent();
    contentRef.current.value = '';
    setShowHideTextArea(!showHideTextArea);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/posts/', post, {
        headers: {
          Authorization: `Bearer ${currentUser}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setShowHideTextArea(!showHideTextArea);
        setPostsUpdate(!postsUpdate);
        setPostContent('');
        setImage('');
        imageRef.current.value = '';
        contentRef.current.value = '';
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
          ref={contentRef}
        ></textarea>
        <button
          className="posts__createone__footer__cancel"
          type="button"
          onClick={cancelPost}
        >
          Annuler
        </button>
        <button
          disabled={
            contentRef.current.value === '' && imageRef.current.value === ''
              ? true
              : false
          }
          className="newPost__formContainer__form__send"
          type="submit"
        >
          <FontAwesomeIcon
            className="newPost__formContainer__form__send__ico"
            icon={faPaperPlane}
            size="xl"
            aria-label="Icone qui représente un avion en papier"
          ></FontAwesomeIcon>
        </button>
        <div className="posts__createone__addfile">
          <label className="posts__createone__addfile__lbl">
            Choisir une image
            <input
              className="posts__createone__addfile__input"
              type="file"
              accept="image/*, video/*"
              onChange={(e) => setImage(e.target.files[0])}
              ref={imageRef}
            />
          </label>
          <span className="posts__createone__addfile__name">
            {image && image.name}
          </span>
          {image && (
            <button
              className="posts__createone__addfile__cancel"
              type="button"
              onClick={cancelImage}
            >
              Annuler la Sélection
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
