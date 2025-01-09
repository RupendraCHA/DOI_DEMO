import React, { useContext, useEffect, useState } from "react";
import "./SapDataModules.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import SalesTableData from "../../components/SalesTableData/SalesTableData";
import Spinner from "../../components/spinner/spinner";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

import aos from "aos";
import "aos/dist/aos.css";

const SapDataModules = () => {
  const { url } = useContext(StoreContext);

  const [salesTable, setSalesTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [homeText, setHomeText] = useState(true);

  useEffect(() => {
    aos.init({ duration: 2000 });
  });

  const getTableData = async (table) => {
    setHomeText(false);
    setLoading(true);
    let endpoint;

    if (table === "vbak") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "vbap") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "likp") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "lips") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "vbrk") {
      endpoint = table;
      setSalesTable(table);
    } else if (table === "vbrp") {
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
    console.log(response.data);
  };

  return (
    <>
      <div className="sales-data-modules-container" data-aos="zoom-in">
        <div className="sales-data-modules-section">
          <div className="modules-section section-one">
            <ul className="sales-section image1">
              <h3>Sales & Distibution</h3>
              <li>
                <p>Orders:</p>
                <span>
                  <button
                    className={`${salesTable === "vbak" ? "active" : ""}`}
                    onClick={() => getTableData("vbak")}
                  >
                    VBAK
                  </button>
                  <button
                    className={`${salesTable === "vbap" ? "active" : ""}`}
                    onClick={() => getTableData("vbap")}
                  >
                    VBAP
                  </button>
                </span>
              </li>
              <li>
                <p>Delivery:</p>
                <span>
                  <button
                    className={`${
                      salesTable === "likp" ? "delivery active" : "delivery"
                    }`}
                    onClick={() => getTableData("likp")}
                  >
                    LIKP
                  </button>
                  <button
                    className={`${
                      salesTable === "lips" ? "delivery active" : "delivery"
                    }`}
                    onClick={() => getTableData("lips")}
                  >
                    LIPS
                  </button>
                </span>
              </li>
              <li>
                <p>Invoice:</p>
                <span>
                  <button
                    className={`${salesTable === "vbrk" ? "active" : ""}`}
                    onClick={() => getTableData("vbrk")}
                  >
                    VBRK
                  </button>
                  <button
                    className={`${salesTable === "vbrp" ? "active" : ""}`}
                    onClick={() => getTableData("vbrp")}
                  >
                    VBRP
                  </button>
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
            {homeText && (
              <div className="archived-data-container" data-aos="zoom-in">
                <div className="data-heading">
                  <h1>View Archived Data from S4 HANA by selecting the tabs</h1>
                </div>
              </div>
            )}
            <div className="table-section">
              {isLoading && (
                <div>
                  <Spinner
                    size="40px"
                    color="#000"
                    message="Processing your request, one moment please..."
                  />
                </div>
              )}
              {salesTable === "vbak" && (
                <>
                  <ScrollToTopButton />
                  <SalesTableData
                    salesTableName={salesTable}
                    salesTableData={tableData}
                    setHomeText={setHomeText}
                    setSalesTable={setSalesTable}
                    setLoading={setLoading}
                  />
                </>
              )}
              {salesTable === "vbap" && (
                <SalesTableData
                  salesTableName={salesTable}
                  salesTableData={tableData}
                  setHomeText={setHomeText}
                  setSalesTable={setSalesTable}
                  setLoading={setLoading}
                />
              )}
              {salesTable === "likp" && (
                <SalesTableData
                  salesTableName={salesTable}
                  salesTableData={tableData}
                  setHomeText={setHomeText}
                  setSalesTable={setSalesTable}
                  setLoading={setLoading}
                />
              )}
              {salesTable === "lips" && (
                <SalesTableData
                  salesTableName={salesTable}
                  salesTableData={tableData}
                  setHomeText={setHomeText}
                  setSalesTable={setSalesTable}
                  setLoading={setLoading}
                />
              )}
              {salesTable === "vbrk" && (
                <SalesTableData
                  salesTableName={salesTable}
                  salesTableData={tableData}
                  setHomeText={setHomeText}
                  setSalesTable={setSalesTable}
                  setLoading={setLoading}
                />
              )}
              {salesTable === "vbrp" && (
                <SalesTableData
                  salesTableName={salesTable}
                  salesTableData={tableData}
                  setHomeText={setHomeText}
                  setSalesTable={setSalesTable}
                  setLoading={setLoading}
                />
              )}
              <ScrollToTopButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SapDataModules;
