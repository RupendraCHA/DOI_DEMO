import React, { useContext, useState } from "react";
import "./Login.css";

// import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Login = () => {
  const { url } = useContext(StoreContext);

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
      navigate("/sapDataModules");
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

      navigate("/login");
    }
    console.log(response.data);
    // console.log(loginDetails);
  };

  return (
    <div className="login-container">
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
            <div className="login-info-section">
              <div>
                <label id="password">Password</label>
                <br />
                <input
                  type="password"
                  htmlFor="password"
                  name="password"
                  required
                  placeholder="Password*"
                  className="input"
                  onChange={getLoginData}
                />
              </div>
            </div>

            <div className="signup-button">
              <button type="submit">Login</button>
            </div>
            <div className="forgot-password">
              <span onClick={handleForgotPassword}>Forgot Password</span>
            </div>
            <div className="new-here">
              <p>
                New here ?
                <Link to="/signup" className="login-link">
                  <span>Sign Up</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
      {forgotPassword && (
        <div className="change-password-container">
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
    </div>
  );
};

export default Login;
