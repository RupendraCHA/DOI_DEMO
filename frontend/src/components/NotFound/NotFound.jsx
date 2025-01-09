import React, { useEffect } from "react";
import "./NotFound.css";
import aos from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  });
  return (
    <div className="card-container" data-aos="fade-up">
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
