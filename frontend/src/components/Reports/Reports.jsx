import React, { useEffect } from "react";
import "./Reports.css";
import { useNavigate } from "react-router-dom";

const Reports = () => {

  const navigate = useNavigate()

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/reports");
      } else {
        navigate("/login");
      }
    }, []);
  return (
    <div className="reports-container">
      <div>
        <h1>Reports</h1>
      </div>
    </div>
  );
};

export default Reports;
