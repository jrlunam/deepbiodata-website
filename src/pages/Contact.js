// src/pages/Contact.js
import React from 'react';
import '../pages/Home.css';

function Contact() {
  return (
    //<div className="contact-page">
    <div className="background-page">
      <h1>Contact Us</h1>
      <p>Get in touch with DeepBiodata:</p>
      <ul>
        <li>
          <strong>Email:</strong> 
          <a href="mailto:info@deepbiodata.com" style={{ marginLeft: '0.5rem', color: '#007BFF' }}>
            info@deepbiodata.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong> 
          <a href="tel:+1234567890" style={{ marginLeft: '0.5rem', color: '#007BFF' }}>
            +1 (234) 567-890
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Contact;
