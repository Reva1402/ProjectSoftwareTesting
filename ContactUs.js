import React, { useState } from 'react';
import './FinalProject.css';
import BeforeLoginHeader from './BeforeLoginHeader.js';
import BeforeLoginFooter from './BeforeLoginFooter.js';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your Mail is submitted");
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div>
       <BeforeLoginHeader />
    <div className="contact-us">
     
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, please fill out the form below, and we will get back to you as soon as possible.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className="contact-info">
        <h2>Our Contact Information</h2>
        <p>Email: support@pixvibe.com</p>
        <p>Address: PixVibe, 123 Example St, City, Country</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      
    </div>
    <BeforeLoginFooter />
    </div>
  );
};

export default ContactUs;
