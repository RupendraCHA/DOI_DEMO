import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import SalesOrderData from "./pages/salesOrderData/salesOrderData";

import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Header1";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import SapDataModules from "./pages/SapDataModules/SapDataModules";

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
        <Route
          exact
          path="/sapDataModules"
          element={
            <>
              <Header message="sales" />
              <SapDataModules />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/salesData"
          element={
            <>
              <Header message="sales" />
              <SalesOrderData />
              <Footer />
            </>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
