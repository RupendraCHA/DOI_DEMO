import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./Header.css";

const Header = ({ message = "" }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  const handleTabClick = () => {
    setIsOpen(!isOpen);
    setIsOpenActive(!isOpenActive);
  };
  console.log(message);

  const getButton = () => {
    if (message === "signup") {
      return (
        <Link to="/login">
          <button>Login</button>
        </Link>
      );
    } else if (message === "login") {
      return (
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      );
    }
    return (
      <>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </>
    );
  };

  return (
    <div className="header-container">
      <nav className="container header-section-container">
        <div className="logo-container">
          <div>
            <Link to="/" className="website-name-section">
              <img src="./dlogo.jpg" className="website-logo" />
              <h3>DOI</h3>
            </Link>
          </div>
        </div>
        {message === "" ? (
          <div className="tabs-bar-section">
            <ul
              className={isOpen ? "tabs-container active1" : "tabs-container"}
            >
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
                  href="#explore-offerings"
                  onClick={() => setMenu("explore-offerings")}
                  className={menu === "explore-offerings" ? "active" : ""}
                >
                  Explore Offerings
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
              {isOpenActive === false ? (
                <FaBars className="icon" />
              ) : (
                <RxCross2 className="icon" />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="user-icon-container">{getButton()}</div>
      </nav>
    </div>
  );
};

export default Header;
