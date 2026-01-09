import React, { useRef } from 'react';
import './contactus.css';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import emailjs from 'emailjs-com';

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_i3t0kvh',     // 🔁 Your EmailJS Service ID
        'template_b9s5dgr',    // 🔁 Your EmailJS Template ID
        form.current,
        'gimfEfjaE6hdhlA1x'    // 🔁 Your EmailJS Public Key
      )
      .then(
        () => {
          alert('✅ Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          alert('❌ Failed to send message. Please try again.');
          console.error(error);
        }
      );
  };

  return (
    <div className="contact-container">

      {/* Left Section */}
      <div className="contact-left">
        <h2 className="title-green">Get in Touch</h2>

        <p>
          <FaEnvelope className="icon-red" />
          <strong>Email:</strong> sivanagaraju8392@gmail.com
        </p>

        <p>
          <FaPhone className="icon-green" />
          <strong>Phone:</strong> 6303336483
        </p>

        <p>
          <FaMapMarkerAlt className="icon-red" />
          <strong>Address:</strong> Eluru, Andhra Pradesh
        </p>

        <h3 className="follow-title">Follow Us</h3>
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="contact-right">
        <h2>Send Us a Message</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="from_name"
            placeholder="Enter your name"
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Enter your email"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
  );
}

export default ContactUs;
