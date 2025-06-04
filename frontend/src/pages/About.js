import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

function About() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 mb-3 text-dark">{t.about.title}</h1>
          <p className="lead text-dark">{t.about.description}</p>
        </div>
      </div>

      <hr className="mb-5" />

      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <h2 className="h4 text-secondary">{t.about.ourStory}</h2>
          <p>{t.about.ourStoryText}</p>
        </div>
        <div className="col-md-6 mb-4">
          <h2 className="h4 text-secondary">{t.about.ourMission}</h2>
          <p>{t.about.ourMissionText}</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="h4 text-secondary">{t.about.ourTeam}</h2>
          <p>{t.about.ourTeamText}</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="h4 text-secondary mb-4">{t.about.ourValues}</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-6 col-md-3 mb-4">
          <div className="py-3 px-2 bg-light rounded shadow-sm h-100">
            <h5 className="fw-bold text-dark">{t.about.values.quality}</h5>
            <p className="mb-0 text-muted">{t.about.values.qualityText}</p>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-4">
          <div className="py-3 px-2 bg-light rounded shadow-sm h-100">
            <h5 className="fw-bold text-dark">{t.about.values.integrity}</h5>
            <p className="mb-0 text-muted">{t.about.values.integrityText}</p>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-4">
          <div className="py-3 px-2 bg-light rounded shadow-sm h-100">
            <h5 className="fw-bold text-dark">{t.about.values.reliability}</h5>
            <p className="mb-0 text-muted">{t.about.values.reliabilityText}</p>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-4">
          <div className="py-3 px-2 bg-light rounded shadow-sm h-100">
            <h5 className="fw-bold text-dark">{t.about.values.customerFocus}</h5>
            <p className="mb-0 text-muted">{t.about.values.customerFocusText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;