import React, { useContext, useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "./SignUp.css";
import { StoreContext } from "../../context/StoreContext";

import aos from "aos";
import "aos/dist/aos.css";

const SignUp = () => {
  const { url } = useContext(StoreContext);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isClickedRegister, setRegisterClick] = useState(false);
  const [otp, setOtp] = useState("");
  const [userCode, setUserCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeErrorText, setCodeErrorText] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerErrorBool, setRegisterErrorBool] = useState(false);

  useEffect(() => {
    aos.init({ duration: 2000 });
  });

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setRegisterErrorBool(false);
    const name = e.target.name;
    const value = e.target.value;

    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const submitUserData = async (e) => {
    // setRegisterClick(true);
    setRegisterErrorBool(false);

    e.preventDefault();
    // console.log(userData);

    const response = await axios.post(url + "/doi/user/register", userData);
    // console.log(response.data);

    if (response.data.success === true) {
      setRegisterClick(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.userName);
      setOtp(response.data.verificationCode);
      // navigate("/login");
      // console.log(response.data);
    } else {
      setRegisterErrorBool(true);
      setRegisterError(response.data.message);
    }
  };

  const storeVerificationCode = (e) => {
    setCodeError(false);

    if (e.target.value === "") {
      setCodeErrorText("Enter Verification Code Sent to your mail...");
      setCodeError(true);
    } else {
      setUserCode(e.target.value);
    }
  };

  const handleEmailVerification = async (userCode) => {
    try {
      if (userCode === "" || userCode !== otp) {
        setCodeErrorText("Enter Correct Code Sent to your mail...");
        setCodeError(true);
      } else {
        const response = await axios.post(url + "/doi/user/verifyEmail", {
          userCode,
        });
        if (response.data.success === true) {
          console.log(response.data);
          setCodeError(false);
          navigate("/login");
        } else {
          setCodeErrorText(response.data.message);
          setCodeError(true);
        }
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="signup-container" data-aos="zoom-in">
      {!isClickedRegister && (
        <div className="container signup-section">
          <form onSubmit={submitUserData} className="signup-section-container">
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
                  name="firstname"
                  onChange={handleUserInput}
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
                  name="lastname"
                  onChange={handleUserInput}
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
                  name="mobileNumber"
                  onChange={handleUserInput}
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
                  name="email"
                  onChange={handleUserInput}
                />
              </div>
            </div>
            <div className="password-info-section">
              <div>
                <label id="password">Password</label>
                <br />
                <div className="password-hide-and-show">
                  <input
                    type="password"
                    htmlFor="password"
                    required
                    placeholder="Password*"
                    name="password"
                    onChange={handleUserInput}
                    className="hide-unhide-password"
                    style={{ border: "none" }}
                  />
                  <BiSolidShow />
                </div>
              </div>
              <div>
                <label id="confirm">Confirm</label>
                <br />
                <div className="password-hide-and-show">
                  <input
                    type="password"
                    htmlFor="confirm"
                    required
                    placeholder="Confirm Password*"
                    name="confirmPassword"
                    onChange={handleUserInput}
                    className="hide-unhide-password"
                    style={{ border: "none" }}
                  />
                  <BiSolidShow />
                </div>
              </div>
            </div>
            <div className="pass-requirement">
              <BsFillInfoCircleFill className="info-icon" />
              <p>Password must be atleast 8 characters.</p>
            </div>
            {registerErrorBool === true ? (
              <p className="error-msg">
                <span>{registerError}</span>
              </p>
            ) : (
              ""
            )}
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
      )}
      {isClickedRegister && (
        <div className="verify-card-container">
          <div className="verify-card">
            <div>
              Hey, {userData.firstname} {userData.lastname}
            </div>
            <h1>
              Code has been sent to your email address, Verify Your Email
              Address by entering it below
            </h1>
            <input
              type="text"
              placeholder="Enter your verification code"
              onChange={storeVerificationCode}
            />
            {codeError && <p className="code-error">*Enter Correct Code</p>}
            <button onClick={() => handleEmailVerification(userCode)}>
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
