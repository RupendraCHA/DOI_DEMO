import React, { useContext, useState } from "react";

import "./SalesTableData.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

import { IoSearch } from "react-icons/io5";

const SalesTableData = (props) => {
  const { url } = useContext(StoreContext);
  let { salesTableName, salesTableData } = props;
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

  const getTheItemDetails = async (docNumber) => {
    setShowItemData(false);
    setDocumentNum("");

    setShowItemData(false);
    setDocumentNum(docNumber);

    const documentNumber = docNumber.slice(0, docNumber.length);
    const response = await axios.get(
      url + `/doi/sales/${documentNumber}/itemData`
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
            <h4>Get Sales Order Item Details</h4>
            <span className="doc-search-container">
              <input
                type="search"
                placeholder="Enter Document Number"
                className="doc-input"
                value={documentNum}
                onChange={(e) => setDocumentNum(e.target.value)}
              />
              <IoSearch
                className="doc-search-icon"
                onClick={() => getTheItemDetails(documentNum)}
              />
            </span>
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
          <h4> Sales Order Header Table</h4>
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
                      onClick={() => getTheItemDetails(record.VBELN)}
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
    </>
  );
};

export default SalesTableData;
