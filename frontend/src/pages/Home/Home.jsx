import React from "react";

import "./Home.css";

import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div>Main</div>
      <Footer />
    </div>
  );
};

export default Home;
