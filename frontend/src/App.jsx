import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import SalesOrderData from "./pages/salesOrderData/salesOrderData";
import Home from "./pages/Home/home";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/salesData" element={<SalesOrderData />}></Route>
    </Routes>
  );
};

export default App;
