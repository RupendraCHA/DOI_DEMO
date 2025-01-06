import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="container signup-section">
        <form className="signup-section-container">
          <h1>Sign Up</h1>
          <div className="info-section">
            <div>
              <label id="firstname">Firstname</label>
              <br />
              <input
                type="text"
                htmlFor="firstname"
                required
                placeholder="Firstname*"
              />
            </div>
            <div>
              <label id="lastname">Lastname</label>
              <br />
              <input
                type="text"
                htmlFor="lastname"
                required
                placeholder="Lastname*"
              />
            </div>
          </div>
          <div className="info-section">
            <div>
              <label id="mobile">Mobile Number</label>
              <br />
              <input
                type="text"
                htmlFor="mobile"
                required
                placeholder="Mobile Number*"
              />
            </div>
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
            <div>
              <label id="confirm">Confirm</label>
              <br />
              <input
                type="password"
                htmlFor="confirm"
                required
                placeholder="Confirm Password*"
              />
            </div>
          </div>
          <div className="pass-requirement">
            <BsFillInfoCircleFill className="info-icon" />
            <p>Password must be atleast 8 characters.</p>
          </div>
          <div className="signup-button">
            <button type="submit">Sign Up</button>
          </div>
          <div className="have-account">
            <p>
              Already have an account ?
              <Link to="/login" className="login-link">
                <span>Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
