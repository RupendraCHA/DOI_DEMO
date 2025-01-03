import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          {/* <img src={assets.logo} alt='' /> */}
          <h2 className="section-heading">Get our Latest Updates</h2>
          <p>
            Subscribe now to stay updated with the latest SAP features, expert
            tips, product updates, and exclusive training opportunities to
            enhance your productivity!
          </p>
          <input type="email" placeholder="Enter your email address" />
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div className="footer-content-center">
          <h2 className="section-heading">ABOUT US</h2>
          <ul>
            <li>Our Story</li>
            <li>Blogs</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Help & Support</li>
          </ul>
        </div>
        {/* <div className="footer-content-center">
          <h2 className="section-heading">OUR SERVICES</h2>
          <ul>
            <li>Book Malli</li>
            <li>Plant Day Care</li>
            <li>Rent Plants</li>
            <li>Plants & Pots</li>
            <li>Gardening Tools</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2 className="section-heading">USEFUL LINKS</h2>
          <ul>
            <li>My Account</li>
            <li>Orders & Returns</li>
            <li>Track Order</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Return, Refund & Replacement Policy</li>
          </ul>
        </div> */}
        <div className="footer-content-right">
          <h2 className="section-heading">GET IN TOUCH</h2>
          <ul>
            <li>
              Address: F-262, First Floor, Sushanth Lok Phase-III, Sector-57,
              Gurgaon, Haryana, India 122003
            </li>
            <li>Call: +919958287272</li>
            <li>Email: care@chaperoneplants.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-section-end">
        <h2 className="follow">Follow us on</h2>
        <div className="social-icons">
          <span>Linkedin</span>
          <span>Instagram</span>
          <span>Facebook</span>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright @ 2025 © Visionsoft.Inc - All rights are reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
