import React from "react";
import "./spinner.css"; // Import CSS for styling

// Spinner component
const Spinner = ({
  size = "40px",
  color = "#3498db",
  message = "Processing your request, one moment please...",
}) => {
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
      <p>{message}</p>
    </div>
  );
};

export default Spinner;
