import React, { useContext, useState } from "react";
import "./PurchaseOrder.css";

import axios from "axios";
import StoreContext from "../../context/StoreContext";

const PurchaseOrder = () => {
  const { url } = useContext(StoreContext);

  const [fileData, setFileData] = useState([]);

  const getPurchaseOrderAttachments = async () => {
    const response = await axios.get(url + "/doi/sales/files");
    console.log(response.data);
  };
  return (
    <div className="purchase-container">
      <h1>Purchase Order Tables</h1>
      <ul>
        <li>Header Table : EKKO</li>
        <li>Item Table : EKPO</li>
        <li onClick={getPurchaseOrderAttachments}>
          Attachment Table : SRGBTBREL
        </li>
      </ul>
    </div>
  );
};

export default PurchaseOrder;
