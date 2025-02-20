import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';



function Navbar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <logo />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">{t.nav.home}</Link>
        <Link to="/about">{t.nav.about}</Link>
        <Link to="/services">{t.nav.services}</Link>
        <Link to="/contact">{t.nav.contact}</Link>
        <Link to="/chat" className="chat-button">
          {t.nav.chat}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar; 