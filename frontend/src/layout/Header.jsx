import logo from '../assets/Logonew_transparent.webp';

const Header = () => {
  return (
    <header>
      <img className="logo__img" src={logo} alt="emojoi qui pleur de rire" />
      <div className="user">
        <div className="user__welcom">
          <span>Bienvenue</span>
        </div>
        <nav></nav>
      </div>
    </header>
  );
};

export default Header;
