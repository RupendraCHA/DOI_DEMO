import React, { useContext, useEffect, useState } from 'react'
import "./BarChart.css"

import axios from "axios"
import { StoreContext } from '../../../context/StoreContext'
import ChartsNavbar from '../../ChartsNavbar/ChartsNavbar'
import HighChartDashboard from '../../HighChart/HighChart'

import PurchaseOrderChart from '../ChartData/PurchaseOrderData'
import Spinner from '../../spinner/spinner'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



const BarChart = () => {

    const [procurementData, setProcurementData] = useState([])
    const [loadingData, setLoadingData] = useState(false)

    const {url, setMenu} = useContext(StoreContext)

    const getProcurementData = async () => {
      setLoadingData(true)
      let procurementData = []
        const response = await axios.get(url + `/doi/procurement/ekko`)
        if (response.data.success === true) {
          response.data.data.map((eachItem) => {
            let procurementItem = {
              purchaseOrderNumber: eachItem.EBELN,
              vendorNumber: eachItem.LIFNR,
              documentDate: eachItem.BEDAT,
              currency: eachItem.WAERS,
              category: eachItem.BSTYP,
              purchasingOrg: eachItem.EKORG,
              lastItemNum : eachItem.LPONR
            }
            procurementData.push(procurementItem)
          })
          setLoadingData(false)
        setProcurementData(procurementData)
        console.log(response.data.data)
        console.log("P",procurementData)
        }
    }

    useEffect(() => {
        getProcurementData()
    }, [])

    // const PurchaseOrderPieChart = ({ data }) => {
    //   // Grouping orders by vendor
    //   const orderCounts = data.reduce((acc, order) => {
    //     acc[order.vendorNumber] = (acc[order.vendorNumber] || 0) + 1;
    //     return acc;
    //   }, {});
    
    //   // Formatting data for Recharts
    //   const chartData = Object.entries(orderCounts).map(([vendor, count]) => ({
    //     name: `Vendor ${vendor}`,
    //     value: count,
    //   }));
    
    //   // Colors for each vendor slice
    //   const COLORS = ["#8884d8", "#82ca9d", "#ffbb28", "#ff8042", "#0088FE"];
    
    //   return (
    //     <ResponsiveContainer width="100%" height={400}>
    //       <PieChart>
    //         <Pie
    //           data={chartData}
    //           cx="50%"
    //           cy="50%"
    //           label
    //           outerRadius={150}
    //           fill="#8884d8"
    //           dataKey="value"
    //         >
    //           {chartData.map((entry, index) => (
    //             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //           ))}
    //         </Pie>
    //         <Tooltip />
    //         <Legend />
    //       </PieChart>
    //     </ResponsiveContainer>
    //   );
    // };
    
    const PurchaseOrderPieChart = ({ data }) => {
      // Grouping orders by vendor
      const orderCounts = data.reduce((acc, order) => {
        acc[order.vendorNumber] = (acc[order.vendorNumber] || 0) + 1;
        return acc;
      }, {});
    
      // Formatting data for Highcharts
      const chartData = Object.entries(orderCounts).map(([vendor, count]) => ({
        name: `Vendor ${vendor}`,
        y: count,
      }));
    
      // Highcharts Config
      const options = {
        chart: {
          type: "pie",
        },
        title: {
          text: "Purchase Orders Distribution by Vendor",
        },
        series: [
          {
            name: "Orders",
            data: chartData,
          },
        ],
      };
    
      return <HighchartsReact highcharts={Highcharts} options={options} />;
    };
    

  return (
    <div className='container barChart'>
      <div className='barChart-section'>
        <div className='charts-navbar'><ChartsNavbar/></div>
        <div className='charts'>
          {/* <HighChartDashboard data={procurementData}/> */}
          {loadingData ? (<div>
                <Spinner
                  size="80px"
                  // color="#000"
                  color="#00308F"
                  message="Data is loading..."
                /> 
          </div>) : <>
          <PurchaseOrderChart data={procurementData}/>
        <PurchaseOrderPieChart data={procurementData}/>
        </>

        }
        </div>
      </div>
    </div>
  )
}

export default BarChart