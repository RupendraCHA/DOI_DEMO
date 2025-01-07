import React, { useContext, useEffect, useState } from "react";
import "./SapDataModules.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import SalesTableData from "../../components/SalesTableData/SalesTableData";
import Spinner from "../../components/spinner/spinner";

const SapDataModules = () => {
  const { url } = useContext(StoreContext);

  const [salesTable, setSalesTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getVbakTableData = async (table) => {
    setLoading(true);
    let endpoint;

    if (table === "vbak") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "vbap") {
      endpoint = table;
      setSalesTable(table);
    }
    const response = await axios.get(url + `/doi/sales/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      setLoading(false);
      setTableData(response.data.data);
    }
    console.log(response.data.data);
  };

  // useEffect(() => {
  //   getVbakTableData("vbak");
  // }, []);
  return (
    <div className="sales-data-modules-container">
      <div className="sales-data-modules-section">
        <div className="modules-section section-one">
          <ul className="sales-section image1">
            <h3>Sales & Distibution</h3>
            <li>
              <p>Orders:</p>
              <span>
                <button
                  className={`${salesTable === "vbak" ? "active" : ""}`}
                  onClick={() => getVbakTableData("vbak")}
                >
                  VBAK
                </button>
                <button
                  className={`${salesTable === "vbap" ? "active" : ""}`}
                  onClick={() => getVbakTableData("vbap")}
                >
                  VBAP
                </button>
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
          <div className="table-section">
            {isLoading && (
              <div>
                <Spinner
                  size="80px"
                  color="#ff6347"
                  message="Please wait, Data is Lading..."
                />
              </div>
            )}
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