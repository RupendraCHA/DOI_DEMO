import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./PurchaseOrderData.css"

const PurchaseOrderChart = ({ data }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Paginate Data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  console.log(paginatedData)

  const chartOptions = {
    chart: { type: "column" },
    title: { text: "Purchase Orders by Vendor" },
    xAxis: { categories: paginatedData.map((d) => d.vendorNumber) },
    yAxis: { title: { text: "Orders Count" } },
    series: [
      {
        name: "Orders",
        data: paginatedData.map(() => Math.floor(Math.random() * 100)), // Dummy Data
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div className="pages-btn">
        <button className="prev-button" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>
        <span className="page-number"> Page {currentPage} of {Math.ceil(data.length / itemsPerPage)} </span>
        <button className="next-button" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderChart;
