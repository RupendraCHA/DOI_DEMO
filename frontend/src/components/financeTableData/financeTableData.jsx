import React, { useContext, useState, useEffect } from "react";
import "./FinanceTableData.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { IoSearch } from "react-icons/io5";
import Spinner from "../spinner/spinner";

const FinanceTableData = ({ financeTableName, financeTableData, setHomeText, setSalesTable, setLoading, setTableData }) => {
  const { url } = useContext(StoreContext);
  const [documentNum, setDocumentNum] = useState("");
  const [searchType, setSearchType] = useState("Document");
  const [startingDate, setStartingDate] = useState("20230401"); // Default: April 1, 2023
  const [endingDate, setEndingDate] = useState("20250606"); // Default: Today, June 6, 2025
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showItemData, setShowItemData] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50); // 50 records per page
  const [totalRecords, setTotalRecords] = useState(0); // Store total records from backend

  const showLoading = (message) => {
    setIsLoading(true);
    setLoadingMessage(message);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage("");
  };

  // Fetch initial data on component mount or when financeTableName changes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const endpoint = financeTableName === "general_ledger" ? "gl" : financeTableName === "accounts_payable" ? "ap" : "ar";
        const response = await axios.get(
          `${url}/doi/finance/${endpoint}?start=${startingDate}&end=${endingDate}&page=${currentPage}&limit=${recordsPerPage}`
        );
        if (response.data.success) {
          setTableData(response.data.data);
          setTotalRecords(response.data.data.length); // Adjust based on backend response; ideally, backend should return pagination metadata
          if (response.data.data.length === 0) {
            alert("No records found for the default date range");
          }
        } else {
          throw new Error(response.data.message || `Failed to fetch ${financeTableName} data`);
        }
      } catch (error) {
        console.error(`Error fetching ${financeTableName} data:`, error);
        alert(error.response?.data?.message || error.message || `Error fetching ${financeTableName} data`);
      } finally {
        hideLoading();
      }
    };

    fetchInitialData();
  }, [financeTableName, url, setTableData, currentPage, recordsPerPage, startingDate, endingDate]);

  const getSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const getDateFormat = (date) => {
    if (!date) return "-";
    try {
      const dateString = date.replace(/-/g, "");
      if (!/^\d{8}$/.test(dateString)) {
        return "-";
      }
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  const formatDateForAPI = (dateString) => {
    try {
      return dateString.replace(/-/g, "");
    } catch (error) {
      console.error("Error formatting date for API:", error);
      return "";
    }
  };

  const getDocumentDetails = async (docNumber) => {
    if (searchType === "Document") {
      setShowItemData(false);
      setDocumentNum(docNumber);

      try {
        const endpoint = financeTableName === "general_ledger" ? "gl" : financeTableName === "accounts_payable" ? "ap" : "ar";
        const response = await axios.get(`${url}/doi/finance/${endpoint}?docNumber=${docNumber}`);
        if (response.data.success) {
          setItemData(response.data.data);
          setShowItemData(true);
        } else {
          throw new Error(response.data.message || `Failed to fetch ${financeTableName} document details`);
        }
      } catch (error) {
        console.error(`Error fetching ${financeTableName} document details:`, error);
        alert(error.response?.data?.message || error.message || `Error fetching ${financeTableName} document details`);
      } finally {
        hideLoading();
      }
    }
  };

  const hideItemTable = () => {
    setShowItemData(false);
  };

  const getDataBetweenDates = async () => {
    if (searchType === "Date" && startingDate && endingDate) {
      if (new Date(endingDate) < new Date(startingDate)) {
        alert("End date must be after start date");
        return;
      }

      showLoading("Fetching data between dates...");
      setShowItemData(false);
      setCurrentPage(1); // Reset to first page when searching by date

      try {
        const endpoint = financeTableName === "general_ledger" ? "gl" : financeTableName === "accounts_payable" ? "ap" : "ar";
        const response = await axios.get(
          `${url}/doi/finance/${endpoint}?start=${startingDate}&end=${endingDate}&page=${currentPage}&limit=${recordsPerPage}`
        );
        if (response.data.success) {
          setTableData(response.data.data);
          setTotalRecords(response.data.data.length); // Adjust based on backend response
          if (response.data.data.length === 0) {
            alert("No records found for the selected date range");
          }
        } else {
          throw new Error(response.data.message || "Failed to fetch data for date range");
        }
      } catch (error) {
        console.error("Error fetching data by date range:", error);
        alert(error.response?.data?.message || error.message || "Error fetching data for date range");
      } finally {
        hideLoading();
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="finance-table-container">
      {isLoading && (
        <div className="loading-overlay">
          <Spinner
            size="45px"
            color="#00308F"
            message={loadingMessage || "Processing your request, one moment please..."}
          />
        </div>
      )}

      <div className="search-box-container">
        <div className="search-type-container">
          <div className="process-button">
            <input
              type="radio"
              id="select1"
              className="radio-button"
              name="process"
              value="Document"
              checked={searchType === "Document"}
              onChange={getSearchType}
            />
            <div>
              <h4>Get Finance Document Details</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Document Number"
                  className="doc-input"
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getDocumentDetails(documentNum)}
                />
              </span>
            </div>
          </div>
          <div className="process-button">
            <input
              type="radio"
              id="select2"
              name="process"
              value="Date"
              checked={searchType === "Date"}
              className="radio-button"
              onChange={getSearchType}
            />
            <div>
              <div className="date-fields-container">
                <div className="from-date-section">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    htmlFor="fromDate"
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) => setStartingDate(formatDateForAPI(e.target.value))}
                  />
                </div>
                <div className="to-date-section">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    htmlFor="toDate"
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) => setEndingDate(formatDateForAPI(e.target.value))}
                  />
                </div>
                <IoSearch
                  className="doc-search-icon date-search-icon"
                  onClick={getDataBetweenDates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showItemData && (
        <div className="item-table-container">
          <div className="item-table-section">
            <h3 className="finance-doc-heading">
              {financeTableName === "general_ledger"
                ? "General Ledger Document Details"
                : financeTableName === "accounts_payable"
                ? "Accounts Payable Document Details"
                : "Accounts Receivable Document Details"}
            </h3>
            <div className="item-doc-details">
              Document Details for Number - <span>{documentNum}</span>
            </div>
            <div className="table-scroll-container">
              <table>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Ledger</th>
                    <th className="header-cell">Document Number</th>
                    <th className="header-cell">Company Code</th>
                    <th className="header-cell">Fiscal Year</th>
                    <th className="header-cell">Line Item</th>
                    <th className="header-cell">Account</th>
                    <th className="header-cell">Debit/Credit</th>
                    <th className="header-cell">Posting Date</th>
                    <th className="header-cell">Document Date</th>
                    <th className="header-cell">Document Type</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.RLDNR}</td>
                      <td>{record.BELNR}</td>
                      <td>{record.RBUKRS}</td>
                      <td>{record.GJAHR}</td>
                      <td>{record.DOCLN}</td>
                      <td>{record.RACCT}</td>
                      <td>{record.DRCRK}</td>
                      <td>{getDateFormat(record.BUDAT)}</td>
                      <td>{getDateFormat(record.BLDAT)}</td>
                      <td>{record.BLART}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="close-item-data-button" onClick={hideItemTable}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <>
        <h4>
          {financeTableName === "general_ledger"
            ? "General Ledger"
            : financeTableName === "accounts_payable"
            ? "Accounts Payable"
            : "Accounts Receivable"}{" "}
          Table
          {searchType === "Document" && (
            <span>
              {financeTableData.length > 0
                ? ` - ${totalRecords} total records`
                : ""}
            </span>
          )}
          <span>
            {searchType === "Date"
              ? ` from ${getDateFormat(startingDate)} To ${getDateFormat(
                  endingDate
                )} - ${totalRecords} total records`
              : ""}
          </span>
        </h4>
        <div className="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th className="header-cell">S.No</th>
                <th className="header-cell">Ledger</th>
                <th className="header-cell">Document Number</th>
                <th className="header-cell">Company Code</th>
                <th className="header-cell">Fiscal Year</th>
                <th className="header-cell">Posting Date</th>
                <th className="header-cell">Document Date</th>
                <th className="header-cell">Document Type</th>
              </tr>
            </thead>
            <tbody>
              {financeTableData.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.RLDNR}</td>
                  <td
                    className="document-number"
                    onClick={() => getDocumentDetails(record.BELNR)}
                  >
                    {record.BELNR}
                  </td>
                  <td>{record.RBUKRS}</td>
                  <td>{record.GJAHR}</td>
                  <td>{getDateFormat(record.BUDAT)}</td>
                  <td>{getDateFormat(record.BLDAT)}</td>
                  <td>{record.BLART}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="pagination" style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ margin: "0 5px", padding: "5px 10px" }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ margin: "0 5px", padding: "5px 10px" }}
          >
            Next
          </button>
        </div>
      </>
    </div>
  );
};

export default FinanceTableData;