import React, { useContext, useEffect, useState } from "react";
import "./Reports.css";
import { useNavigate } from "react-router-dom";

import axios from "axios"
import { StoreContext } from "../../context/StoreContext";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Reports = () => {

  const {url} = useContext(StoreContext)
  const [procurementData, setProcurementData] = useState([])

  const navigate = useNavigate()

  const getProcurementData = async () => {
    const response = await axios.get(url + `/doi/procurement/ekko`);

    if (response.data.success === true) {
      setProcurementData(response.data.data)
      console.log(response.data.data)
    }
  }

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/reports");
      } else {
        navigate("/login");
      }

      getProcurementData()
    }, []);

    const options = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Purchase Orders by Vendor'
      },
      xAxis: {
          categories: ['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4', 'Vendor 5'], // Replace with dynamic vendor names
          title: {
              text: 'Vendors (LIFNR)'
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number of Purchase Orders (EBELN)',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' orders'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Purchase Orders',
          data: [10, 15, 8, 20, 13] // Replace with dynamic data counts
      }]
  };

  return (
    <div className="reports-container">
      <div>
        <h1>Reports</h1>
        {/* <HighchartsReact style={{width: "30%"}} highcharts={Highcharts} options={options} /> */}
      </div>
    </div>
  );
};

export default Reports;
