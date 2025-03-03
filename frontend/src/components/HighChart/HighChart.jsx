

import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ReactPaginate from 'react-paginate';

import "./HighChart.css";
import { StoreContext } from '../../context/StoreContext';

import axios from "axios"

// ✅ Function to Generate Mock SAP Plant Maintenance Data
const generateMockSAPPMData = () => {
  let mockData = [];
  const maintenanceTypes = ["Planned", "Unplanned"];
  const failureReasons = ["Mechanical", "Electrical", "Software", "Wear & Tear"];
  const maintenancePriorities = ["Low", "Medium", "High", "Critical"];
  const departments = ["Production", "Logistics", "Quality", "R&D", "IT"];

  for (let i = 0; i < 200; i++) {
    mockData.push({
      equipmentId: `EQ-${1000 + i}`,
      maintenanceType: maintenanceTypes[Math.floor(Math.random() * 2)],
      downtime: Math.floor(Math.random() * 10) + 1,
      cost: Math.floor(Math.random() * 5000) + 500,
      failureReason: failureReasons[Math.floor(Math.random() * failureReasons.length)],
      maintenancePriority: maintenancePriorities[Math.floor(Math.random() * maintenancePriorities.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      timestamp: `2025-02-18 ${i % 24}:00`,
    });
  }
  return mockData;
};

const HighChartDashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPieChart, setShowPieChart] = useState(true);
  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);

      const {url} = useContext(StoreContext)
  

  useEffect(() => {
    setData(generateMockSAPPMData()); 
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentData = data.slice(currentPage * 20, (currentPage + 1) * 20);

const options = {
  chart: {
    type: 'pie'
},
title: {
    text: 'Egg Yolk Composition'
},
tooltip: {
    valueSuffix: '%'
},
// subtitle: {
//     text:
//     'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
// },
plotOptions: {
    series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
            enabled: true,
            distance: 20
        }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7
            },
            filter: {
                operator: '>',
                property: 'percentage',
                value: 10
            }
        }]
    }
},
series: [
    {
        name: 'Percentage',
        colorByPoint: true,
        data: [
            {
                name: 'Water',
                y: 55.02
            },
            {
                name: 'Fat',
                // sliced: true,
                // selected: true,
                y: 26.71
            },
            {
                name: 'Carbohydrates',
                y: 1.09
            },
            {
                name: 'Protein',
                y: 15.5
            },
            {
                name: 'Ash',
                y: 1.68
            }
        ]
        
    }
]
}

  // ✅ Pie Chart - Maintenance Type Distribution
  const pieChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Maintenance Type Distribution' },
    series: [
      {
        name: 'Count',
        data: [
          { name: "Planned", y: currentData.filter(item => item.maintenanceType === "Planned").length },
          { name: "Unplanned", y: currentData.filter(item => item.maintenanceType === "Unplanned").length }
        ]
      }
    ]
  };

  // ✅ Bar Chart - Downtime by Department
  const barChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Downtime by Department' },
    xAxis: { categories: [...new Set(currentData.map(item => item.department))] },
    series: [
      {
        name: 'Downtime (hours)',
        data: currentData.reduce((acc, item) => {
          const index = acc.findIndex(d => d.name === item.department);
          if (index !== -1) {
            acc[index].y += item.downtime;
          } else {
            acc.push({ name: item.department, y: item.downtime });
          }
          return acc;
        }, [])
      }
    ]
  };

  // ✅ Line Chart - Maintenance Cost Over Time
  const lineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Maintenance Cost Over Time' },
    xAxis: { categories: currentData.map(item => item.timestamp) },
    series: [
      {
        name: 'Maintenance Cost',
        data: currentData.map(item => item.cost)
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Plant Maintenance Dashboard</h1>
      <p>Total Records: {data.length}</p>

      {/* Buttons to toggle chart visibility */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowPieChart(!showPieChart)}>Toggle Pie Chart</button>
        <button onClick={() => setShowBarChart(!showBarChart)}>Toggle Bar Chart</button>
        <button onClick={() => setShowLineChart(!showLineChart)}>Toggle Line Chart</button>
      </div>

      {/* Display charts based on visibility */}
      <div style={{ display: 'flex', flexDirection: "column" }}>
        {showPieChart && <div style={{ width: '100%' }}><HighchartsReact highcharts={Highcharts} options={pieChartOptions} /></div>}
        {showBarChart && <div style={{ width: '100%' }}><HighchartsReact highcharts={Highcharts} options={barChartOptions} /></div>}
        {showLineChart && <div style={{ width: '100%' }}><HighchartsReact highcharts={Highcharts} options={lineChartOptions} /></div>}
        <div><HighchartsReact highcharts={Highcharts} options={options} /></div>
        {/* <NewChart/> */}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(data.length / 20)}  
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
        />
      </div>
    </div>
  );
};

export default HighChartDashboard;
