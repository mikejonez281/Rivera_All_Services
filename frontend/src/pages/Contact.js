function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch for a free consultation</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Reach Out</h2>
          <div className="info-item">
            <h3>Phone</h3>
            <p>1-888-RIVERA</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>info@riveraservices.com</p>
          </div>
          <div className="info-item">
            <h3>Hours</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <form className="contact-form">
          <h2>Send us a Message</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact; 