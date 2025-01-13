import React, { useContext, useEffect, useState } from "react";
import "./SapDataModules.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import SalesTableData from "../../components/SalesTableData/SalesTableData";
import Spinner from "../../components/spinner/spinner";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

import aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const SapDataModules = () => {
  const {
    url,
    token,
    username,
    sapSalesModuleText,
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
    salesTable,
    setSalesTable,
    homeText,
    setHomeText,
    setHomeText1,
    homeText1,
    loadOTC,
    setLoadOTC,
    loadProcurement,
    setLoadProcurement,
  } = useContext(StoreContext);
  // console.log(sapSalesModuleText);
  const navigate = useNavigate();

  // const [salesTable, setSalesTable] = useState("");
  const [tableData, setTableData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [isLoading1, setLoading1] = useState(false);
  // const [homeText, setHomeText] = useState(true);
  // const [homeText1, setHomeText1] = useState(true);
  const [isTabactive, setIstabActive] = useState(false);
  const [procurementTable, setProcurementTable] = useState(false);

  useEffect(() => {
    aos.init({ duration: 2000 });
    setSapIntroText(true);
    // setSapSalesModuleText(false);
    // setSapMaterialsModuleText(false);
    setTimeout(() => {
      navigate("/login");
    }, 8640000);
  }, []);

  const getTableData = async (table) => {
    // setSapMaterialsModuleText(false);
    setSalesTable("");
    setLoadOTC(false);
    setSapIntroText(false);

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
      setLoadOTC(true);
      setLoading(false);
      setTableData(response.data.data);
      setSapIntroText(false);
    }
    console.log(response.data);
  };

  const getProcurementTablesData = async (table) => {
    // setProcurementTable(table);
    setSalesTable(table);
    console.log(table);
    setLoadProcurement(false);

    setHomeText1(false);
    setLoading1(true);

    let endpoint1;

    if (table === "ekko") {
      endpoint1 = table;
      setSalesTable(table);
    } else if (table === "ekpo") {
      endpoint1 = table;
      setSalesTable(table);
    }
    console.log(endpoint1);

    const response = await axios.get(url + `/doi/procurement/${endpoint1}`);

    if (response.data.success) {
      setLoading1(false);
      setLoadProcurement(true);
      setTableData(response.data.data);
      console.log(response.data.data);
    }
  };

  const handleIntroSection = () => {
    setMenu("intro");
    setSapIntroText(true);
    setSapSalesModuleText(false);
    setSapMaterialsModuleText(false);
    setLoading(false);
    setLoading1(false);
    setHomeText(true);
    setHomeText1(true);
    setSalesTable("");
  };
  return (
    <>
      <div className="sales-data-modules-container" data-aos="zoom-in">
        <div className="sales-data-modules-section">
          {sapIntroText && (
            <div className="module-intro-container" data-aos="zoom-in">
              <div className="data-header-section">
                <h1>
                  View Archived Data from S4 HANA by selecting the options above
                </h1>
              </div>
            </div>
          )}
          {sapSalesModuleText && (
            <>
              <div className="modules-section section-one" data-aos="fade-down">
                <ul className="sales-section image1">
                  <li>
                    <button
                      id={`${salesTable === "vbak" ? "active-button" : ""}`}
                      onClick={() => getTableData("vbak")}
                    >
                      ORDERS
                    </button>
                    {/* <span>
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
                </span> */}
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "likp" ? "active-button" : ""}`}
                      onClick={() => getTableData("likp")}
                    >
                      DELIVERY
                    </button>
                    {/* <span>
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
                </span> */}
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "vbrk" ? "active-button" : ""}`}
                      onClick={() => getTableData("vbrk")}
                    >
                      BILLING
                    </button>
                    {/* <span>
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
                </span> */}
                  </li>
                </ul>
                <div className="intro-back-button-container">
                  <button
                    className="intro-back-button"
                    onClick={handleIntroSection}
                  >
                    Back
                  </button>
                </div>
                {/* <ul className="material-section">
              <h3>Material Management</h3>
            </ul>
            <ul className="finance-section">
              <h3>Finance</h3>
            </ul> */}
              </div>
              <div className="modules-section section-two">
                {homeText && (
                  <div className="archived-data-container" data-aos="zoom-in">
                    <div className="data-heading">
                      <h1>
                        View Archived ORDER TO CASH Data from S4 HANA by
                        selecting one of the tabs above
                      </h1>
                    </div>
                  </div>
                )}
                <div className="table-section">
                  {isLoading && (
                    <div>
                      <Spinner
                        size="45px"
                        // color="#000"
                        color="#00308F"
                        message="Processing your request, one moment please..."
                      />
                    </div>
                  )}
                  {loadOTC && (
                    <>
                      {salesTable === "vbak" && (
                        <>
                          <SalesTableData
                            salesTableName={salesTable}
                            salesTableData={tableData}
                            setHomeText={setHomeText}
                            setHomeText1={setHomeText1}
                            setSalesTable={setSalesTable}
                            setLoading={setLoading}
                            setTableData={setTableData}
                            getTableData={getTableData}
                          />
                        </>
                      )}
                    </>
                  )}
                  {loadOTC && (
                    <>
                      {salesTable === "likp" && (
                        <SalesTableData
                          salesTableName={salesTable}
                          salesTableData={tableData}
                          setHomeText={setHomeText}
                          setSalesTable={setSalesTable}
                          setLoading={setLoading}
                          setTableData={setTableData}
                          setHomeText1={setHomeText1}
                        />
                      )}
                    </>
                  )}
                  {loadOTC && (
                    <>
                      {salesTable === "vbrk" && (
                        <SalesTableData
                          salesTableName={salesTable}
                          salesTableData={tableData}
                          setHomeText={setHomeText}
                          setSalesTable={setSalesTable}
                          setLoading={setLoading}
                          setTableData={setTableData}
                          setHomeText1={setHomeText1}
                        />
                      )}
                    </>
                  )}
                  {/* {salesTable === "vbap" && (
                    <SalesTableData
                      salesTableName={salesTable}
                      salesTableData={tableData}
                      setHomeText={setHomeText}
                      setSalesTable={setSalesTable}
                      setLoading={setLoading}
                      setTableData={setTableData}
                    />
                  )}
                  
                  {salesTable === "lips" && (
                    <SalesTableData
                      salesTableName={salesTable}
                      salesTableData={tableData}
                      setHomeText={setHomeText}
                      setSalesTable={setSalesTable}
                      setLoading={setLoading}
                      setTableData={setTableData}
                    />
                  )}
                  
                  {salesTable === "vbrp" && (
                    <SalesTableData
                      salesTableName={salesTable}
                      salesTableData={tableData}
                      setHomeText={setHomeText}
                      setSalesTable={setSalesTable}
                      setLoading={setLoading}
                      setTableData={setTableData}
                    />
                  )} */}
                  <ScrollToTopButton />
                </div>
              </div>
            </>
          )}
          {sapMaterialsModuleText && (
            <>
              <div className="modules-section section-one" data-aos="fade-down">
                <ul className="sales-section image1">
                  <li>
                    <button
                      id={`${salesTable === "ekko" ? "active-button" : ""}`}
                      onClick={() => getProcurementTablesData("ekko")}
                    >
                      Header Information
                    </button>
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "ekpo" ? "active-button" : ""}`}
                      onClick={() => getProcurementTablesData("ekpo")}
                    >
                      Item Information
                    </button>
                  </li>
                </ul>
                <div className="intro-back-button-container">
                  <button
                    className="intro-back-button"
                    onClick={handleIntroSection}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="modules-section section-two">
                {homeText1 && (
                  <div
                    className="procurement-data-container"
                    data-aos="zoom-in"
                  >
                    <div className="procurement-data-heading">
                      <h1>
                        View Archived PROCUREMENT Data from S4 HANA by selecting
                        one of the tabs above
                      </h1>
                    </div>
                  </div>
                )}
                <div className="table-section">
                  {isLoading1 && (
                    <div>
                      <Spinner
                        size="45px"
                        // color="#000"
                        color="#00308F"
                        message="Processing your request, one moment please..."
                      />
                    </div>
                  )}
                  {loadProcurement && (
                    <>
                      {salesTable === "ekko" && (
                        <>
                          <SalesTableData
                            salesTableName={salesTable}
                            salesTableData={tableData}
                            setHomeText={setHomeText}
                            setSalesTable={setSalesTable}
                            setLoading={setLoading}
                            setTableData={setTableData}
                            getTableData={getTableData}
                            setHomeText1={setHomeText1}
                          />
                        </>
                      )}
                    </>
                  )}
                  {loadProcurement && (
                    <>
                      {salesTable === "ekpo" && (
                        <>
                          <SalesTableData
                            salesTableName={salesTable}
                            salesTableData={tableData}
                            setHomeText={setHomeText}
                            setSalesTable={setSalesTable}
                            setLoading={setLoading}
                            setTableData={setTableData}
                            getTableData={getTableData}
                            setHomeText1={setHomeText1}
                          />
                        </>
                      )}
                    </>
                  )}
                  <ScrollToTopButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SapDataModules;
