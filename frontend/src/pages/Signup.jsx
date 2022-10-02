import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/LogSignForm';

const Signup = () => {
  const page = 'signup';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <main>
      <section className="signup">
        <div className="signup__logo">
          <img
            className="signup__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="signup__describ">
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en lisant
          ou en partageant vos images, vidéos ou histoires drôles.
        </h1>
        <h2 className="signup__name">Inscription</h2>
        <Form page={page} />
        <div className="signup__separate">
          <span className="signup__separate__text">
            Si vous possédez déjà un compte
          </span>
        </div>
        <div className="signup__signupLink">
          <span>
            <Link className="signup__signupLink__text" to="/login">
              Se connecter
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Signup;
