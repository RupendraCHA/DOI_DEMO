import React, { useContext, useState } from "react";

import "./SalesTableData.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

import { IoSearch } from "react-icons/io5";

const SalesTableData = (props) => {
  const { url } = useContext(StoreContext);
  let { salesTableName, salesTableData, setHomeText, setSalesTable } = props;
  console.log("Rupendra Retrieved Data:", salesTableData[0]);
  // console.log(salesTableName);

  const [documentNum, setDocumentNum] = useState("");
  const [itemData, setItemData] = useState([]);
  const [showItemData, setShowItemData] = useState(false);

  const convertToDate = (rawDate) => {
    if (!rawDate || typeof rawDate !== "string" || rawDate.length < 8) {
      console.error("Invalid date format:", rawDate);
      return "Invalid Date"; // Return a fallback value
    }
    return (
      rawDate.substring(0, 4) +
      "-" +
      rawDate.substring(4, 6) +
      "-" +
      rawDate.substring(6)
    );
  };

  const removeTableData = () => {
    setHomeText(true);
    setSalesTable("");
    // setShowItemData(false)
  };

  const getTheSalesOrderItemDetails = async (docNumber) => {
    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/orderItemData`
    );

    if (response.data.success) {
      setItemData(response.data.data);
      setShowItemData(true);
    }

    console.log(response.data);
    console.log("Document Number", documentNumber);
  };

  const getTheSalesDeliveryItemDetails = async (docNumber) => {
    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/deliveryItemData`
    );

    if (response.data.success) {
      setItemData(response.data.data);
      setShowItemData(true);
    }

    console.log(response.data);
    console.log("Document Number", documentNumber);
  };

  const getTheSalesBillingItemDetails = async (docNumber) => {
    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/billingItemData`
    );

    if (response.data.success) {
      setItemData(response.data.data);
      setShowItemData(true);
    }

    console.log(response.data);
    console.log("Document Number", documentNumber);
  };

  const hideItemTable = () => {
    setShowItemData(false);
  };

  return (
    <>
      {salesTableName === "vbak" && (
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
                        <tr key={index}>
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
          <h4>{salesTableName.toUpperCase()} Sales Order Header Table</h4>
          <table style={{ width: "200%", overflow: scroll }}>
            <thead>
              <tr>
                <th className="header-cell">S.No</th>
                <th className="header-cell">Sales Document No</th>
                <th className="header-cell">Creation Date</th>
                <th className="header-cell">Document Category</th>
                <th className="header-cell">Document Date</th>
                <th className="header-cell">Sales Document Type</th>
                <th className="header-cell">Net Value</th>
                <th className="header-cell">Currency</th>
                <th className="header-cell">Sales Organization</th>
                <th className="header-cell">Distribution Channel</th>
                <th className="header-cell">Division</th>
                <th className="header-cell">Shipping Condition</th>
                <th className="header-cell">Sold to Party</th>
              </tr>
            </thead>
            <tbody>
              {salesTableData.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td
                      key={record.VBELN}
                      className="document-number"
                      onClick={() => getTheSalesOrderItemDetails(record.VBELN)}
                    >
                      {record.VBELN}
                    </td>
                    <td>{convertToDate(record.ERDAT)}</td>
                    {/* <td>{record.ERNAM}</td> */}
                    <td>{record.VBTYP}</td>
                    <td>{convertToDate(record.AUDAT)}</td>
                    <td>{record.AUART}</td>
                    <td>{record.NETWR}</td>
                    <td>{record.WAERK}</td>
                    <td>{record.VKORG}</td>
                    <td>{record.VTWEG}</td>
                    <td>{record.SPART}</td>
                    <td>{record.VSBED}</td>
                    <td>{record.KUNNR}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                        <tr key={index}>
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
          <h4>{salesTableName.toUpperCase()} - Sales Order Header Table</h4>
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td
                      key={record.VBELN}
                      className="document-number"
                      onClick={() => getTheSalesOrderItemDetails(record.VBELN)}
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
      {salesTableName === "likp" && (
        <>
          <div className="search-icon-container">
            <div>
              <h4>Get Sales Delivery Item Details - LIPS</h4>
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
                        <tr key={index}>
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
          <h4>{salesTableName.toUpperCase()} - Sales Delivery Header Table</h4>
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
                  <tr key={index}>
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
                        <tr key={index}>
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
          <h4>{salesTableName.toUpperCase()} - Sales Delivery Header Table</h4>
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
                  <tr key={index}>
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
      {salesTableName === "vbrk" && (
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
                        <tr key={index}>
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
          <h4>{salesTableName.toUpperCase()} - Sales Billing Header Table</h4>
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
                  <tr key={index}>
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
                        <tr key={index}>
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
                  <tr key={index}>
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
  );
};

export default SalesTableData;
