import React, { useContext, useEffect, useState } from "react";

import "./SalesTableData.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

import { IoSearch } from "react-icons/io5";
import Spinner from "../spinner/spinner";
import { FaFileAlt } from "react-icons/fa";

const SalesTableData = (props) => {
  const {
    url,
    loadProcurementData,
    setLoadProcurementData,
    setLoading1,
    isLoading,
    loadSalesData,
    setLoadSalesData,
  } = useContext(StoreContext);

  let {
    salesTableName,
    salesTableData,
    setHomeText,
    setSalesTable,
    setLoading,
    setTableData,
    getTableData,
    setHomeText1,
  } = props;
  // console.log("Rupendra Retrieved Data:", salesTableData[0]);
  // console.log(salesTableName);

  const tableRecords = [...salesTableData];

  const [documentNum, setDocumentNum] = useState("");
  const [itemData, setItemData] = useState([]);
  const [showItemData, setShowItemData] = useState(false);
  const [startingDate, setStartingDate] = useState("2023-08-19");
  // 20230819
  const [endingDate, setEndingDate] = useState("2025-01-13");
  // 20250113
  const [searchType, setSearchType] = useState("Date");

  const convertToDate = (rawDate) => {
    if (!rawDate || typeof rawDate !== "string" || rawDate.length < 8) {
      console.error("Invalid date format:", rawDate);
      return "Invalid Date"; // Return a fallback value
    }
    return (
      rawDate.substring(6) +
      "-" +
      rawDate.substring(4, 6) +
      "-" +
      rawDate.substring(0, 4)
    );
  };

  const removePreceedingZeros = (number) => {
    const result = number.replace(/^0+/, "");
    // console.log(result);
    return result;
  };

  const removeTableDataForSales = () => {
    setHomeText(true);
    setSalesTable("");
    setLoading(false);
    // setShowItemData(false)
  };

  const removeTableDataForProcurement = () => {
    setHomeText1(true);
    setSalesTable("");
    setLoading1(false);
  };
  const getTheSalesOrderItemDetails = async (docNumber) => {
    if (searchType === "Document") {
      setLoadSalesData(true);
      setShowItemData(false);
      setDocumentNum("");

      setShowItemData(false);
      setDocumentNum(docNumber);

      const documentNumber = docNumber.slice(0, docNumber.length);
      const response = await axios.get(
        url + `/doi/sales/${documentNumber}/orderItemData`
      );

      if (response.data.success) {
        setLoadSalesData(false);
        setItemData(response.data.data);
        setShowItemData(true);
      }

      console.log(response.data);
      console.log("Document Number", documentNumber);
    }
  };

  const getTheSalesDeliveryItemDetails = async (docNumber) => {
    setLoadSalesData(true);

    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/deliveryItemData`
    );

    if (response.data.success) {
      setLoadSalesData(false);
      setItemData(response.data.data);
      setShowItemData(true);
    }

    console.log(response.data);
    console.log("Document Number", documentNumber);
  };

  const getTheSalesBillingItemDetails = async (docNumber) => {
    setLoadSalesData(true);
    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/billingItemData`
    );

    if (response.data.success) {
      setLoadSalesData(false);
      setItemData(response.data.data);
      setShowItemData(true);
    }
    console.log(response.data);
    console.log("Document Number", documentNumber);
  };

  const hideItemTable = () => {
    setShowItemData(false);
  };

  const getProcurementItemTableData = async (purchaseNumber) => {
    setLoadProcurementData(true);
    setShowItemData(false);
    setDocumentNum("");
    setShowItemData(false);
    setDocumentNum(purchaseNumber);

    const response = await axios.get(
      url + `/doi/procurement/${purchaseNumber}/ekko`
    );

    if (response.data.success) {
      setLoadProcurementData(false);
      setItemData(response.data.data);
      setShowItemData(true);
    }
    console.log("EKKO ITEM:", response.data);
    console.log("Purchase Number", purchaseNumber);
  };

  const getProcurementItemTableEKPOData = async (purchaseNumber) => {
    setLoadProcurementData(true);
    setShowItemData(false);
    setDocumentNum("");
    setShowItemData(false);
    setDocumentNum(purchaseNumber);

    const response = await axios.get(
      url + `/doi/procurement/${purchaseNumber}/ekpo`
    );

    if (response.data.success) {
      setLoadProcurementData(false);
      setItemData(response.data.data);
      setShowItemData(true);
    }
    console.log("EKKO ITEM:", response.data);
    console.log("Purchase Number", purchaseNumber);
  };

  // const getItemDetails = async (documentNumber) => {
  //   let endpoint;
  //   if (salesTableName === "vbak") {
  //     endpoint = salesTableName;
  //   } else if (salesTableName == "likp") {
  //     endpoint = "likp";
  //   } else if (salesTableName === "vbrk") {
  //     endpoint = "vbrk";
  //   }

  //   const response = await axios.get(url + `/doi/sales/${endpoint}`);
  //   let documentNumberItem;

  //   if (response.data.success) {
  //     response.data.data.map((record) => {
  //       if (record.VBELN.endWith(documentNumber)) {
  //         console.log(record.VBELN);
  //       }
  //     });
  //   }
  // };

  const getSearchType = (e) => {
    setSearchType(e.target.value);
    console.log(e.target.value);
  };

  const getDateString = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}-${month}-${day}`;
  };

  const getDateFormat = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day}-${month}-${year}`;
  };

  const getDataBetweenDates = async () => {
    alert("Check Date Radion Button is selected");
    if (
      startingDate &&
      endingDate &&
      startingDate <= endingDate &&
      searchType === "Date"
    ) {
      // console.log(dates);
      setLoadSalesData(true);

      const response = await axios.get(url + `/doi/sales/vbak`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const filteredData = response.data.data.filter((record) => {
        const date = getDateString(record.ERDAT);
        console.log(date);
        return date >= startingDate && date <= endingDate;
      });
      console.log(filteredData);
      setLoadSalesData(false);
      setTableData(filteredData);
      console.log(response.data.data);
      console.log(startingDate);
      console.log(endingDate);
    }
  };

  const [fileUrl, setFileUrl] = useState("");
  const [downloadScroll, setDownloadScroll] = useState("");

  const handleDownload = async (fileName, fileId) => {
    setDownloadScroll(fileId);
    if (!fileId) {
      alert("Please enter a file ID");
      return;
    }

    try {
      const response = await axios.get(url + `/file/${fileId}`, {
        responseType: "blob",
      });
      // console.log(response);
      // const data = await response.data;
      // console.log(data);
      setDownloadScroll("");

      const url1 = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url1;
      link.download = fileName; // Use the extracted or fallback file name
      link.click();

      // Clean up the URL
      window.URL.revokeObjectURL(url1);

      // const url = URL.createObjectURL(response.data);
      // setFileUrl(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getAttachment = (fileName, fileId) => {
    if (fileName) {
      return (
        <div className="attachment-container">
          <p className="attachment-name">{fileName}</p>

          <div
            onClick={() => handleDownload(fileName, fileId)}
            className="download-section"
          >
            <FaFileAlt className="attachment-icon" />
            {downloadScroll === fileId && (
              <div>
                <Spinner
                  size="10px"
                  // color="#000"
                  color="#00308F"
                  message="Downloading"
                />
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {salesTableName === "vbak" && (
        <>
          <div className="search-icon-container">
            <div className="doc-date-search-container">
              <div className="doc-date-section">
                <input
                  type="radio"
                  id="select1"
                  className="radio-button"
                  name="process"
                  value="Document"
                  checked={searchType === "Document" ? "checked" : ""}
                  onClick={getSearchType}
                />
                <div>
                  <h4 className="get-item-details-heading">
                    Get Sales Order Item Details
                  </h4>
                  <div className="doc-search-container">
                    <input
                      type="search"
                      placeholder="Enter Document Number"
                      className="doc-input"
                      // value={documentNum}
                      onChange={(e) => setDocumentNum(e.target.value)}
                    />
                    <IoSearch
                      className="doc-search-icon"
                      onClick={() => getTheSalesOrderItemDetails(documentNum)}
                      // onClick={() => getItemDetails(documentNum)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="process-button">
                  <input
                    type="radio"
                    id="select1"
                    name="process"
                    value="Date"
                    checked={searchType === "Date" ? "checked" : ""}
                    className="radio-button"
                    onClick={getSearchType}
                  />
                  <div className="date-fields-container">
                    <div className="from-date-section">
                      <label
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
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
                        onChange={(e) => setStartingDate(e.target.value)}
                        // value={dates.fromDate}
                      />
                    </div>
                    <div className="to-date-section">
                      <label
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
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
                        onChange={(e) => setEndingDate(e.target.value)}
                      />
                    </div>
                    <IoSearch
                      // className="search-date"
                      className="doc-search-icon date-search-icon"
                      onClick={getDataBetweenDates}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Order Item Data
                </h3>
                <p>
                  <div className="item-doc-details">
                    Order Item Details for document Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Sales Document Number</th>
                      <th className="header-cell">Item Number</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Order Quantity</th>
                      <th className="header-cell">Schedule Line Quantity</th>
                      <th className="header-cell">Delivery Date</th>
                      <th className="header-cell">Net price</th>
                      <th className="header-cell">Net Value</th>
                      <th className="header-cell">Sale Unit</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Item Category</th>
                      <th className="header-cell">Billing Relevance</th>
                      {/* <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Shipping Point</th>
                      <th className="header-cell">Storage Location</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td> {record.VBELN}</td>
                          <td> {record.POSNR}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.ARKTX}</td>
                          <td>{record.KWMENG}</td>
                          <td>{record.KBMENG}</td>
                          <td>{convertToDate(record.VDATU_ANA)}</td>
                          <td>{record.NETPR}</td>
                          <td>{record.NETWR}</td>
                          <td>{record.VRKME}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.PSTYV}</td>
                          <td>{record.FKREL}</td>
                          {/* <td>{record.NTGEW}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.VSTEL}</td>
                          <td>{record.LGORT}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {/* convertToDate(endingDate) */}
          {/* convertToDate(startingDate ) */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>
                Sales Order Header Table Data
                <span>
                  {" "}
                  {searchType === "Date"
                    ? ` from ${getDateFormat(startingDate)} To
            ${getDateFormat(endingDate)} are ${salesTableData.length}`
                    : ""}
                </span>
              </h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Sales Document No</th>
                    <th className="header-cell">Creation Date</th>
                    <th className="header-cell">Sold to Party</th>
                    <th className="header-cell">Ship to Party</th>
                    <th className="header-cell">Document Date</th>
                    <th className="header-cell">Requested Delivery Date</th>
                    <th className="header-cell">Sales Organization</th>
                    <th className="header-cell">Distribution Channel</th>
                    <th className="header-cell">Division</th>
                    <th className="header-cell">Net Value</th>
                    <th className="header-cell">Currency</th>
                    <th className="header-cell">Payment Terms</th>
                    <th className="header-cell">Status</th>
                    {/* <th className="header-cell">Order Reason</th> */}
                    {/* <th className="header-cell">Document Category</th>
                <th className="header-cell">Sales Document Type</th>
                <th className="header-cell">Shipping Condition</th> */}
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 2}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesOrderItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{convertToDate(record.ERDAT)}</td>
                        <td>{record.KUNNR}</td>
                        <td>{record.KUNWE_ANA}</td>
                        <td>{convertToDate(record.AUDAT)}</td>
                        <td>{convertToDate(record.VDATU)}</td>
                        <td>{record.VKORG}</td>
                        <td>{record.VTWEG}</td>
                        <td>{record.SPART}</td>
                        <td>{record.NETWR}</td>
                        <td>{record.WAERK}</td>
                        <td>{record.ZTERM}</td>
                        <td>{record.GBSTK}</td>
                        {/* <td>{record.AUGRU}</td> */}
                        {/* <td>{record.VBTYP}</td>
                    <td>{record.AUART}</td>
                    <td>{record.VSBED}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "vbap" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Order Item Details - VBAP</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Document Number"
                  className="doc-input"
                  // value={documentNum}
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getTheSalesOrderItemDetails(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Order Item Data - VBAP
                </h3>
                <p>
                  <div className="item-doc-details">
                    Order Item Details for document Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Sales Document Number</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Item Description</th>
                      <th className="header-cell">Unit Of Measure</th>
                      <th className="header-cell">Quantity</th>
                      <th className="header-cell">Net Value</th>
                      <th className="header-cell">Currency</th>
                      <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Shipping Point</th>
                      <th className="header-cell">Storage Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 3}>
                          <td>{index + 1}</td>
                          <td>{record.VBELN}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.ARKTX}</td>
                          <td>{record.MEINS}</td>
                          <td>{record.ABLFZ}</td>
                          <td>{record.NETWR}</td>
                          <td>{record.WAERK}</td>
                          <td>{record.BRGEW}</td>
                          <td>{record.NTGEW}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.VSTEL}</td>
                          <td>{record.LGORT}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>{salesTableName.toUpperCase()} - Sales Order Item Table</h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Sales Document Number</th>
                    <th className="header-cell">Material</th>
                    <th className="header-cell">Item Description</th>
                    <th className="header-cell">Unit Of Measure</th>
                    <th className="header-cell">Quantity</th>
                    <th className="header-cell">Net Value</th>
                    <th className="header-cell">Currency</th>
                    <th className="header-cell">Gross Weight</th>
                    <th className="header-cell">Net Weight</th>
                    <th className="header-cell">Plant</th>
                    <th className="header-cell">Shipping Point</th>
                    <th className="header-cell">Storage Location</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 4}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesOrderItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{record.MATNR}</td>
                        <td>{record.ARKTX}</td>
                        <td>{record.MEINS}</td>
                        <td>{record.ABLFZ}</td>
                        <td>{record.NETWR}</td>
                        <td>{record.WAERK}</td>
                        <td>{record.BRGEW}</td>
                        <td>{record.NTGEW}</td>
                        <td>{record.WERKS}</td>
                        <td>{record.VSTEL}</td>
                        <td>{record.LGORT}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "likp" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Delivery Item Details</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Delivery Number"
                  className="doc-input"
                  // value={documentNum}
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getTheSalesDeliveryItemDetails(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Delivery Item Data
                </h3>
                <p>
                  <div className="item-doc-details">
                    Delivery Item Details for delivery Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Delivery Number</th>
                      <th className="header-cell">Delivery Item</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Material Group</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Storage Location</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Loading Group</th>
                      <th className="header-cell">Transportation</th>
                      <th className="header-cell">Material Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 5}>
                          <td>{index + 1}</td>
                          <td>{record.VBELN}</td>
                          <td>{record.POSNR}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.MATWA}</td>
                          <td>{record.MATKL}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.LGORT}</td>
                          <td>{record.NTGEW}</td>
                          <td>{record.BRGEW}</td>
                          <td>{record.LADGR}</td>
                          <td>{record.TRAGR}</td>
                          <td>{record.MTART}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>Sales Delivery Header Table</h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Delivery Number</th>
                    <th className="header-cell">Shipping Point</th>
                    <th className="header-cell">Sales Organization</th>
                    <th className="header-cell">Delivery Type</th>
                    <th className="header-cell">Goods Issued Dater</th>
                    <th className="header-cell">Inco Terms1</th>
                    <th className="header-cell">Inco Terms2</th>
                    <th className="header-cell">Sold To Party</th>
                    <th className="header-cell">Ship To Party</th>
                    <th className="header-cell">Total Weight</th>
                    <th className="header-cell">Net Weight</th>
                    <th className="header-cell">Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 6}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesDeliveryItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{record.VSTEL}</td>
                        <td>{record.VKORG}</td>
                        <td>{record.LFART}</td>
                        <td>{convertToDate(record.WADAT)}</td>
                        <td>{record.INCO1}</td>
                        <td>{record.INCO2}</td>
                        <td>{record.KUNAG}</td>
                        <td>{record.KUNNR}</td>
                        <td>{record.BTGEW}</td>
                        <td>{record.NTGEW}</td>
                        <td>{record.WAERK}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "lips" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Delivery Item Details - LIPS</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Delivery Number"
                  className="doc-input"
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getTheSalesDeliveryItemDetails(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableData}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Delivery Item Data - LIPS
                </h3>
                <p>
                  <div className="item-doc-details">
                    Delivery Item Details for delivery Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Delivery Number</th>
                      <th className="header-cell">Delivery Item</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Material Group</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Storage Location</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Loading Group</th>
                      <th className="header-cell">Transportation</th>
                      <th className="header-cell">Material Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 7}>
                          <td>{index + 1}</td>
                          <td>{record.VBELN}</td>
                          <td>{record.POSNR}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.MATWA}</td>
                          <td>{record.MATKL}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.LGORT}</td>
                          <td>{record.NTGEW}</td>
                          <td>{record.BRGEW}</td>
                          <td>{record.LADGR}</td>
                          <td>{record.TRAGR}</td>
                          <td>{record.MTART}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>
                {salesTableName.toUpperCase()} - Sales Delivery Item Table
              </h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Delivery Number</th>
                    <th className="header-cell">Delivery Item</th>
                    <th className="header-cell">Material</th>
                    <th className="header-cell">Material Description</th>
                    <th className="header-cell">Material Group</th>
                    <th className="header-cell">Plant</th>
                    <th className="header-cell">Storage Location</th>
                    <th className="header-cell">Net Weight</th>
                    <th className="header-cell">Gross Weight</th>
                    <th className="header-cell">Loading Group</th>
                    <th className="header-cell">Transportation</th>
                    <th className="header-cell">Material Type</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 8}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesDeliveryItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{record.POSNR}</td>
                        <td>{record.MATNR}</td>
                        <td>{record.MATWA}</td>
                        <td>{record.MATKL}</td>
                        <td>{record.WERKS}</td>
                        <td>{record.LGORT}</td>
                        <td>{record.NTGEW}</td>
                        <td>{record.BRGEW}</td>
                        <td>{record.LADGR}</td>
                        <td>{record.TRAGR}</td>
                        <td>{record.MTART}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "vbrk" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Billing Item Details</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Delivery Number"
                  className="doc-input"
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getTheSalesBillingItemDetails(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Billing Item Data
                </h3>
                <p>
                  <div className="item-doc-details">
                    Billing Item Details for billing Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Billing Document Number</th>
                      <th className="header-cell">Billing Item</th>
                      <th className="header-cell">Actual Billed Quantity</th>
                      <th className="header-cell">Base Unit Of Measure</th>
                      <th className="header-cell">Required Quantity</th>
                      <th className="header-cell">Net Value</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Shipping Point</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Division</th>
                      <th className="header-cell">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 9}>
                          <td>{index + 1}</td>
                          <td>{record.VBELN}</td>
                          <td>{record.POSNR}</td>
                          <td>{record.FKIMG}</td>
                          <td>{record.MEINS}</td>
                          <td>{record.LMENG}</td>
                          <td>{record.NETWR}</td>
                          <td>{record.NTGEW}</td>
                          <td>{record.BRGEW}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.ARKTX}</td>
                          <td>{record.VSTEL}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.SPART}</td>
                          <td>{record.WAVWR}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>Sales Billing Header Table</h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Billing Document Number</th>
                    <th className="header-cell">Billing Type</th>
                    <th className="header-cell">SD Document Category</th>
                    <th className="header-cell">Currency</th>
                    <th className="header-cell">Sales Organization</th>
                    <th className="header-cell">Distribution Channel</th>
                    <th className="header-cell">Customer Price Group</th>
                    <th className="header-cell">Inco Terms (part-1)</th>
                    <th className="header-cell">Inco Terms (part-2)</th>
                    <th className="header-cell">Terms Of Payment</th>
                    <th className="header-cell">Company Code</th>
                    <th className="header-cell">Net Value</th>
                    <th className="header-cell">Payer</th>
                    <th className="header-cell">Sold To Party</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 10}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesBillingItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{record.FKART}</td>
                        <td>{record.VBTYP}</td>
                        <td>{record.WAERK}</td>
                        <td>{record.VKORG}</td>
                        <td>{record.VTWEG}</td>
                        <td>{record.KONDA}</td>
                        <td>{record.INCO1}</td>
                        <td>{record.INCO2}</td>
                        <td>{record.ZTERM}</td>
                        <td>{record.BUKRS}</td>
                        <td>{record.NETWR}</td>
                        <td>{record.KUNRG}</td>
                        <td>{record.KUNAG}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "vbrp" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Billing Item Details - VBRP</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Delivery Number"
                  className="doc-input"
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getTheSalesBillingItemDetails(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableData}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Billing Item Data - VBRP
                </h3>
                <p>
                  <div className="item-doc-details">
                    Billing Item Details for billing Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Billing Document Number</th>
                      <th className="header-cell">Billing Item</th>
                      <th className="header-cell">Actual Billed Quantity</th>
                      <th className="header-cell">Base Unit Of Measure</th>
                      <th className="header-cell">Required Quantity</th>
                      <th className="header-cell">Net Value</th>
                      <th className="header-cell">Net Weight</th>
                      <th className="header-cell">Gross Weight</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Shipping Point</th>
                      <th className="header-cell">Plant</th>
                      <th className="header-cell">Division</th>
                      <th className="header-cell">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 11}>
                          <td>{index + 1}</td>
                          <td>{record.VBELN}</td>
                          <td>{record.FKIMG}</td>
                          <td>{record.MEINS}</td>
                          <td>{record.LMENG}</td>
                          <td>{record.NETWR}</td>
                          <td>{record.NTGEW}</td>
                          <td>{record.BRGEW}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.ARKTX}</td>
                          <td>{record.VSTEL}</td>
                          <td>{record.WERKS}</td>
                          <td>{record.SPART}</td>
                          <td>{record.WAVWR}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadSalesData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadSalesData && (
            <>
              <h4>{salesTableName.toUpperCase()} - Sales Billing Item Table</h4>
              <table style={{ width: "200%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Billing Document Number</th>
                    <th className="header-cell">Billing Item</th>
                    <th className="header-cell">Actual Billed Quantity</th>
                    <th className="header-cell">Base Unit Of Measure</th>
                    <th className="header-cell">Required Quantity</th>
                    <th className="header-cell">Net Value</th>
                    <th className="header-cell">Net Weight</th>
                    <th className="header-cell">Gross Weight</th>
                    <th className="header-cell">Material</th>
                    <th className="header-cell">Material Description</th>
                    <th className="header-cell">Shipping Point</th>
                    <th className="header-cell">Plant</th>
                    <th className="header-cell">Division</th>
                    <th className="header-cell">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 12}>
                        <td>{index + 1}</td>
                        <td
                          key={record.VBELN}
                          className="document-number"
                          onClick={() =>
                            getTheSalesBillingItemDetails(record.VBELN)
                          }
                        >
                          {record.VBELN}
                        </td>
                        <td>{record.POSNR}</td>
                        <td>{record.FKIMG}</td>
                        <td>{record.MEINS}</td>
                        <td>{record.LMENG}</td>
                        <td>{record.NETWR}</td>
                        <td>{record.NTGEW}</td>
                        <td>{record.BRGEW}</td>
                        <td>{record.MATNR}</td>
                        <td>{record.ARKTX}</td>
                        <td>{record.VSTEL}</td>
                        <td>{record.WERKS}</td>
                        <td>{record.SPART}</td>
                        <td>{record.WAVWR}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "ekko" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Procurement Item Details</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Purchase Number"
                  className="doc-input"
                  // value={documentNum}
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getProcurementItemTableData(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForProcurement}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Procurement Header Data
                </h3>
                <p>
                  <div className="item-doc-details">
                    Procurement Header Details for PO Number -
                    <span>{documentNum}</span>
                  </div>
                  {/* <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div> */}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Purchase Order Number</th>
                      <th className="header-cell">Vendor Number</th>
                      <th className="header-cell">Document Date</th>
                      <th className="header-cell">Currency</th>
                      <th className="header-cell">Document Category</th>
                      {/* <th className="header-cell">Payment Terms</th> */}
                      {/* <th className="header-cell">Release Indicator</th> */}
                      <th className="header-cell">Purchasing Organization</th>
                      <th className="header-cell">Last Item Number</th>
                      <th className="header-cell">
                        <p className="attachment-name">
                          Attachments
                          <FaFileAlt
                            style={{ marginLeft: "5px" }}
                            className="attachment-icon"
                          />
                        </p>
                      </th>

                      {/* <th className="header-cell">Account Assignment</th> */}
                      {/* <th className="header-cell">Attachment</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 6}>
                          <td>{index + 1}</td>
                          <td
                            key={record.EBELN}
                            className="document-number"
                            onClick={() =>
                              getProcurementItemTableData(record.EBELN)
                            }
                          >
                            {record.EBELN}
                          </td>
                          <td>{record.LIFNR}</td>
                          <td>{convertToDate(record.BEDAT)}</td>
                          <td>{record.WAERS}</td>
                          <td>{record.BSTYP}</td>
                          {/* <td>{record.ZTERM}</td> */}
                          {/* <td>{record.FRGKE}</td> */}
                          <td>{record.EKORG}</td>
                          <td>{record.LPONR}</td>
                          <td>{getAttachment(record.fileName, record.UUID)}</td>
                          {/* <td>{`${record.fileName} ${record.UUID}`}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="close-item-data-button"
                    onClick={hideItemTable}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadProcurementData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadProcurementData && (
            <>
              <h4>Procurement Header Table</h4>
              <table
                style={{ width: "100%", overflow: scroll }}
                className={showItemData ? "header-table" : ""}
              >
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Purchase Order Number</th>
                    <th className="header-cell">Vendor Number</th>
                    <th className="header-cell">Document Date</th>
                    <th className="header-cell">Currency</th>
                    <th className="header-cell">Document Category</th>
                    {/* <th className="header-cell">Payment Terms</th> */}
                    {/* <th className="header-cell">Release Indicator</th> */}
                    <th className="header-cell">Purchasing Organization</th>
                    <th className="header-cell">Last Item Number</th>
                    <th className="header-cell">
                      <p className="attachment-name">
                        Attachments
                        <FaFileAlt
                          style={{ marginLeft: "5px" }}
                          className="attachment-icon"
                        />
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 6}>
                        <td>{index + 1}</td>
                        <td
                          key={record.EBELN}
                          className="document-number"
                          onClick={() =>
                            getProcurementItemTableData(record.EBELN)
                          }
                        >
                          {record.EBELN}
                        </td>
                        <td>{record.LIFNR}</td>
                        <td>{convertToDate(record.BEDAT)}</td>
                        <td>{record.WAERS}</td>
                        <td>{record.BSTYP}</td>
                        {/* <td>{record.ZTERM}</td> */}
                        {/* <td>{record.FRGKE}</td> */}
                        <td>{record.EKORG}</td>
                        <td>{record.LPONR}</td>
                        <td>{getAttachment(record.fileName, record.UUID)}</td>
                        {/* <td>{`${record.fileName} ${record.UUID}`}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      {salesTableName === "ekpo" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Procurement Item Details</h4>
              <span className="doc-search-container">
                <input
                  type="search"
                  placeholder="Enter Purchase Number"
                  className="doc-input"
                  // value={documentNum}
                  onChange={(e) => setDocumentNum(e.target.value)}
                />
                <IoSearch
                  className="doc-search-icon"
                  onClick={() => getProcurementItemTableEKPOData(documentNum)}
                />
              </span>
            </div>
            <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForProcurement}
              >
                Back
              </button>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Procurement Item Data
                </h3>
                <p>
                  <div className="item-doc-details">
                    Procurement Item Details for purchase Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Purchase Order Number</th>
                      <th className="header-cell">Material</th>
                      <th className="header-cell">Material Description</th>
                      <th className="header-cell">Quantity</th>
                      {/* <th className="header-cell">Delivery Date</th> */}
                      <th className="header-cell">Net Price</th>
                      <th className="header-cell">Plant</th>
                      {/* <th className="header-cell">Account Assignment</th> */}
                      <th className="header-cell">
                        <p className="attachment-name">
                          Attachments
                          <FaFileAlt
                            style={{ marginLeft: "5px" }}
                            className="attachment-icon"
                          />
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((record, index) => {
                      return (
                        <tr key={index + 5}>
                          <td>{index + 1}</td>
                          <td>{record.EBELN}</td>
                          <td>{record.MATNR}</td>
                          <td>{record.TXZ01}</td>
                          <td>{record.MENGE}</td>
                          {/* <td>{convertToDate(record.EINDT)}</td> */}
                          <td>{record.NETPR}</td>
                          <td>{record.WERKS}</td>
                          {/* <td>{record.KNTTP}</td> */}
                          <td>{getAttachment(record.fileName, record.UUID)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="close-item-data-button"
                  onClick={hideItemTable}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {salesTableName.toUpperCase()}: */}
          {loadProcurementData && (
            <div>
              <Spinner
                size="45px"
                // color="#000"
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadProcurementData && (
            <>
              <h4>Procurement Header Table</h4>
              <table style={{ width: "100%", overflow: scroll }}>
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Purchase Order Number</th>
                    <th className="header-cell">Material</th>
                    <th className="header-cell">Material Description</th>
                    <th className="header-cell">Quantity</th>
                    {/* <th className="header-cell">Delivery Date</th> */}
                    <th className="header-cell">Net Price</th>
                    <th className="header-cell">Plant</th>
                    {/* <th className="header-cell">Account Assignment</th> */}
                    <th className="header-cell">
                      <p className="attachment-name">
                        Attachments
                        <FaFileAlt
                          style={{ marginLeft: "5px" }}
                          className="attachment-icon"
                        />
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((record, index) => {
                    return (
                      <tr key={index + 6}>
                        <td>{index + 1}</td>
                        <td
                          key={record.EBELN}
                          className="document-number"
                          onClick={() =>
                            getProcurementItemTableEKPOData(record.EBELN)
                          }
                        >
                          {record.EBELN}
                        </td>
                        <td>{record.MATNR}</td>
                        <td>{record.TXZ01}</td>
                        <td>{record.MENGE}</td>
                        {/* <td>{convertToDate(record.EILDT)}</td> */}
                        <td>{record.NETPR}</td>
                        <td>{record.WERKS}</td>
                        {/* <td>{record.KNTTP}</td> */}
                        <td>{getAttachment(record.fileName, record.UUID)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>{" "}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SalesTableData;
