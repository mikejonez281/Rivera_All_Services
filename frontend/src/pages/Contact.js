import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 mb-4">
          <h2>{t.reachOut}</h2>
          <div className="mb-3">
            <h5>{t.phone}</h5>
            <p><a href="tel:+1 786-294-1207">+1 786-294-1207</a></p>
          </div>
          <div className="mb-3">
            <h5>{t.email}</h5>
            <p><a href="mailto:riverallservices@gmail.com">riverallservices@gmail.com</a></p>
          </div>
          <div className="mb-3">
            <h5>{t.hours}</h5>
            <p>{t.hoursWeekdays}</p>
            <p>{t.hoursSaturday}</p>
            <p>{t.hoursSunday}</p>
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{t.sendMessage}</h2>
          {submitted ? (
            <div className="alert alert-success text-center">
              {t.thankYou}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">{t.name}</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">{t.email}</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">{t.phone}</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">{t.message}</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">{t.sendButton}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;