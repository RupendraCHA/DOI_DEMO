import React, { useEffect } from "react";

import "./Home.css";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";

import Header from "../../components/Header/Header1";
import Footer from "../../components/Footer/Footer";
import ExploreOfferings from "../../components/ExploreOfferings/ExploreOfferings";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
// import About from "../../components/About/About";

import aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  });
  return (
    <>
      <Header />
      <div className="home-container" id="home" data-aos="fade-down">
        <div className="container main-container">
          <div>
            <h3>
              Welcome to our archived data viewing platform! Powered by S4 HANA,
              we bring real-time, accurate data directly to your screen. Dive
              into actionable insights and experience the power of modern UI at
              your fingertips. Let's explore together!
            </h3>
          </div>
        </div>
        <ExploreOfferings />
        <About />
        <Contact />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Home;
