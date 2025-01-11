import React, { useEffect } from "react";
import "./Contact.css";

import aos from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="contact-container" id="contact" data-aos="fade-down">
      <div className="contact-section">
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
    </div>
  );
};

export default Contact;
