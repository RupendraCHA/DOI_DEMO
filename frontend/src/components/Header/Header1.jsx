import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./Header.css";
import { FaUserTie } from "react-icons/fa";
import aos from "aos";
import "aos/dist/aos.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Header = ({
  message = "",
  salesText = "",
  materialsText = "",
  financeText = "",
  tabText = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [username, setUserName] = useState("Guest");

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
    url
  } = useContext(StoreContext);

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };

  useEffect(() => {
    startTheServer();
    aos.init({ duration: 2000 });

    if (tabText === "contact") {
      setMenu("support");
    }

    const jwtToken = localStorage.getItem("token");
    const userName = localStorage.getItem("username");

    if (jwtToken && userName) {
      setUserName(userName);
    }
  }, []);

  const navigate = useNavigate();

  const handleTabClick = () => {
    setIsOpen(!isOpen);
    setIsOpenActive(!isOpenActive);
  };

  const handleLogout = () => {
    const loginMethod = localStorage.getItem("loginMethod");
    localStorage.clear();
    sessionStorage.clear();

    if (loginMethod === "SSO") {
      window.location.href = "http://localhost:3000"; // adjust to your SSO URL
    } else {
      navigate("/");
    }
  };

  const getButton = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (message === "Register" || message === "signup") {
      return (
        <Link to="/">
          <button>Login</button>
        </Link>
      );
    } else if (message === "login") {
      return (
        <Link to="/signup">
          <button>Register</button>
        </Link>
      );
    } else if (
      message === "modules" ||
      message === "" ||
      message === "contact"
    ) {
      return (
        <>
          <div className="user-icon-section">
            <FaUserTie className="user-icon-symbol" />
            <p className="user-name">{username || "Guest"}</p>
          </div>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </>
      );
    }

    return (
      <>
        <Link to="/">
          <button>Register</button>
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
    navigate("/sapDataModules");
  };
  const showFinanceModuleData = () => {
    setMenu("finance");
    setSapMaterialsModuleText(false);
    setSapSalesModuleText(false);
    setSapIntroText(false);
    setLoading(false);
    setHomeText(true);
    setSalesTable("");
    navigate("/sapDataModules");
  };

  const getRoute = () => {
    const token = localStorage.getItem("token");
    return token ? "/home" : "/";
  };

  return (
    <div className="header-container" data-aos="zoom-in">
      <nav
        className={
          message === "modules"
            ? "header-section-container modules-section"
            : "header-section"
        }
      >
        <div className="logo-container">
          <div>
            <Link to={getRoute()} className="website-logo">
              <img
                src="https://res.cloudinary.com/dthkbawxo/image/upload/v1750426973/dmag_n4vkpp.jpg"
                className="website-logo"
              />
            </Link>
          </div>
        </div>

        {message === "" ? (
          <div className="tabs-bar-section">
            <ul className={isOpen ? "tabs-container active1" : "tabs-container"}>
              <li>
                <a
                  href="/home"
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
              <li>
                <Link
                  to="/support"
                  onClick={() => setMenu("support")}
                  className={menu === "support" ? "active" : "tab"}
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  to="/charts"
                  onClick={() => setMenu("reports")}
                  className={menu === "reports" ? "active" : "tab"}
                >
                  Reports
                </Link>
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
          <div className="tabs-bar-section" style={{ marginRight: "200px" }}>
            <ul className={isOpen ? "tabs-container active1" : "tabs-container"}>
              <li>
                <Link
                  to="/sapDataModules"
                  onClick={showModuleData}
                  className={menu === "sales" ? "active" : "tab"}
                >
                  ORDER TO CASH
                </Link>
              </li>
              <li>
                <Link
                  to="/sapDataModules"
                  onClick={showMaterialModuleData}
                  className={menu === "materials" ? "active" : "tab"}
                >
                  PROCUREMENT
                </Link>
              </li>
              <li>
                <Link
                  to="/sapDataModules"
                  onClick={showFinanceModuleData}
                  className={menu === "finance" ? "active" : "tab"}
                >
                  FINANCE
                </Link>
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
