import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import SalesOrderData from "./pages/salesOrderData/salesOrderData";
// import Header from "./components/header/header";
// import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
      <Route exact path="/salesData" element={<SalesOrderData />}></Route>
    </Routes>
  );
};

export default App;
