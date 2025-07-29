import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import aos from "aos";
import "aos/dist/aos.css";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const Login = () => {
    const { url, setToken, setUsername } = useContext(StoreContext);
    const [showHide, setShowHide] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        aos.init({ duration: 2000 });

        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.post(`${url}/doi/user/validateToken`, { token }, { withCredentials: true });
                    if (response.data.valid) {
                        navigate("/home");
                    } else {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                    }
                } catch (error) {
                    console.error("Token validation error:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                }
            }
        };

        checkToken();
    }, [navigate, url]);

    const getLoginData = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    };

    const sendLoginDetails = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${url}/doi/user/login`, loginDetails, {
            withCredentials: true,
        });

        if (response.data.success) {
            console.log("✅ Login Response:", response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username || response.data.name); 
            localStorage.setItem("loginMethod", "DOI");
            navigate("/home");
        } else {
            alert(response.data.message || "Login failed.");
        }
    } catch (error) {
        console.error(error);
        alert("Error during login.");
    }
};



    const handleForgotPassword = () => setForgotPassword(!forgotPassword);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/doi/user/updatePassword`, loginDetails, { withCredentials: true });

            if (response.data.success) {
                alert("Password updated successfully. Please login.");
                setForgotPassword(false);
                navigate("/");
            } else {
                alert(response.data.message || "Password update failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating password.");
        }
    };

    return (
        <div className="login-container" data-aos="zoom-in">
            {!forgotPassword ? (
                <div className="container login-section">
                    <form onSubmit={sendLoginDetails} className="login-section-container">
                        <h1>Login</h1>
                        <div className="login-info-section">
                            <div>
                                <label id="email">Email<span style={{ color: "red" }}>*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter Email address"
                                    onChange={getLoginData}
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="login-info-show-hide-section">
                            <div>
                                <label id="password" style={ {fontSize: "14px", fontWeight: "600"} }>Password<span style={{ color: "red" }}>*</span></label>
                                <div className="user-hide-show-login-container">
                                    <input
                                        type={showHide ? "password" : "text"}
                                        name="password"
                                        required
                                        placeholder="Enter Password"
                                        className="login-input"
                                        onChange={getLoginData}
                                    />
                                    {showHide ? (
                                        <BiSolidHide className="login-show-hide-icon" onClick={() => setShowHide(!showHide)} />
                                    ) : (
                                        <BiSolidShow className="login-show-hide-icon" onClick={() => setShowHide(!showHide)} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Register-button">
                            <button type="submit">Login</button>
                        </div>
                        <div className="login-bottom-links">
    <div className="new-here">
        <p>
            New here? <Link to="/signup" className="login-link"><span>Register</span></Link>
        </p>
    </div>
    <div className="forgot-password">
        <span onClick={handleForgotPassword}>Forgot Password</span>
    </div>
</div>

                    </form>
                </div>
            ) : (
                <div className="change-password-container" data-aos="zoom-in">
                    <h1>Update Your Password</h1>
                    <form onSubmit={handleUpdatePassword} className="change-password-card">
                        <div>
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="change-password"
                                onChange={getLoginData}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">New Password</label>
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
                        <button type="submit" id="update-password-button">Update Password</button>
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
