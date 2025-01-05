import React from "react";

import "./ExploreOfferings.css";

const ExploreOfferings = () => {
  return (
    <div className="container explore-container" id="explore-offerings">
      <div>
        <h1 className="explore-section-heading">Explore Offerings:</h1>
        <p className="sap-gui-intro">
          Accessing SAP tables via SAP GUI typically involves using transaction
          codes and navigating through the appropriate module. Below are some
          key steps and common SAP GUI transaction codes for accessing and
          interacting with tables:
        </p>
        <div className="sap-gui-details">
          <div>
            <h4>View Intutive data for following</h4>
            <ul className="data-types">
              <li className="data-card">
                <p>Sales & Distribution Data</p>
              </li>
              <li className="data-card">
                <p>Material Management Data</p>
              </li>
              <li className="data-card">
                <p>Finance Data</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOfferings;
