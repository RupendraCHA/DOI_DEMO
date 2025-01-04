import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

import "./Header.css";

const Header = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-container">
      <nav className="container header-section-container">
        <div className="logo-container">
          <div className="website-name-section">
            <Link to="/">
              <img src="./dlogo.jpg" className="website-logo" />
            </Link>
            <h3>DOI</h3>
          </div>
        </div>
        <div className="tabs-bar-section">
          <ul className={isOpen ? "tabs-container active1" : "tabs-container"}>
            <li>
              <a
                href="#home"
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                onClick={() => setMenu("solutions")}
                className={menu === "solutions" ? "active" : ""}
              >
                Solutions
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setMenu("about")}
                className={menu === "about" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setMenu("contact")}
                className={menu === "contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="menu-icon-section" onClick={handleTabClick}>
            <FaBars className="icon" />
          </div>
        </div>
        <div className="user-icon-container">
          <button>Sign In</button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
