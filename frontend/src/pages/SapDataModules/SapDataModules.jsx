import React, { useContext, useState } from "react";
import "./SapDataModules.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import SalesTableData from "../../components/SalesTableData/SalesTableData";

const SapDataModules = () => {
  const { url } = useContext(StoreContext);

  const [salesTable, setSalesTable] = useState("");
  const [tableData, setTableData] = useState([]);

  const getVbakTableData = async (table) => {
    let endpoint;

    if (table === "vbak") {
      endpoint = table;
      setSalesTable(table);
    }
    const response = await axios.get(url + `/doi/sales/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTableData(response.data.data);
    console.log(response.data.data);
  };
  return (
    <div className="sales-data-modules-container">
      <div className="sales-data-modules-section">
        <div className="modules-section section-one">
          <ul className="sales-section image1">
            <h3>Sales & Distibution</h3>
            <li>
              <p>Orders:</p>
              <span>
                <button onClick={() => getVbakTableData("vbak")}>VBAK</button>
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
        <div className="modules-section section-two">
          <div>
            {salesTable === "vbak" && (
              <SalesTableData
                salesTableName={salesTable}
                salesTableData={tableData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapDataModules;
