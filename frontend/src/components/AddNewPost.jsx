import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { decode } from 'html-entities';

const AddNewPost = ({
  mode,
  postsUpdate,
  postToUpdate,
  setPostsUpdate,
  currentUser,
  currentUserdecoded,
  showHideTextArea,
  setShowHideTextArea,
}) => {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);
  const contentRef = useRef('');
  const mediaRef = useRef('');

  const post = new FormData();
  post.append('userId', currentUserdecoded.userId);
  post.append('content', postContent ? postContent : postToUpdate?.content);
  post.append('attachment', media ? media : postToUpdate?.attachment);

  const cancelMedia = () => {
    setMedia();
    mediaRef.current.value = '';
  };

  const cancelPost = () => {
    setPostContent();
    contentRef.current.value = '';
    setMedia();
    mediaRef.current.value = '';
    setShowHideTextArea(!showHideTextArea);
  };

  const handleClick = (e) => {
    e.preventDefault();
    mode === 'update'
      ? axios
          .put(
            `${process.env.REACT_APP_REQ_URL}/api/posts/` + postToUpdate.id,
            post,
            {
              headers: {
                Authorization: `Bearer ${currentUser}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then(() => {
            setShowHideTextArea(!showHideTextArea);
            setPostsUpdate(!postsUpdate);
            setPostContent('');
            setMedia('');
            mediaRef.current.value = '';
            contentRef.current.value = '';
          })
          .catch((error) => {
            console.log(error);
          })
      : axios
          .post(`${process.env.REACT_APP_REQ_URL}/api/posts/`, post, {
            headers: {
              Authorization: `Bearer ${currentUser}`,
              'Content-Type': 'application/json',
            },
          })
          .then(() => {
            setShowHideTextArea(!showHideTextArea);
            setPostsUpdate(!postsUpdate);
            setPostContent('');
            setMedia('');
            mediaRef.current.value = '';
            contentRef.current.value = '';
          })
          .catch((error) => {
            console.log(error);
          });
  };

  useEffect(() => {
    if (mode === 'update') {
      contentRef.current.value =
        postToUpdate.content !== 'undefined'
          ? decode(postToUpdate.content)
          : '';
    }
  }, [mode, postToUpdate]);

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
            contentRef.current.value === '' && mediaRef.current.value === ''
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
            Choisir un media
            <input
              className="posts__createone__addfile__input"
              type="file"
              accept="image/*, video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              ref={mediaRef}
            />
          </label>
          <span className="posts__createone__addfile__name">
            {media && media.name}
            {!media &&
              mode === 'update' &&
              postToUpdate.attachment &&
              postToUpdate.attachment.split('posts_')[1]}
          </span>
          {media && (
            <button
              className="posts__createone__addfile__cancel"
              type="button"
              onClick={cancelMedia}
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
