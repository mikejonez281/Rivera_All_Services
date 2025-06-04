import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

function About() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>{t.about.title}</h1>
        <p>{t.about.description}</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>{t.about.ourStory}</h2>
          <p>{t.about.ourStoryText}</p>
        </section>

        <section className="about-section">
          <h2>{t.about.ourMission}</h2>
          <p>{t.about.ourMissionText}</p>
        </section>

        <section className="about-section">
          <h2>{t.about.ourTeam}</h2>
          <p>{t.about.ourTeamText}</p>
        </section>

        <section className="about-section">
          <h2>{t.about.ourValues}</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>{t.about.values.quality}</h3>
              <p>{t.about.values.qualityText}</p>
            </div>
            <div className="value-item">
              <h3>{t.about.values.integrity}</h3>
              <p>{t.about.values.integrityText}</p>
            </div>
            <div className="value-item">
              <h3>{t.about.values.reliability}</h3>
              <p>{t.about.values.reliabilityText}</p>
            </div>
            <div className="value-item">
              <h3>{t.about.values.customerFocus}</h3>
              <p>{t.about.values.customerFocusText}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;