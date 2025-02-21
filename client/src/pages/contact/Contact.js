import React from "react";
import "./Contact.css";
import NavBar from '../../components/nav-bar/NavBar';

const Contact = () => {
  return (
    <main>
      <NavBar />
      <div className="contact-container">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>We would love to hear from you. Please fill out the form below or reach out to us directly.</p>
        </header>
        <section className="contact-content">
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Enter your message" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
          <div className="contact-details">
            <h2>Contact Details</h2>
            <p><strong>Address:</strong> 123 Main Street, City, Country</p>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
