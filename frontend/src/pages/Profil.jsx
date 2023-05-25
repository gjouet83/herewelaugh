import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Header from '../layout/Header';
import { useEffect, useState, useRef } from 'react';
import { decode } from 'html-entities';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateBackward } from '@fortawesome/free-solid-svg-icons';

const Profil = () => {
  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  const [user, setUser] = useState({});
  const [prevUser, setPrevUser] = useState({});
  const [updateHeader, setUpdateHeader] = useState(true);
  const [avatar, setAvatar] = useState();
  const avatarRef = useRef();
  const usernameRef = useRef();
  const lastnameRef = useRef();
  const birthdateRef = useRef();
  const firstnameRef = useRef();
  const describRef = useRef();

  let updatedUser = new FormData();
  updatedUser.append(
    'username',
    user.username === '' ? prevUser.username : user.username
  );
  updatedUser.append('lastname', user.lastname);
  updatedUser.append('firstname', user.firstname);
  updatedUser.append('birthdate', user.birthdate);
  updatedUser.append('describ', user.describ);
  updatedUser.append('avatar', !avatar ? user.avatar : avatar);

  const updateUser = (e) => {
    e.preventDefault();
    axios({
      headers: { Authorization: `Bearer ${currentUser}` },
      'Content-Type': 'application/json',
      url: 'http://localhost:3000/api/users/' + currentUserdecoded.userId,
      method: 'PUT',
      data: updatedUser,
    })
      .then(() => {
        setUpdateHeader(!updateHeader);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const deleteAvatar = () => {
    axios({
      headers: { Authorization: `Bearer ${currentUser}` },
      'Content-Type': 'application/json',
      url: `http://localhost:3000/api/users/${currentUserdecoded.userId}/avatar`,
      method: 'PUT',
    })
      .then(() => {
        avatarRef.current.value = '';
        setAvatar();
        setUpdateHeader(!updateHeader);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const deleteAccount = () => {
    axios
      .delete('http://localhost:3000/api/users/' + currentUserdecoded.userId, {
        headers: { Authorization: `Bearer ${currentUser}` },
      })
      .then(() => {
        console.warn('Account deleted');
        localStorage.removeItem('user');
        window.location.assign('/login');
      })
      .catch((errors) => {
        console.warn(errors);
      });
  };

  useEffect(() => {
    const getUser = () => {
      axios
        .get('http://localhost:3000/api/users/' + currentUserdecoded.userId, {
          headers: { Authorization: `Bearer ${currentUser}` },
        })
        .then((user) => {
          setAvatar();
          setUser(user.data.user);
          setPrevUser(user.data.user);
        })
        .catch((errors) => {
          console.log(errors);
        });
    };
    getUser();
  }, [currentUser, currentUserdecoded.userId, updateHeader]);

  console.log(user.avatar);
  console.log(avatar);

  return (
    <>
      <Header updateFromProfil={updateHeader} />
      <section className="profil">
        <h2 className="profil__title">Profil de {prevUser.username}</h2>
        <div className="profil__avatar">
          <figure className="profil__avatar__figure">
            <img
              src={!avatar ? user.avatar : URL.createObjectURL(avatar)}
              className="profil__avatar__figure__icon"
              alt={`avatar de profil de ${user.username}`}
            />
          </figure>
          {avatar && (
            <button
              className="cancelButton"
              onClick={() => {
                avatarRef.current.value = '';
                setAvatar();
              }}
            >
              <FontAwesomeIcon
                icon={faRotateBackward}
                aria-label="annulation des changements de la photo de profil"
              ></FontAwesomeIcon>
            </button>
          )}
        </div>

        <form className="profil__form" onSubmit={updateUser}>
          <label className="profil__form__lblFile linkButton">
            {!avatar
              ? 'Choisir une image de profil'
              : 'Choisir une autre image'}
            <input
              className="profil__form__inputFile"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              ref={avatarRef}
            />
          </label>
          <button
            disabled={
              user.avatar?.includes('user-solid') ||
              (avatar && !user.avatar?.includes('user-solid'))
                ? true
                : false
            }
            type="button"
            className="deleteButton"
            onClick={() => deleteAvatar()}
          >
            Supprimer l'Avatar
          </button>
          <label className="profil__form__lbl">
            Nom d'utilisateur
            <input
              className="profil__form__input"
              name="username"
              defaultValue={prevUser?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              ref={usernameRef}
            ></input>
            {user.username === '' && 'nan'}
            {user.username !== prevUser.username && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  usernameRef.current.value = prevUser.username;
                  setUser({ ...user, username: prevUser.username });
                }}
              >
                <FontAwesomeIcon
                  icon={faRotateBackward}
                  aria-label="annulation des changements du champ nom d'utilisateur"
                ></FontAwesomeIcon>
              </button>
            )}
          </label>
          <label className="profil__form__lbl">
            Date de naissance
            <input
              className="profil__form__input"
              name="birthdate"
              type="date"
              defaultValue={user?.birthdate}
              onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
              ref={birthdateRef}
            ></input>
            {user.birthdate !== prevUser.birthdate && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  birthdateRef.current.value = prevUser.birthdate;
                  setUser({ ...user, birthdate: prevUser.birthdate });
                }}
              >
                <FontAwesomeIcon
                  icon={faRotateBackward}
                  aria-label="annulation des changements du champ date de naissance"
                ></FontAwesomeIcon>
              </button>
            )}
          </label>
          <label className="profil__form__lbl">
            Nom
            <input
              className="profil__form__input"
              name="lastname"
              defaultValue={user?.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              ref={lastnameRef}
            ></input>
            {user.lastname !== prevUser.lastname && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  lastnameRef.current.value = prevUser.lastname;
                  setUser({ ...user, lastname: prevUser.lastname });
                }}
              >
                <FontAwesomeIcon
                  icon={faRotateBackward}
                  aria-label="annulation des changements du champ nom"
                ></FontAwesomeIcon>
              </button>
            )}
          </label>
          <label className="profil__form__lbl">
            Prénom
            <input
              className="profil__form__input"
              name="firstname"
              defaultValue={user?.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              ref={firstnameRef}
            ></input>
            {user.firstname !== prevUser.firstname && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  firstnameRef.current.value = prevUser.firstname;
                  setUser({ ...user, firstname: prevUser.firstname });
                }}
              >
                <FontAwesomeIcon
                  icon={faRotateBackward}
                  aria-label="annulation des changements du champ prénom"
                ></FontAwesomeIcon>
              </button>
            )}
          </label>
          <label className="profil__form__lbl">
            Descrivez-vous en quelques mots...
            <textarea
              className="profil__form__textArea"
              name="describ"
              defaultValue={decode(prevUser?.describ)}
              onChange={(e) => setUser({ ...user, describ: e.target.value })}
              ref={describRef}
            ></textarea>
            {user.describ !== prevUser.describ && (
              <button
                className="cancelButton"
                type="button"
                onClick={() => {
                  describRef.current.value = prevUser.describ;
                  setUser({ ...user, describ: prevUser.describ });
                }}
              >
                <FontAwesomeIcon
                  icon={faRotateBackward}
                  aria-label="annulation des changements du champ descritptif"
                ></FontAwesomeIcon>
              </button>
            )}
          </label>
          <button type="submit" className="profil__form__submit linkButton">
            Valider les changements
          </button>
        </form>
        <button
          type="button"
          className="deleteButton"
          onClick={() => deleteAccount()}
        >
          Supprimer le compte
        </button>
        <div className="profil__returnLink linkButton">
          <Link to="/posts">Retour</Link>
        </div>
      </section>
      ;
    </>
  );
};

export default Profil;
