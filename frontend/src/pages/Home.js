import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';



function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const cardStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '1rem',
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>{t.home.welcome}</h1>
        <p>{t.home.subtitle}</p>
        <button className="cta-button">{t.home.getStarted}</button>
      </div>

      <div className="services-preview">
        <h2>{t.home.servicesTitle}</h2>
        <div className="service-cards">
          <div 
            className="service-card" 
            style={{
              ...cardStyle,
              backgroundImage: 'url("/images/bathroom-renovation.jpg")',
            }}
          >
            <div 
              className="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.3s ease-in-out',
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3>{t.home.services.bathroom.title}</h3>
              <p>{t.home.services.bathroom.description}</p>
            </div>
          </div>

          <div 
            className="service-card" 
            style={{
              ...cardStyle,
              backgroundImage: 'url("/images/kitchen-renovation.jpg")',
            }}
          >
            <div 
              className="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.3s ease-in-out',
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3>{t.home.services.kitchen.title}</h3>
              <p>{t.home.services.kitchen.description}</p>
            </div>
          </div>

          <div 
            className="service-card" 
            style={{
              ...cardStyle,
              backgroundImage: 'url("/images/general-repairs.jpg")',
            }}
          >
            <div 
              className="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.3s ease-in-out',
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3>{t.home.services.repairs.title}</h3>
              <p>{t.home.services.repairs.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="why-choose-us">
        <h2>{t.home.whyChooseUs}</h2>
        <div className="features">
          <div className="feature">
            <h3>{t.home.features.experience.title}</h3>
            <p>{t.home.features.experience.description}</p>
          </div>
          <div className="feature">
            <h3>{t.home.features.quality.title}</h3>
            <p>{t.home.features.quality.description}</p>
          </div>
          <div className="feature">
            <h3>{t.home.features.pricing.title}</h3>
            <p>{t.home.features.pricing.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 