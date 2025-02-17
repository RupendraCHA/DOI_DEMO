import React, { useContext, useEffect } from "react";

import "./ExploreOfferings.css";
import aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const ExploreOfferings = () => {

  const {sapSalesModuleText,
    setSapSalesModuleText,
    sapMaterialsModuleText,
    setSapMaterialsModuleText,
    sapIntroText,
    setSapIntroText,
    menu,
    setMenu,
    isLoading1,
    setLoading1,
    isLoading,
    setLoading,
    setHomeText,
    setHomeText1,
    setSalesTable,} = useContext(StoreContext);
  
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  const handleOrderToCash = () => {
    setSapIntroText(false);
    setMenu("sales");
    setSapSalesModuleText(true);
    setSapMaterialsModuleText(false);
    setLoading1(false);
    setHomeText1(true);
  };

  const showMaterialModuleData = () => {
    setMenu("materials");
    setSapMaterialsModuleText(true);
    setSapSalesModuleText(false);
    setSapIntroText(false);
    setLoading(false);
    setHomeText(true);
    setSalesTable("");
  };

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
                onClick={handleOrderToCash}
              >
                <li>
                  <p>ORDER TO CASH</p>
                </li>
              </Link>
              <Link
                title="click here"
                to="/sapDataModules"
                className="data-card image2"
                onClick={showMaterialModuleData}

              >
                <li>
                  <p>PROCUREMENT</p>
                </li>
              </Link>
              <li className="data-card image3">
                <p>FINANCE</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOfferings;
