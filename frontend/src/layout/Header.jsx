import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Header = ({ updateFromProfil }) => {
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);

  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);

  useEffect(() => {
    const getUser = () => {
      axios
        .get(
          `${process.env.REACT_APP_REQ_URL}/api/users/${currentUserdecoded.userId}`,
          {
            headers: { Authorization: `Bearer ${currentUser}` },
          }
        )
        .then((user) => {
          setUser(user.data.user.username);
        })
        .catch((error) => {
          localStorage.removeItem('user');
          if (error.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    };
    if (currentUser) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFromProfil]);

  return (
    <header className="header">
      <Link to="/posts">
        <img
          className="header__logo"
          src={logo}
          alt="emojoi qui pleur de rire"
        />
      </Link>
      <h1 className="header__userWelcome">
        Bienvenue sur HereWeLaugh {user} !
      </h1>
      <button
        className="menuButton"
        name="menu"
        onClick={() => setToggle(true)}
      >
        <FontAwesomeIcon
          className="menuButton__ico"
          icon={faBars}
          size="xl"
          aria-label="icone représentant des bars horizontales"
        ></FontAwesomeIcon>
      </button>
      <Navbar user={user} toggle={toggle} setToggle={setToggle} />
    </header>
  );
};

export default Header;
