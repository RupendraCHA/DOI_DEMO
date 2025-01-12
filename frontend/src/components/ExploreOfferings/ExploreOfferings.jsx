import React, { useEffect } from "react";

import "./ExploreOfferings.css";
import aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const ExploreOfferings = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="container explore-container"
      id="explore-offerings"
      data-aos="fade-down"
    >
      <div>
        <h1 className="explore-section-heading">S4 HANA ARCHIVED DATA</h1>
        <p className="sap-gui-intro">
          Accessing SAP tables via SAP GUI typically involves using transaction
          codes and navigating through the appropriate module.
        </p>
        <div className="sap-gui-details">
          <div>
            <ul className="data-types">
              <Link
                title="click here"
                to="/sapDataModules"
                className="data-card image1"
              >
                <li>
                  <p>Order To Cash</p>
                </li>
              </Link>
              <Link
                title="click here"
                to="/sapDataModules"
                className="data-card image2"
              >
                <li>
                  <p>Procurment</p>
                </li>
              </Link>
              <li className="data-card image3">
                <p>Finance</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOfferings;
