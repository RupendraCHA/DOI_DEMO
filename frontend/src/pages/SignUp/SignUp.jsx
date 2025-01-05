import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="container signup-section">
        <div className="signup-section-container">
          <h1>Sign Up</h1>
          <div>
            <div>
              <label id="firstname">Firstname</label>
              <br />
              <input type="text" htmlFor="firstname" placeholder="Firstname" />
            </div>
            <div>
              <label id="lastname">Lastname</label>
              <br />
              <input type="text" htmlFor="lastname" placeholder="Lastname" />
            </div>
          </div>
          <div>
            <label id="mobile">Mobile Number</label>
            <br />
            <input type="text" htmlFor="mobile" placeholder="Mobile Number" />
          </div>
          <div>
            <label id="password">Password</label>
            <br />
            <div>
              <input type="password" placeholder="Password" />
              <input type="text" placeholder="Confirm Password" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
