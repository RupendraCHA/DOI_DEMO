import express from "express";

import {
  getSalesTableDataFromVBAK,
  getSalesTableDataFromVBAP,
  getSalesDocumentOrderItemData,
  getSalesTableDataFromLIKP,
  getSalesDocumenDeliverytItemData,
} from "../controllers/salesTableDataController.js";
const salesRouter = express.Router();

salesRouter.get("/vbak", getSalesTableDataFromVBAK);
salesRouter.get("/vbap", getSalesTableDataFromVBAP);
salesRouter.get("/likp", getSalesTableDataFromLIKP);
salesRouter.get(
  "/:documentNumber/orderItemData",
  getSalesDocumentOrderItemData
);
salesRouter.get(
  "/:documentNumber/deliveryItemData",
  getSalesDocumenDeliverytItemData
);

export default salesRouter;
