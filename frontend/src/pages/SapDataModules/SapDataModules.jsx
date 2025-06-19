import React, { useContext, useEffect, useState } from "react";
import "./SapDataModules.css";

import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import SalesTableData from "../../components/SalesTableData/SalesTableData";
import FinanceTableData from "../../components/FinanceTableData/financeTableData.jsx";
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
    loadFinance,
    setLoadFinance,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [isTabactive, setIstabActive] = useState(false);
  const [procurementTable, setProcurementTable] = useState(false);

  useEffect(() => {
    aos.init({ duration: 2000 });
    setSapIntroText(true);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/sapDataModules");
    } else {
      navigate("/login");
    }
    setTimeout(() => {
      navigate("/login");
    }, 8640000);
  }, []);

  // Reset states when navigating to Finance module
  useEffect(() => {
    if (menu === "finance") {
      handleFinanceIntro();
    }
  }, [menu]);

  // Reset states when navigating to OTC module
  useEffect(() => {
    if (sapSalesModuleText) {
      setHomeText(true);       // Show OTC background image
      setLoadOTC(false);       // Hide OTC table
      setLoadFinance(false);   // Hide Finance table
      setLoadProcurement(false); // Hide Procurement table
      setTableData([]);        // Clear table data
      setSalesTable("");       // Clear selected table
    }
  }, [sapSalesModuleText]);

  // Reset states when navigating to Procurement module
  useEffect(() => {
    if (sapMaterialsModuleText) {
      setHomeText1(true);      // Show Procurement background image
      setLoadProcurement(false); // Hide Procurement table
      setLoadOTC(false);       // Hide OTC table
      setLoadFinance(false);   // Hide Finance table
      setTableData([]);        // Clear table data
      setSalesTable("");       // Clear selected table
    }
  }, [sapMaterialsModuleText]);

  const getTableData = async (table) => {
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
    setSalesTable(table);
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

    const response = await axios.get(url + `/doi/procurement/${endpoint1}`);

    if (response.data.success) {
      setLoading1(false);
      setLoadProcurement(true);
      setTableData(response.data.data);
      console.log(response.data.data);
    }
  };

  const getFinanceTablesData = async (table) => {
    setSalesTable(table);
    setLoadProcurement(false);
    setLoadOTC(false);
    setHomeText(false);
    setHomeText1(false); // Ensure Procurement background is hidden
    setLoading(true);
    setLoading1(false);

    let endpoint2;
    if (table === "general_ledger") {
      endpoint2 = "gl";
      setSalesTable(table);
    } else if (table === "accounts_payable") {
      endpoint2 = "ap";
      setSalesTable(table);
    } else if (table === "accounts_receivable") {
      endpoint2 = "ar";
      setSalesTable(table);
    }

    try {
      const response = await axios.get(url + `/doi/finance/${endpoint2}`);
      if (response.data.success) {
        setLoading(false);
        setLoadFinance(true);
        setTableData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching finance data:", error);
      setLoading(false);
    }
  };

  // Handler to show only the finance intro page (no table)
  const handleFinanceIntro = () => {
    setMenu("finance");
    setHomeText(true);
    setLoadFinance(false); // Hide the table
    setTableData([]);      // Clear table data
    setSalesTable("");     // Clear selected table
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
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "likp" ? "active-button" : ""}`}
                      onClick={() => getTableData("likp")}
                    >
                      DELIVERY
                    </button>
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "vbrk" ? "active-button" : ""}`}
                      onClick={() => getTableData("vbrk")}
                    >
                      BILLING
                    </button>
                  </li>
                </ul>
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
                        color="#00308F"
                        message="Processing your request, one moment please..."
                      />
                    </div>
                  )}
                  {loadOTC && (
                    <>
                      {salesTable === "vbak" && (
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
                  <ScrollToTopButton />
                </div>
              </div>
            </>
          )}
          {!sapSalesModuleText && sapMaterialsModuleText && (
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
                        color="#00308F"
                        message="Processing your request, one moment please..."
                      />
                    </div>
                  )}
                  {loadProcurement && (
                    <>
                      {salesTable === "ekko" && (
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
                      )}
                    </>
                  )}
                  {loadProcurement && (
                    <>
                      {salesTable === "ekpo" && (
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
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {!sapSalesModuleText && !sapMaterialsModuleText && menu === "finance" && (
            <>
              <div className="modules-section section-one" data-aos="fade-down">
                <ul className="sales-section image1">
                  <li>
                    <button
                      id={`${salesTable === "general_ledger" ? "active-button" : ""}`}
                      onClick={() => getFinanceTablesData("general_ledger")}
                    >
                      General Ledger
                    </button>
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "accounts_payable" ? "active-button" : ""}`}
                      onClick={() => getFinanceTablesData("accounts_payable")}
                    >
                      Accounts Payable
                    </button>
                  </li>
                  <li>
                    <button
                      id={`${salesTable === "accounts_receivable" ? "active-button" : ""}`}
                      onClick={() => getFinanceTablesData("accounts_receivable")}
                    >
                      Accounts Receivable
                    </button>
                  </li>
                </ul>
              </div>
              <div className="modules-section section-two">
                {homeText && (
                  <div className="finance-data-container" data-aos="zoom-in">
                    <div className="finance-data-heading">
                      <h1>
                        View Archived FINANCE Data from S4 HANA by selecting one of the tabs above
                      </h1>
                    </div>
                  </div>
                )}
                <div className="table-section">
                  {isLoading && (
                    <div>
                      <Spinner
                        size="45px"
                        color="#00308F"
                        message="Processing your request, one moment please..."
                      />
                    </div>
                  )}
                  {!isLoading && loadFinance && (
                    <FinanceTableData
                      financeTableName={salesTable}
                      financeTableData={tableData}
                      setHomeText={setHomeText}
                      setSalesTable={setSalesTable}
                      setLoading={setLoading}
                      setTableData={setTableData}
                    />
                  )}
                </div>
              </div>
            </>
          )}
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
};

export default SapDataModules;