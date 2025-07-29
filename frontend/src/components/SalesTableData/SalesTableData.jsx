import React, { useContext, useEffect, useState } from "react";

import "./SalesTableData.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

import { IoSearch } from "react-icons/io5";
import Spinner from "../spinner/spinner";
import { FaFileAlt } from "react-icons/fa";


const SalesTableData = (props) => {
  // Destructure props at the very top
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

  // All useState hooks at the top
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(40);
  const [itemCurrentPage, setItemCurrentPage] = useState(1);
  const [itemRecordsPerPage, setItemRecordsPerPage] = useState(40);
  const [documentNum, setDocumentNum] = useState("");
  const [itemData, setItemData] = useState([]);
  const [showItemData, setShowItemData] = useState(false);
  const [startingDate, setStartingDate] = useState("");
  // 20230819
  const [endingDate, setEndingDate] = useState("");
  // 20250113
  const [searchType, setSearchType] = useState("Document");
  const [fileUrl, setFileUrl] = useState("");
  const [downloadScroll, setDownloadScroll] = useState("");

  // Helper for paginated data
  const paginate = (data, page, perPage) => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  };

  // Reset page when data changes
  useEffect(() => { setCurrentPage(1); }, [salesTableData]);
  useEffect(() => { setItemCurrentPage(1); }, [itemData]);

  // Use paginated data for rendering
  const paginatedSalesTableData = paginate(salesTableData, currentPage, recordsPerPage);
  const paginatedItemData = paginate(itemData, itemCurrentPage, itemRecordsPerPage);

  // Pagination controls
  const renderPagination = (total, page, setPage, perPage) => {
    const totalPages = Math.ceil(total / perPage);
    if (totalPages <= 1) return null;
    const pageButtons = [];
    const maxButtons = 5; // Show up to 5 page numbers, with ellipsis if needed
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (endPage - startPage < maxButtons - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxButtons - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxButtons + 1);
      }
    }


    // Prev button
    pageButtons.push(
      <button key="prev" onClick={() => setPage(page - 1)} disabled={page === 1} className="page inactive-page">&lt; Prev</button>
    );

    // First page and ellipsis
    if (startPage > 1) {
      pageButtons.push(
        <button key={1} onClick={() => setPage(1)} className={`page ${page === 1 ? 'active-page' : 'inactive-page'}`}>1</button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`page ${page === i ? 'active-page' : 'inactive-page'}`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis">...</span>);
      }
      pageButtons.push(
        <button key={totalPages} onClick={() => setPage(totalPages)} className={`page ${page === totalPages ? 'active-page' : 'inactive-page'}`}>{totalPages}</button>
      );
    }

    // Next button
    pageButtons.push(
      <button key="next" onClick={() => setPage(page + 1)} disabled={page === totalPages} className="page inactive-page">Next &gt;</button>
    );

    return (
      <div className="pagination-controls" style={{marginTop: 8, marginBottom: 8, textAlign: 'center'}}>
        {pageButtons}
      </div>
    );
  };
  const {
    url,
    loadProcurementData,
    setLoadProcurementData,
    setLoading1,
    isLoading,
    loadSalesData,
    setLoadSalesData,
  } = useContext(StoreContext);



  // 20230819
  // 20250113

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
    // alert("Check Document Radio button is Selected");
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
    if (
      startingDate &&
      endingDate &&
      startingDate <= endingDate &&
      searchType === "Date"
    ) {
      setLoadSalesData(true);
      setLoadProcurementData(true);

      let endpoint;
      let dateField;
      if (salesTableName === "vbak") {
        endpoint = "/sales/vbak";
        dateField = "ERDAT";
      } else if (salesTableName === "likp") {
        endpoint = "/sales/likp";
        dateField = "WADAT";
      } else if (salesTableName === "ekko") {
        endpoint = "/procurement/ekko";
        dateField = "BEDAT";
      }      try {
        const response = await axios.get(url + "/doi" + endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          const filteredData = response.data.data.filter((record) => {
            const recordDate = getDateString(record[dateField]);
            return recordDate >= startingDate && recordDate <= endingDate;
          });

          setLoadSalesData(false);
          setLoadProcurementData(false);
          setTableData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching date range data:", error);
        setLoadSalesData(false);
        setLoadProcurementData(false);
      }
    } else {
      alert("Please select valid dates and ensure Date search is selected");
    }
  };



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
          {/* <p className="attachment-name">{fileName}</p> */}

          <div
            onClick={() => handleDownload(fileName, fileId)}
            className="download-section"
          >
            <FaFileAlt className="attachment-icon" />
            {downloadScroll === fileId && (
                <Spinner
                // style={{ fontSize: "12px" }}
                  size="10px"
                  // color="#000"
                  color="#00308F"
                  message="..."
                />
            )}
          </div>
          
        </div>
      );
    }else{
      return "N/A"
    }
  };

  return (
    <>
      {salesTableName === "vbak" && (
        <>
        <div className="search-box-container">
          <div className="search-icon-container">
            <div className="doc-date-search-container">
              <div className="doc-date-section">
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
                      onClick={() => {
                        if (searchType !== "Document") {
                          alert("Please select 'Get Sales Order Item Details'.");
                          return;
                        }
                        if (!documentNum || documentNum.trim() === "") {
                          alert("Please enter a Document Number.");
                          return;
                        }
                        getTheSalesOrderItemDetails(documentNum);
                      }}
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
                    checked={searchType === "Date"}
                    onChange={getSearchType}
                    className="radio-button"
                  />
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
                        onChange={(e) => setStartingDate(e.target.value)}
                        // value={dates.fromDate}
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
                        onChange={(e) => setEndingDate(e.target.value)}
                      />
                    </div>
                    <IoSearch
                      className="doc-search-icon date-search-icon"
                      onClick={() => {
                        if (searchType !== "Date") {
                          alert("Please select 'Date Range' search option.");
                          return;
                        }

                        const start = startingDate?.trim();
                        const end = endingDate?.trim();

                        if (!start || !end) {
                          alert("Please select both From Date and To Date.");
                          return;
                        }

                        if (new Date(start) > new Date(end)) {
                          alert("From Date cannot be after To Date.");
                          return;
                        }

                        getDataBetweenDates();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div> */}
          </div>
        </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <h3 className="sales-order-item-heading" style={{margin: 0}}>
                    Sales Order Item Data
                  </h3>
                  <div>
                    <label htmlFor="itemRecordsPerPage">Records per page: </label>
                    <select
                      id="itemRecordsPerPage"
                      value={itemRecordsPerPage}
                      onChange={e => { setItemRecordsPerPage(Number(e.target.value)); setItemCurrentPage(1); }}
                    >
                      {[10, 20, 40, 80, 100].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="item-doc-details">
                    Order Item Details for document Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedItemData.map((record, index) => {
                        const globalIndex = (itemCurrentPage - 1) * itemRecordsPerPage + index + 1;
                        return (
                          <tr key={globalIndex}>
                            <td>{globalIndex}</td>
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {renderPagination(itemData.length, itemCurrentPage, setItemCurrentPage, itemRecordsPerPage)}
                </div>
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
              <div className="header-controls-row">
                <div className="header-controls-center" style={{justifyContent: 'flex-start', gap: '1.5rem'}}>
                  <h4 className="header-controls-title" style={{marginRight: '1rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span>Sales Order Header Table Data
                      {searchType === "Document" && searchType !== "Date"
                        ? salesTableData.length > 0
                          ? " - " + salesTableData.length + " records"
                          : salesTableData.length
                        : ""}
                      <span>
                        {searchType === "Date"
                          ? ` from ${getDateFormat(startingDate)} To ${getDateFormat(endingDate)} are ${salesTableData.length}`
                          : ""}
                      </span>
                    </span>
                    <label htmlFor="recordsPerPage" style={{margin: 0, marginLeft: '1.5rem'}}>Records per page:</label>
                    <select
                      id="recordsPerPage"
                      className="records-dropdown"
                      value={recordsPerPage}
                      onChange={e => { setRecordsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                      {[10, 20, 40, 80, 100].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </h4>
                </div>
                <div className="header-controls-right">
                  <div className="pagination-controls">
                    {renderPagination(salesTableData.length, currentPage, setCurrentPage, recordsPerPage)}
                  </div>
                </div>
              </div>
              <div className="table-scroll-container">
                <table style={{ width: "200%" }}>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Sales Document Number</th>
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
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSalesTableData.map((record, index) => {
                      const globalIndex = (currentPage - 1) * recordsPerPage + index + 1;
                      return (
                        <tr key={globalIndex}>
                          <td>{globalIndex}</td>
                          <td
                            key={record.VBELN}
                            className="document-number"
                            onClick={() => getTheSalesOrderItemDetails(record.VBELN)}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Pagination controls at the bottom (optional, for usability) */}
                <div style={{marginTop: '10px'}}>
                  {renderPagination(salesTableData.length, currentPage, setCurrentPage, recordsPerPage)}
                </div>
              </div>
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
                  onClick={() => {
                    if (searchType !== "Document") {
                      alert("Please select 'Get Sales Order Item Details'.");
                      return;
                    }
                    if (!documentNum || documentNum.trim() === "") {
                      alert("Please enter a Document Number.");
                      return;
                    }
                    getTheSalesOrderItemDetails(documentNum);
                  }}
                />
              </span>
            </div>
            {/* <div>
              <button
                className="back-table-data-button"
                onClick={removeTableDataForSales}
              >
                Back
              </button>
            </div> */}
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Order Item Data - VBAP
                </h3>
                <div>
                  <div className="item-doc-details">
                    Order Item Details for document Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                </div>
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
              <div className="table-scroll-container">
                <table style={{ width: "200%" }}>
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
              </div>
            </>
          )}
        </>
      )}
      {salesTableName === "likp" && (
        <>
          <div className="search-box-container">
            <div className="search-icon-container">
              <div className="doc-date-search-container">  
                <div className="doc-date-section">
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
                    <h4>Get Sales Delivery Item Details</h4>
                    <span className="doc-search-container">
                      <input
                        type="search"
                        placeholder="Enter Delivery Number"
                        className="doc-input"
                        onChange={(e) => setDocumentNum(e.target.value)}
                      />
                      <IoSearch
                        className="doc-search-icon"
                        onClick={() => {
                          if (searchType !== "Document") {
                            alert("Please select 'Document' search option.");
                            return;
                          }
                          if (!documentNum?.trim()) {
                            alert("Please enter a Delivery Number.");
                            return;
                          }
                          getTheSalesDeliveryItemDetails(documentNum);
                        }}
                      />
                    </span>
                  </div>
                </div>               
                <div>
                  <div className="process-button">
                    <input
                      type="radio"
                      id="select2"
                      name="process"
                      value="Date"
                      checked={searchType === "Date"}
                      onChange={getSearchType}
                      className="radio-button"
                    />
                    <div className="date-fields-container">
                      <div className="from-date-section">
                        <label
                          style={{ fontWeight: "600", fontSize: "16px" }}
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
                        />
                      </div>
                      <div className="to-date-section">
                        <label
                          style={{ fontWeight: "600", fontSize: "16px" }}
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
                        className="doc-search-icon date-search-icon"
                        onClick={() => {
                          if (searchType !== "Date") {
                            alert("Please select 'Date Range' search option.");
                            return;
                          }
                          if (!startingDate || !endingDate) {
                            alert("Please select both From Date and To Date.");
                            return;
                          }
                          if (new Date(startingDate) > new Date(endingDate)) {
                            alert("From Date cannot be after To Date.");
                            return;
                          }
                          getDataBetweenDates();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Delivery Item Data
                </h3>
                <div>
                  <div className="item-doc-details">
                    Delivery Item Details for delivery Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                </div>
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
                Sales Delivery Header Table
                {searchType === "Document" && searchType !== "Date" 
                  ? salesTableData.length > 0
                    ? " - " + salesTableData.length + " records"
                    : salesTableData.length
                  : ""}
                <span>
                  {searchType === "Date"
                    ? ` from ${getDateFormat(startingDate)} To
            ${getDateFormat(endingDate)} are ${salesTableData.length}`
                    : ""}
                </span>
              </h4>
              <div className="table-scroll-container">
                <table style={{ width: "200%" }}>
                  <thead>
                    <tr>
                      <th className="header-cell">S.No</th>
                      <th className="header-cell">Delivery Number</th>
                      <th className="header-cell">Shipping Point</th>                      
                      <th className="header-cell">Sales Organization</th>
                      <th className="header-cell">Delivery Type</th>
                      <th className="header-cell">Goods Issued Date</th>
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
              </div>
            </>
          )}
        </>
      )}
      {salesTableName === "vbrk" && (
        <>
          <div className="search-box-container">
            <div className="search-icon-container">
              <div>
                <h4>Get Sales Billing Item Details</h4>
                <span className="doc-search-container">
                  <input
                    type="search"
                    placeholder="Enter Billing Document Number"
                    className="billing-doc-input"
                    onChange={(e) => setDocumentNum(e.target.value)}
                  />
                  <IoSearch
                    className="doc-search-icon"
                    onClick={() => {
                      if (searchType !== "Document") {
                        alert("Please select 'Document' search option.");
                        return;
                      }

                      if (!documentNum?.trim()) {
                        alert("Please enter a Billing Document Number.");
                        return;
                      }

                      getTheSalesBillingItemDetails(documentNum);
                    }}
                  />

                </span>
              </div>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Billing Item Data
                </h3>
                <div>
                  <div className="item-doc-details">
                    Billing Item Details for billing Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                </div>
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
                Sales Billing Header Table
                {salesTableData.length > 0
                  ? " - " + salesTableData.length + " records"
                  : salesTableData.length}
              </h4>
              <div className="table-scroll-container">
                <table style={{ width: "200%" }}>
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
              </div>
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
                  onClick={() => {
                    if (searchType !== "Document") {
                      alert("Please select 'Document' search option.");
                      return;
                    }

                    if (!documentNum?.trim()) {
                      alert("Please enter a Billing Document Number.");
                      return;
                    }

                    getTheSalesBillingItemDetails(documentNum);
                  }}
                />

              </span>
            </div>
            {/* <div>
              <button
                className="back-table-data-button"
                onClick={removeTableData}
              >
                Back
              </button>
            </div> */}
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Sales Billing Item Data - VBRP
                </h3>
                <div>
                  <div className="item-doc-details">
                    Billing Item Details for billing Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                </div>
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
              <div className="table-scroll-container">
                <table style={{ width: "200%" }}>
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
              </div>
            </>
          )}
        </>
      )}
      {salesTableName === "ekko" && (
        <>
          <div className="search-box-container">
            <div className="search-icon-container">
              <div className="doc-date-search-container">
                <div className="doc-date-section">
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
                    <h4>Get Procurement Item Details</h4>
                    <span className="doc-search-container">
                      <input
                        type="search"
                        placeholder="Enter Purchase Number"
                        className="doc-input"
                        onChange={(e) => setDocumentNum(e.target.value)}
                      />
                      <IoSearch
                        className="doc-search-icon"
                        onClick={() => {
                          if (searchType !== "Document") {
                            alert("Please select 'Document' search option.");
                            return;
                          }

                          if (!documentNum?.trim()) {
                            alert("Please enter a Procurement Document Number.");
                            return;
                          }

                          getProcurementItemTableData(documentNum);
                        }}
                      />

                    </span>
                  </div>
                </div>
                <div>
                  <div className="process-button">
                    <input
                      type="radio"
                      id="select2"
                      name="process"
                      value="Date"
                      checked={searchType === "Date"}
                      onChange={getSearchType}
                      className="radio-button"
                    />
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
                          onChange={(e) => setStartingDate(e.target.value)}
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
                          onChange={(e) => setEndingDate(e.target.value)}
                        />
                      </div>
                      <IoSearch
                        className="doc-search-icon date-search-icon"
                        onClick={() => {
                          if (searchType !== "Date") {
                            alert("Please select 'Date' search option.");
                            return;
                          }

                          if (!startingDate?.trim() || !endingDate?.trim()) {
                            alert("Please select both From Date and To Date.");
                            return;
                          }

                          if (new Date(startingDate) > new Date(endingDate)) {
                            alert("From Date cannot be after To Date.");
                            return;
                          }

                          getDataBetweenDates();
                        }}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Procurement Header Data
                </h3>
                <div>
                  <div className="item-doc-details">
                    Procurement Header Details for PO Number -
                    <span>{documentNum}</span>
                  </div>
                  {/* <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div> */}
                </div>
                <div className="table-scroll-container">
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
                      <th className="header-cell">Procedure (Pricing,..)</th>
                      <th className="header-cell">Document Type</th>
                      <th className="header-cell">Country/Region</th>
                      <th className="header-cell">
                        <p className="attachment-name">
                          Attachments
                          {/* <FaFileAlt
                            style={{ marginLeft: "5px" }}
                            className="attachment-icon"
                          /> */}
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
                          <td>{record.KALSM}</td>
                          <td>{record.BSART}</td>
                          <td>{record.LANDS}</td>
                          <td>{getAttachment(record.fileName, record.UUID)}</td>
                          {/* <td>{`${record.fileName} ${record.UUID}`}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
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
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadProcurementData && (
            <>
              <div className="header-controls-row">
                <div className="header-controls-center" style={{justifyContent: 'flex-start', gap: '1.5rem'}}>
                  <h4 className="header-controls-title" style={{marginRight: '1rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span>Procurement Header Table
                      {searchType === "Document" && searchType !== "Date"
                        ? salesTableData.length > 0
                          ? " - " + salesTableData.length + " records"
                          : salesTableData.length
                        : ""}
                      <span>
                        {searchType === "Date"
                          ? ` from ${getDateFormat(startingDate)} To ${getDateFormat(endingDate)} are ${salesTableData.length}`
                          : ""}
                      </span>
                    </span>
                    <label htmlFor="procRecordsPerPage" style={{margin: 0, marginLeft: '1.5rem'}}>Records per page:</label>
                    <select
                      id="procRecordsPerPage"
                      className="records-dropdown"
                      value={recordsPerPage}
                      onChange={e => { setRecordsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                      {[10, 20, 40, 80, 100].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </h4>
                </div>
                <div className="header-controls-right">
                  <div className="pagination-controls">
                    {renderPagination(salesTableData.length, currentPage, setCurrentPage, recordsPerPage)}
                  </div>
                </div>
              </div>
              <div className="table-scroll-container">
                <table
                  style={{ width: "100%" }}
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
                      <th className="header-cell">Purchasing Organization</th>
                      <th className="header-cell">Last Item Number</th>
                      <th className="header-cell">
                        Attachments
                        
                        {/* <p className="attachment-name">
                          Attachments
                          <FaFileAlt
                            style={{ marginLeft: "5px" }}
                            className="attachment-icon"
                          />
                        </p> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSalesTableData.map((record, index) => {
                      const globalIndex = (currentPage - 1) * recordsPerPage + index + 1;
                      return (
                        <tr key={globalIndex}>
                          <td>{globalIndex}</td>
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
                          <td>{record.EKORG}</td>
                          <td>{record.LPONR}</td>
                          <td>{getAttachment(record.fileName, record.UUID)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Pagination controls at the bottom */}
                <div style={{marginTop: '10px'}}>
                  {renderPagination(salesTableData.length, currentPage, setCurrentPage, recordsPerPage)}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {salesTableName === "ekpo" && (
        <>
          <div className="search-box-container">
            <div className="search-icon-container">
              <div>
                <h4>Get Procurement Item Details</h4>
                <span className="doc-search-container">
                  <input
                    type="search"
                    placeholder="Enter Purchase Number"
                    className="doc-input"
                    onChange={(e) => setDocumentNum(e.target.value)}
                  />
                  <IoSearch
                    className="doc-search-icon"
                    onClick={() => {
                      if (searchType !== "Document") {
                        alert("Please select 'Document' search option.");
                        return;
                      }

                      if (!documentNum?.trim()) {
                        alert("Please enter a Procurement Document Number.");
                        return;
                      }

                      getProcurementItemTableEKPOData(documentNum);
                    }}
                  />

                </span>
              </div>
            </div>
          </div>
          {showItemData && (
            <div className="item-table-container">
              <div className="item-table-section">
                <h3 className="sales-order-item-heading">
                  Procurement Item Data
                </h3>
                <div>
                  <div className="item-doc-details">
                    Procurement Item Details for purchase Number -
                    <span>{documentNum}</span>
                  </div>
                  <div className="item-doc-details">
                    Number Of Items -<span>{itemData.length}</span>
                  </div>
                </div>
                <div className="table-scroll-container">
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
                      {/* <th className="header-cell">
                        <p className="attachment-name">
                          Attachments
                          <FaFileAlt
                            style={{ marginLeft: "5px" }}
                            className="attachment-icon"
                          />
                        </p>
                      </th> */}
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
                          {/* <td>{getAttachment(record.fileName, record.UUID)}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
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
                color="#00308F"
                message="Processing your request, one moment please..."
              />
            </div>
          )}
          {!loadProcurementData && (
            <>
              <h4>
                Procurement Header Table
                {salesTableData.length > 0
                  ? " - " + salesTableData.length + " records"
                  : salesTableData.length}
              </h4>
              <div className="table-scroll-container">
                <table style={{ width: "100%" }}>
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
                          {/* <td>{getAttachment(record.fileName, record.UUID)}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SalesTableData;
