import React, { useState } from 'react';

function Contact() {
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
          <h1>Contact Us</h1>
          <p>We are here to help you with your home renovation needs. Get in touch with us to schedule a free consultation or setup an appointment.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 mb-4">
          <h2>Reach Out</h2>
          <div className="mb-3">
            <h5>Phone</h5>
            <p><a href="tel:+1 786-294-1207">+1 786-294-1207</a></p>
          </div>
          <div className="mb-3">
            <h5>Email</h5>
            <p><a href="mailto:riverallservices@gmail.com">riverallservices@gmail.com</a></p>
          </div>
          <div className="mb-3">
            <h5>Hours</h5>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">Send us a Message</h2>
          {submitted ? (
            <div className="alert alert-success text-center">
              Thank you for your message! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
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
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="phone" className="form-label">Phone</label>
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
                <label htmlFor="message" className="form-label">Message</label>
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
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;