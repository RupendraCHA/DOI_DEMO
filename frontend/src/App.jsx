import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DateRangePicker } from "react-date-range";

import "./App.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { tableData } from "./VBRKTableData";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const { url } = useContext(StoreContext);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2023-08-19"));
  const [endDate, setEndDate] = useState(new Date("2024-12-30"));
  const [recordsCount, setRecordCount] = useState(0);
  const [isTrue, setTrueValue] = useState(false);
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
    let newArray = [];
    let id = 0;

    const response = await axios.get(url + "/");

    console.log("Data : ", response.data);
    const tableData = response.data;

    tableData.map((record) => {
      id = id + 1;
      const dateString = record.FKDAT;
      const year = parseInt(dateString.substring(0, 4), 10);
      const month = parseInt(dateString.substring(4, 6), 10) - 1;
      const day = parseInt(dateString.substring(6, 8), 10);

      const date = new Date(year, month, day);
      let newObject = {
        id: id,
        bill_document_no: record.VBELN,
        currency: record.WAERK,
        billing_date: date.toLocaleDateString(),
      };
      newArray.push(newObject);
    });
    console.log(newArray);
    setProducts(newArray);
    setAllProducts(newArray);

    // console.log(response.data);
    // setProducts(response.data);
    // setAllProducts(response.data);
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
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        <h1>
          This data is between{" "}
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
        <header>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Bill_Document_no</th>
                <th>Currency</th>
                <th>Billing_Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((eachProduct) => {
                // let date = new Date(eachProduct.createdAt);
                return (
                  <tr key={eachProduct.id}>
                    <td>{eachProduct.id}</td>
                    <td>{eachProduct.bill_document_no}</td>
                    <td>{eachProduct.currency}</td>
                    <td>{eachProduct.billing_date}</td>
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

export default App;
