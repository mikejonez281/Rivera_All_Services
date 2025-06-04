import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import './Services.css'; // Import the CSS file for hover effect
import { useNavigate } from 'react-router-dom';

function Services() {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleGeneralRepairsClick = () => {
    navigate('/services#general');
  };

  useEffect(() => {
    if (window.location.hash === '#general') {
      const el = document.getElementById('general');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">{t.services.title}</h1>
      <p className="lead text-center">{t.services.description}</p>
      <div className="row">
        {Object.entries(t.services.categories).map(([key, category], idx) => (
          <div
            key={idx}
            className="col-12 mb-5"
            id={key === 'bathroom' ? 'bathroom' : key === 'general' ? 'general' : key === 'kitchen' ? 'kitchen' : undefined}
          >
            <h2 className="mb-3">{category.title}</h2>
            <div className="row">
              {category.items.map((item, i) => (
                <div key={i} className="col-md-6 col-lg-4 mb-4">
                  <div
                    className="card h-100 bg-light border-0 service-card-pop"
                    style={{
                      boxShadow:
                        '0 2px 6px 0 rgba(60,60,60,0.10), 0 1.5px 3px 0 rgba(60,60,60,0.10), 0 0.5px 0.5px 0 rgba(255,255,255,0.8) inset, 0 2px 8px 0 rgba(0,0,0,0.08) inset',
                      borderRadius: '1rem',
                      transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s cubic-bezier(.4,2,.6,1)'
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-secondary">{item.name}</h5>
                      <p className="card-text" style={{ color: '#444' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleGeneralRepairsClick} style={{ cursor: 'pointer' }}>
        {/* General Repairs box content */}
      </div>
    </div>
  );
}

export default Services;