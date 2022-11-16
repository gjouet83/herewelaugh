import logo from '../assets/Logonew_transparent.webp';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main>
      <section className="errorPage">
        <div className="errorPage__logo">
          <img
            className="errorPage__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h2 className="errorPage__name">Erreur 404</h2>
        <h1 className="errorPage__describ">
          Cette page n'existe pas ou vous n'êtes pas autorisé à accéder a cette
          page
        </h1>
        <span className="errorPage__linkarea linkButton">
          <Link to="/posts">Retour a l'accueil</Link>
        </span>
      </section>
    </main>
  );
};

export default Error;
