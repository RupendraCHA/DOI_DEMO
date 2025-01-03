import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DateRangePicker } from "react-date-range";

import "./salesOrderData.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { tableData } from "../../VBRKTableData.js";
import { StoreContext } from "../../context/StoreContext";
import Spinner from "../../components/spinner/spinner";

const SalesOrderData = () => {
  const { url } = useContext(StoreContext);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date("2025-01-03"));
  const [recordsCount, setRecordCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [firstCount, setFirstCount] = useState(0);

  // const getProductsData = async () => {
  //   const response = await axios.get(
  //     "https://67776ccd80a79bf91901a925.mockapi.io/DOI_Data"
  //   );
  //   setProducts(response.data);
  //   setAllProducts(response.data);
  //   console.log(response.data);
  //
  // console.log(tableData1);
  // };

  const convertingTheData = async () => {
    setLoading(true);
    let newArray = [];
    let id = 0;

    // const response = await axios.get(url + "/");

    // console.log("Data : ", response.data);
    // const tableData = response.data;

    tableData.map((record) => {
      id = id + 1;
      const dateString = record.FKDAT;
      const year = parseInt(dateString.substring(0, 4), 10);
      const month = parseInt(dateString.substring(4, 6), 10) - 1;
      const day = parseInt(dateString.substring(6, 8), 10);

      const date = new Date(year, month, day);
      let newObject = {
        id: id,
        client: record.MANDT,
        bill_document_no: record.VBELN,
        billing_type: record.FKART,
        billing_category: record.FKTYP,
        billing_date: date.toLocaleDateString(),
        payer: record.KUNRG,
        sold_to_party: record.KUNAG,
        net_value: record.NETWR,
        destination_country: record.LAND1,
        sd_doc_cate: record.VBTYP,
        sd_doc_curr: record.WAERK,
        sales_org: record.VKORG,
        pricing_proc: record.KALSM,
        doc_con_num: record.KNUMV,
        shipping_cond: record.VSBED,
      };
      newArray.push(newObject);
    });
    console.log(newArray);
    setLoading(false);
    setProducts(newArray);
    setAllProducts(newArray);
  };

  // let data = convertingTheData();

  useEffect(() => {
    convertingTheData();
    setFirstCount(0);
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (date) => {
    setFirstCount(1);
    let filtered = allProducts.filter((product) => {
      let productDate = new Date(product.billing_date);

      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });

    setRecordCount(filtered.length);
    console.log(filtered.length);

    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
    console.log(date.selection.startDate);
    console.log(date.selection.endDate);
  };

  return (
    <div className="bg-container">
      <div className="app">
        <h1>Select the start and end date to view the data.</h1>
        <div className="date-selector-container">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            className="date-selector"
          />
        </div>

        <h1>
          <span className="records-count">{`${products.length}`} </span>records
          found between
          <span className="start-date">{`${startDate.toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}`}</span>{" "}
          to
          <span className="end-date">{`${endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}</span>
        </h1>
        {isLoading && (
          <div>
            <Spinner
              size="80px"
              color="#ff6347"
              message="Please wait, Data is Lading..."
            />
          </div>
        )}
        <header>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Id</th>
                {/* <th>Client</th> */}
                <th>Billing_Document</th>
                <th>Billing_Type</th>
                <th>Billing_Category</th>
                <th>Billing_Date</th>
                <th>Payer</th>
                <th>Sold_to_Party</th>
                <th>Net Value</th>
                <th>Destination Country</th>
                <th>SD_Doc_Category</th>
                <th>SD_Doc_Currency</th>
                <th>Sales_Organization</th>
                <th title="Pricing Procedure in Pricing">Pricing_Procedure</th>
                <th title="Document Condition Number">Doc_Con_Number</th>
                <th>Shipping_Conditions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((eachProduct) => {
                // let date = new Date(eachProduct.createdAt);
                return (
                  <tr key={eachProduct.id}>
                    <td>{eachProduct.id}</td>
                    {/* <td>{eachProduct.client}</td> */}
                    <td>{eachProduct.bill_document_no}</td>
                    <td>{eachProduct.billing_type}</td>
                    <td>{eachProduct.billing_category}</td>
                    <td>{eachProduct.billing_date}</td>
                    <td>{eachProduct.payer}</td>
                    <td>{eachProduct.sold_to_party}</td>
                    <td>{eachProduct.net_value}</td>
                    <td>{eachProduct.destination_country}</td>
                    <td>{eachProduct.sd_doc_cate}</td>
                    <td>{eachProduct.sd_doc_curr}</td>
                    <td>{eachProduct.sales_org}</td>
                    <td>{eachProduct.pricing_proc}</td>
                    <td>{eachProduct.doc_con_num}</td>
                    <td>{eachProduct.shipping_cond}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {recordsCount === 0 && products.length === 0 && firstCount !== 0 ? (
            <h1 className="empty-text">
              There is no data between the selected dates.
            </h1>
          ) : (
            ""
          )}
        </header>
      </div>
    </div>
  );
};

export default SalesOrderData;
