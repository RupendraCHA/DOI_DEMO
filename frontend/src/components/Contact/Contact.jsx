import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container contact-container" id="contact">
      <div>
        <h1 className="contact-heading">CONTACT US</h1>
        <div className="contact-input-section-1">
          <input type="text" placeholder="Name*" />
          <input type="text" placeholder="Email*" />
        </div>
        <div className="contact-input-section-2">
          <input type="text" placeholder="Subject" />
          <textarea
            className="contact-text-msg"
            cols="10"
            rows="5"
            placeholder="Message"
          ></textarea>
        </div>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Contact;
