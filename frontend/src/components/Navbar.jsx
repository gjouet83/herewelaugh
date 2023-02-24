import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, toggle, setToggle }) => {
  const handleClick = () => {
    setToggle(false);
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
        <li>Mon Profil</li>
        <li>Mes Signets</li>
        <li>Mes Posts</li>
        <li>Mes Paramètres de connexion</li>
        <li>Déconnexion</li>
      </ul>
    </nav>
  );
};

export default Navbar;
