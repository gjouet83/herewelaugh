import logo from '../assets/Logonew_transparent.webp';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main>
      <section className="error">
        <div className="error__logo">
          <img
            className="error__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h2 className="error__name">Erreur 404</h2>
        <h1 className="error__describ">
          Cette page n'existe pas ou vous n'êtes pas autorisé à accéder a cette
          page
        </h1>
        <span className="error__linkarea linkButton">
          <Link to="/posts">Retour a l'accueil</Link>
        </span>
      </section>
    </main>
  );
};

export default Error;
