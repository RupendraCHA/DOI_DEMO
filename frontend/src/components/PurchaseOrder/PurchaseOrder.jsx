import React, { useContext, useState } from "react";
import "./PurchaseOrder.css";

import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const PurchaseOrder = () => {
  const { url } = useContext(StoreContext);

  const [fileData, setFileData] = useState([]);

  const getPurchaseOrderAttachments = async (table) => {
    let endpoint;

    if (table === "ekko") {
      endpoint = "ekko";
    } else if (table === "ekpo") {
      endpoint = "ekpo";
    } else if (table === "srgbtbrel") {
      endpoint = "srgbtbrel";
    }
    const response = await axios.get(url + `/doi/sales/${endpoint}`);
    console.log(response.data);
  };
  return (
    <div className="purchase-container">
      <h1>Purchase Order Tables</h1>
      <ul>
        <li onClick={() => getPurchaseOrderAttachments("ekko")}>
          Header Table : EKKO
        </li>
        <li onClick={() => getPurchaseOrderAttachments("ekpo")}>
          Item Table : EKPO
        </li>
        <li onClick={() => getPurchaseOrderAttachments("srgbtbrel")}>
          Attachment Table : SRGBTBREL
        </li>
      </ul>
    </div>
  );
};

export default PurchaseOrder;
