import React from "react";

import "./SalesTableData.css";

const SalesTableData = (props) => {
  const { salesTableName, salesTableData } = props;
  console.log("Rupendra Retrieved Data:", salesTableData[0]);
  console.log(salesTableName);
  return (
    <>
      {salesTableName === "vbak" && (
        <div>
          <h4>{salesTableName.toUpperCase()}: Sales Order Header Table</h4>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Sales Document No</th>
                <th>Creation Date</th>
                <th>Created By</th>
                <th>Document Date</th>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </>
  );
};

export default SalesTableData;
