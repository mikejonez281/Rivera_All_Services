import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

function Services() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">{t.services.title}</h1>
      <p className="lead text-center">{t.services.description}</p>
      <div className="row">
        {Object.values(t.services.categories).map((category, idx) => (
          <div key={idx} className="col-12 mb-5">
            <h2 className="mb-3">{category.title}</h2>
            <div className="row">
              {category.items.map((item, i) => (
                <div key={i} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;