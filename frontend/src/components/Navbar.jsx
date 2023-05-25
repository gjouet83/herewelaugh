import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = ({ user, toggle, setToggle }) => {
  const handleClick = () => {
    setToggle(false);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    window.location.assign('/login');
  };

  return (
    <nav className={`nav ${toggle ? 'showNav' : 'hideNav'}`}>
      <button className="closeNavbar" name="fermer" onClick={handleClick}>
        <FontAwesomeIcon
          className="closeNavbar__ico"
          icon={faXmark}
          size="2xl"
          aria-label="icone représentant une croix"
        ></FontAwesomeIcon>
      </button>
      <ul className="nav__li">
        <li>
          <Link to="/profil">Mon Profil</Link>
        </li>
        <li>
          <Link to="/savedPosts">Mes Signets</Link>
        </li>
        <li>
          <Link to="/userPosts">Mes Posts</Link>
        </li>
        <li>
          <Link to="/connectParams">Mes Paramètres de connexion</Link>
        </li>
        <li>
          <Link to="#" onClick={() => logOut()}>
            Déconnexion
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
