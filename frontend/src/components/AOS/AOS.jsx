import React, { useEffect } from "react";

import "./AOS.css";

import aos from "aos";
import "aos/dist/aos.css";

const AOS = () => {
  useEffect(() => {
    aos.init({ duration: 3000 });
  });
  return (
    <div className="top">
      <h1>Welcome to React Animation</h1>
      <h1>Fade</h1>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-down"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-left"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <div className="animation" data-aos="fade-right"></div>
      <h1>Flip</h1>
      <div className="animation" data-aos="flip-right"></div>
      <div className="zoom" data-aos="zoon-in">
        <h1 style={{ backgroundColor: "blue" }}>Zoom</h1>
        <div className="animation" data-aos="zoom-in"></div>
        <div className="animation" data-aos="zoom-in"></div>
        <div className="animation" data-aos="zoom-in"></div>
        <div className="animation" data-aos="zoom-in"></div>
      </div>
    </div>
  );
};

export default AOS;
