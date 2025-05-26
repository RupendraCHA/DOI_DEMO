import React, { useContext, useEffect, useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

import aos from "aos";
import "aos/dist/aos.css";

import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const Login = () => {
  const { url } = useContext(StoreContext);

  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  const [showHide, setShowHide] = useState(true);

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotPassword, setForgotPassword] = useState(false);

  const getLoginData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginDetails((loginDetails) => ({
      ...loginDetails,
      [name]: value,
    }));
  };

  const sendLoginDetails = async (e) => {
    e.preventDefault();
    const response = await axios.post(url + "/doi/user/login", loginDetails);
    console.log(response.data);
    if (response.data.success === true) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.name);
      navigate("/home");
    } else {
      console.log(response.data);
    }
    console.log(loginDetails);
  };

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      url + "/doi/user/updatePassword",
      loginDetails
    );

    if (response.data.success) {
      setForgotPassword(!forgotPassword);

      navigate("/");
    }
    console.log(response.data);
    // console.log(loginDetails);
  };

  const setShowHidePassword = () => {
    setShowHide(!showHide);
  };

  return (
    <div className="login-container" data-aos="zoom-in">
      {!forgotPassword && (
        <div className="container login-section">
          <form onSubmit={sendLoginDetails} className="login-section-container">
            <h1>Login</h1>

            <div className="login-info-section">
              <div>
                <label id="email">Email</label>
                <br />
                <input
                  type="text"
                  htmlFor="email"
                  name="email"
                  required
                  placeholder="Email*"
                  onChange={getLoginData}
                  className="input"
                />
              </div>
            </div>
            <div className="login-info-show-hide-section">
              <div>
                <label id="password"
                    style={{fontWeight: "600"}}
                
                >Password</label>
                <br />
                <div className="user-hide-show-login-container">
                  <input
                    type={showHide === true ? "password" : "type"}
                    htmlFor="password"
                    name="password"
                    required
                    placeholder="Password*"
                    className="login-input"
                    onChange={getLoginData}
                  />
                  {showHide === true ? (
                    <BiSolidHide
                      className="login-show-hide-icon"
                      onClick={setShowHidePassword}
                    />
                  ) : (
                    <BiSolidShow
                      className="login-show-hide-icon"
                      onClick={setShowHidePassword}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="Register-button">
              <button type="submit">Login</button>
            </div>
            <div className="forgot-password">
              <span onClick={handleForgotPassword}>Forgot Password</span>
            </div>
            <div className="new-here">
              <p>
                New here ?
                <Link to="/signup" className="login-link">
                  <span>Register</span>
                </Link>
              </p>
            </div>
          </form>
          {/* <a href="https://ap-south-1nmrg96rqu.auth.ap-south-1.amazoncognito.com/login?client_id=1esfsaanp9ncgms41753687pd8&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdoi-demo-52o9.onrender.com%2Fhome">
            Sign In Using Cognito
          </a> */}
        </div>
      )}
      {forgotPassword && (
        <div className="change-password-container" data-aos="zoom-in">
          <h1>Update Your Password</h1>
          <form
            onSubmit={handleUpdatePassword}
            className="change-password-card"
          >
            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                required
                className="change-password"
                onChange={getLoginData}
              />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                required
                className="change-password"
                onChange={getLoginData}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                className="change-password"
                onChange={getLoginData}
              />
            </div>
            <button type="submit" id="update-password-button">
              Update Password
            </button>
            <div className="go-to-login">
              <span onClick={handleForgotPassword}>Go to Login</span>
            </div>
          </form>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default Login;
