import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./Header.css";
import { FaUserTie } from "react-icons/fa";

import aos from "aos";
import "aos/dist/aos.css";
import { StoreContext } from "../../context/StoreContext";

const Header = ({
  message = "",
  salesText = "",
  materialsText = "",
  financeText = "",
  tabText = "",
}) => {
  // const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [username, setUserName] = useState("");

  const {
    sapSalesModuleText,
    setSapSalesModuleText,
    sapMaterialsModuleText,
    setSapMaterialsModuleText,
    sapIntroText,
    setSapIntroText,
    menu,
    setMenu,
    isLoading1,
    setLoading1,
    isLoading,
    setLoading,
    setHomeText,
    setHomeText1,
    setSalesTable,
  } = useContext(StoreContext);

  useEffect(() => {
    aos.init({ duration: 2000 });

    if (tabText === "contact") {
      setMenu("support");
    }

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
    // const signInLinkUrl =
    //   "https://ap-south-1nmrg96rqu.auth.ap-south-1.amazoncognito.com/login?client_id=1esfsaanp9ncgms41753687pd8&redirect_uri=https%3A%2F%2Fdoi-demo-52o9.onrender.com%2Fhome&response_type=code&scope=email+openid+phone";

    // window.location.href = signInLinkUrl;
    // navigate("/login");
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
    } else if (message === "contact") {
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

  const showModuleData = () => {
    setSapIntroText(false);
    setMenu("sales");
    setSapSalesModuleText(true);
    setSapMaterialsModuleText(false);
    setLoading1(false);
    setHomeText1(true);
  };

  const showMaterialModuleData = () => {
    setMenu("materials");
    setSapMaterialsModuleText(true);
    setSapSalesModuleText(false);
    setSapIntroText(false);
    setLoading(false);
    setHomeText(true);
    setSalesTable("");
  };

  const getRoute = () => {
    const token = localStorage.getItem("token")

    if (token) {
      return "/home"
    } else {
      return "/login"
    }
  }
  return (
    <div className="header-container" data-aos="zoom-in">
      <nav
        className={
          message === "modules"
            ? "header-section-container modules-section"
            : "container header-section-container"
        }
      >
        <div className="logo-container">
          <div>
            <Link to={getRoute()} className="website-name-section">
              {/* <img
                src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"
                className="website-logo"
              /> */}
              <h3>Data Archiving & Decommissioning Demo</h3>
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
                  About Us
                </a>
              </li>
              <Link to="/support">
                <li>
                  <a
                    href="#"
                    onClick={() => setMenu("support")}
                    className={menu === "support" ? "active" : "tab"}
                  >
                    Support
                  </a>
                </li>
              </Link>
              <Link to="/reports">
                <li>
                  <a
                    href="#"
                    onClick={() => setMenu("reports")}
                    className={menu === "reports" ? "active" : "tab"}
                  >
                    Reports
                  </a>
                </li>
              </Link>
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
          <div className="tabs-bar-section" style={{ marginRight: "200px" }}>
            <ul
              className={isOpen ? "tabs-container active1" : "tabs-container"}
            >
              <li>
                <Link
                  to="/sapDataModules"
                  href=""
                  onClick={showModuleData}
                  className={menu === "sales" ? "active" : "tab"}
                >
                  ORDER TO CASH
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={showMaterialModuleData}
                  className={menu === "materials" ? "active" : "tab"}
                >
                  PROCUREMENT
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
