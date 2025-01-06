import React from "react";
import "./Login.css";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="container login-section">
        <form className="login-section-container">
          <h1>Login</h1>

          <div className="info-section">
            <div>
              <label id="email">Email</label>
              <br />
              <input
                type="text"
                htmlFor="email"
                required
                placeholder="Email*"
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
                required
                placeholder="Password*"
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
