import express from "express";

import {
  getSalesTableDataFromVBAK,
  getSalesTableDataFromVBAP,
  getSalesDocumentOrderItemData,
  getSalesTableDataFromLIKP,
  getSalesDocumenDeliverytItemData,
  getSalesTableDataFromLIPS,
  getSalesTableDataFromVBRK,
  getSalesDocumenBillingtItemData,
  getSalesTableDataFromVBRP,
  getFilesData,
} from "../controllers/salesTableDataController.js";
const salesRouter = express.Router();

salesRouter.get("/vbak", getSalesTableDataFromVBAK);
salesRouter.get("/vbap", getSalesTableDataFromVBAP);
salesRouter.get("/likp", getSalesTableDataFromLIKP);
salesRouter.get("/lips", getSalesTableDataFromLIPS);
salesRouter.get("/vbrk", getSalesTableDataFromVBRK);
salesRouter.get("/vbrp", getSalesTableDataFromVBRP);
salesRouter.get("/files", getFilesData);
salesRouter.get(
  "/:documentNumber/orderItemData",
  getSalesDocumentOrderItemData
);
salesRouter.get(
  "/:documentNumber/deliveryItemData",
  getSalesDocumenDeliverytItemData
);
salesRouter.get(
  "/:documentNumber/billingItemData",
  getSalesDocumenBillingtItemData
);

export default salesRouter;
