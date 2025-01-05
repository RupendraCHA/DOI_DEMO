import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import SalesOrderData from "./pages/salesOrderData/salesOrderData";
import Home from "./pages/Home/home";

import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/signup"
          element={
            <>
              <Header message="signup" />
              <SignUp />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/login"
          element={
            <>
              <Header message="login" />
              <Login />
              <Footer />
            </>
          }
        ></Route>
        <Route exact path="/salesData" element={<SalesOrderData />}></Route>
      </Routes>
    </>
  );
};

export default App;
