import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import UpdateLogin from '../components/UpdateLogin';
import UpdatePwd from '../components/UpdatePwd';

const ConnectParams = () => {
  const currentUser =
    localStorage.getItem('user') !== 'undefined' &&
    JSON.parse(localStorage.getItem('user'));
  const currentUserdecoded = currentUser && jwt_decode(currentUser);
  const [user, setUser] = useState({});
  console.log(currentUserdecoded);

  useEffect(() => {
    const getUser = () => {
      axios
        .get(
          `${process.env.REACT_APP_REQ_URL}/api/users/` +
            currentUserdecoded.userId,
          {
            headers: { Authorization: `Bearer ${currentUser}` },
          }
        )
        .then((user) => {
          setUser(user.data.user);
        })
        .catch((errors) => {
          if (errors.response.data.error === 'TokenExpiredError') {
            window.location.assign('/login');
          }
        });
    };
    getUser();
  }, [currentUser, currentUserdecoded.userId]);

  return (
    <>
      <Header />
      <section className="connectParams">
        <h2 className="connectParams__title">
          Paramètres de connexion de {user.username}
        </h2>
        <UpdateLogin
          currentUser={currentUser}
          currentUserdecoded={currentUserdecoded}
        />
        <UpdatePwd
          currentUser={currentUser}
          currentUserdecoded={currentUserdecoded}
        />
      </section>
    </>
  );
};

export default ConnectParams;
