import React from "react";
import "./SapDataModules.css";

const SapDataModules = () => {
  return (
    <div className="sales-data-modules-container">
      <div className="sales-data-modules-section">
        <div className="modules-section section-one">
          <ul className="sales-section image1">
            <h3>Sales & Distibution</h3>
            <li>
              <p>Orders:</p>
              <span>
                <button>VBAK</button>
                <button>VBAP</button>
              </span>
            </li>
            <li>
              <p>Delivery:</p>
              <span>
                <button className="delivery">LIKP</button>
                <button className="delivery">LIPS</button>
              </span>
            </li>
            <li>
              <p>Invoice:</p>
              <span>
                <button>VBRK</button>
                <button>VBRP</button>
              </span>
            </li>
          </ul>
          <ul className="material-section">
            <h3>Material Management</h3>
          </ul>
          <ul className="finance-section">
            <h3>Finance</h3>
          </ul>
        </div>
        <div className="modules-section section-two">2</div>
      </div>
    </div>
  );
};

export default SapDataModules;
