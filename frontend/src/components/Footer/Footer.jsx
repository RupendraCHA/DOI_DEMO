import React, { useEffect } from "react";
// import { FaFacebook } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import "./Footer.css";
import aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="footer-container" data-aos="fade-down">
      <div className="powered-by-container">
        <div className="powered-by-section">
          <p>Powered By</p>

          <a href="https://visionsoft.com/" target="_blank">
            <img
              src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1736189161/visionsoft-logo-partners_gigfpv.jpg"
              className="website-logo"
            />
          </a>
          {/* <a
            href="https://www.quantumvision.com/it-consulting-and-staffing-solutions-about-us"
            target="_blank"
          >
            <img
              // src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1736189097/QVLogo_yifukr.jpg"
              src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1736189593/QVLogo1_odx3v3.jpg"
              className="website-logo"
            />
          </a> */}
        </div>
      </div>
      {/* <hr /> */}
      <div className="container footer-section">
        <div className="footer-section-one">
          <h2>Get Latest Updates</h2>
          <p>
            Stay updated with the latest advancements in SAP S/4HANA. Discover
            insights, tips, and best practices to optimize your business
            processes, enhance productivity, and unlock the full potential of
            your ERP system.
          </p>
          <input type="email" placeholder="Enter your email address" />
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div className="footer-section-two">
          <h2>Get In Touch</h2>
          <ul>
            <li>
              Address: Princeton Highstown Road, Suit #17, Building 4, Princeton
              , NJ-08550
            </li>
            <li>Phone : + 732 532 9164</li>
            <li>Email : info@visionsoft.com</li>
          </ul>
        </div>
        <div className="footer-section-three">
          <h2>Follow Us On</h2>
          <div className="social-platforms">
            <a href="https://www.facebook.com/visionsoftinfo/" target="_blank">
              <FaFacebook className="social-icon facebook" />
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2Fvisionsoftinfo"
              target="_blank"
            >
              <FaSquareXTwitter className="social-icon x" />
            </a>
            <a
              href="https://www.linkedin.com/company/vsoft-inc/posts/?feedView=all"
              target="_blank"
            >
              <FaLinkedin className="social-icon linkedin" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright @ 2025 © Visionsoft.Inc - All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
