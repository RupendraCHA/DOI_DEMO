import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./Header.css";
import { FaUserTie } from "react-icons/fa";

import aos from "aos";
import "aos/dist/aos.css";

const Header = ({
  message = "",
  salesText = "",
  materialsText = "",
  financeText = "",
}) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [username, setUserName] = useState("");

  useEffect(() => {
    aos.init({ duration: 2000 });

    const jwtToken = localStorage.getItem("token");
    const userName = localStorage.getItem("username");

    if (jwtToken) {
      setUserName(userName);
    }
  }, []);

  const navigate = useNavigate();

  const handleTabClick = () => {
    setIsOpen(!isOpen);
    setIsOpenActive(!isOpenActive);
  };
  // console.log(message);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const getButton = () => {
    if (message === "signup") {
      return (
        <Link to="/login">
          <button>Login</button>
        </Link>
      );
    } else if (message === "login") {
      return (
        <Link to="/">
          <button>Sign Up</button>
        </Link>
      );
    } else if (message === "modules") {
      return (
        <>
          <div className="user-icon-section">
            <FaUserTie className="user-icon-symbol" />
            <p className="user-name">{username}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    } else if (message === "") {
      return (
        <>
          <div className="user-icon-section">
            <FaUserTie className="user-icon-symbol" />
            <p className="user-name">{username}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    }
    return (
      <>
        <Link to="/">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </>
    );
  };

  return (
    <div className="header-container" data-aos="zoom-in">
      <nav
        className={
          message === "modules"
            ? "header-section-container"
            : "container header-section-container"
        }
      >
        <div className="logo-container">
          <div>
            <Link to="/home" className="website-name-section">
              <img
                src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"
                className="website-logo"
              />
              <h3>DOI DEMO</h3>
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
                  className={menu === "home" ? "active" : "tab"}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#explore-offerings"
                  onClick={() => setMenu("explore-offerings")}
                  className={menu === "explore-offerings" ? "active" : "tab"}
                >
                  Archived Data
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => setMenu("about")}
                  className={menu === "about" ? "active" : "tab"}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenu("contact")}
                  className={menu === "contact" ? "active" : "tab"}
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
        {message === "modules" ? (
          <div className="tabs-bar-section">
            <ul
              className={isOpen ? "tabs-container active1" : "tabs-container"}
            >
              <li>
                <Link
                  to="/sapDataModules"
                  href=""
                  onClick={() => setMenu("sales")}
                  className={menu === "sales" ? "active" : "tab"}
                >
                  SALES & DISTRIBUTION
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setMenu("materials")}
                  className={menu === "materials" ? "active" : "tab"}
                >
                  MATERIALS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setMenu("finance")}
                  className={menu === "finance" ? "active" : "tab"}
                >
                  FINANCE
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
