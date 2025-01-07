import React from "react";

import "./SalesTableData.css";

const SalesTableData = (props) => {
  const { salesTableName, salesTableData } = props;
  console.log("Rupendra Retrieved Data:", salesTableData[0]);
  console.log(salesTableName);

  const convertToDate = (value) => {
    const year = parseInt(value.slice(0, 4));
    const month = parseInt(value.slice(4, 6));
    const day = parseInt(value.slice(6, 8));

    return `${day}-${month}-${year}`;
  };
  return (
    <>
      {salesTableName === "vbak" && (
        <>
          <h4>{salesTableName.toUpperCase()}: Sales Order Header Table</h4>
          <table style={{ width: "200%", overflow: scroll }}>
            <thead>
              <tr>
                <th className="header-cell">S.No</th>
                <th className="header-cell">Sales Document No</th>
                <th className="header-cell">Creation Date</th>
                <th className="header-cell">Created By</th>
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
                    <td>{record.VBELN}</td>
                    <td>{convertToDate(record.ERDAT)}</td>
                    <td>{record.ERNAM}</td>
                    <td>{convertToDate(record.AUDAT)}</td>
                    <td>{record.AUART}</td>
                    <td>{record.NETWR}</td>
                    <td>{record.WAERK}</td>
                    <td>{record.VKORG}</td>
                    <td>{record.VTWEG}</td>
                    <td>{record.SPART}</td>
                    <td>{record.VSBED}</td>
                    <td>{record.KUNAG}</td>
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
