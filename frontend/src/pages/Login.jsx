import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/LogSignForm';

const Login = () => {
  const page = 'login';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <main>
      <section className="login">
        <div className="login__logo">
          <img
            className="login__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="login__describ">
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en lisant
          ou en partageant vos images, vidéos ou histoires drôles.
        </h1>
        <h2 className="login__name">Connexion</h2>
        <Form page={page} />
        <div className="login__separate">
          <span className="login__separate__text">
            Si n'avez pas encore de compte
          </span>
        </div>
        <div className="login__loginLink">
          <span>
            <Link to="/signup">S'inscrire</Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
