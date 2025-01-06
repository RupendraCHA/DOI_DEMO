import React from "react";

import "./ExploreOfferings.css";

const ExploreOfferings = () => {
  return (
    <div className="container explore-container" id="explore-offerings">
      <div>
        <h1 className="explore-section-heading">Explore Offerings:</h1>
        <p className="sap-gui-intro">
          Accessing SAP tables via SAP GUI typically involves using transaction
          codes and navigating through the appropriate module.
          {/* Below are some
          key steps and common SAP GUI transaction codes for accessing and
          interacting with tables: */}
        </p>
        <div className="sap-gui-details">
          <div>
            <h4>View archived data for following</h4>
            <ul className="data-types">
              <li className="data-card image1">
                <p>Sales & Distribution</p>
              </li>
              <li className="data-card image2">
                <p>Material Management</p>
              </li>
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
