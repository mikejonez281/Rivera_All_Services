import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

function Services() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="services-page">
      <h1>{t.services.title}</h1>
      <p>{t.services.description}</p>
      <div className="services-list">
        {Object.values(t.services.categories).map((category, idx) => (
          <div key={idx} className="service-category">
            <h1>{category.title}</h1>
            {category.items.map((item, i) => (
              <div key={i} className="service-item">
                <h5>{item.name}</h5>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;