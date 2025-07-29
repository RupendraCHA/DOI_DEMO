import React from "react";
import "./spinner.css";

const Spinner = ({
  size = "40px",
  color = "#3498db",
  message = "Processing your request, one moment please...",
}) => {
  const isDownloading = message.trim().toLowerCase() === "downloading"; 

  return (
    <div className="spinner-container">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      ></div>
      <p
        style={{
          fontSize: isDownloading ? "10px" : "16px", 
          color: "#000",
          margin: "4px 0",
        }}
      >
        {message}
      </p>
    </div>
  );
};

export default Spinner;
