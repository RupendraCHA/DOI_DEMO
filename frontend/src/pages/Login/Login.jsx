import React, { useState } from "react";
import "./Login.css";

// import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const getLoginData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginDetails((loginDetails) => ({
      ...loginDetails,
      [name]: value,
    }));
  };

  const sendLoginDetails = (e) => {
    e.preventDefault();
    console.log(loginDetails);
  };

  return (
    <div className="login-container">
      <div className="container login-section">
        <form onSubmit={sendLoginDetails} className="login-section-container">
          <h1>Login</h1>

          <div className="info-section">
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
              />
            </div>
          </div>
          <div className="info-section">
            <div>
              <label id="password">Password</label>
              <br />
              <input
                type="password"
                htmlFor="password"
                name="password"
                required
                placeholder="Password*"
                onChange={getLoginData}
              />
            </div>
          </div>

          <div className="signup-button">
            <button type="submit">Login</button>
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
    </div>
  );
};

export default Login;
