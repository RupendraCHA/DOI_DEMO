import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container fixed-bottom">
      <div className="container footer-section">
        <div className="footer-section-one">
          <h2 className="section-heading">Get Latest Updates</h2>
          <p>
            A nursery is a place where rooting of planting materials or
            germination of seeds can be obtained in a better way, under
            favourable growing conditions. In a nursery, seeds germinate
            effectively and seedlings give better stand in field. The nursery
            improves germination and colonization, saves time, space, labor and
            facilitates maintenance.
          </p>
          <input type="email" placeholder="Enter your email address" />
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div>section2</div>
        <div>section3</div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright @ 2025 © Visionsoft.Inc - All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
