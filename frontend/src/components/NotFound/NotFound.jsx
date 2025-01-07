import React from "react";
import "./NotFound.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="card-container">
      <div className="card">
        <h1>Page Not Found!!</h1>
        <p>You have give wrong address, verify it once.</p>
        <p>
          Click here to got to{" "}
          <Link className="home-link" to="/">
            <span className="">Home Page</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
