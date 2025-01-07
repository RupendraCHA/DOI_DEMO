import express from "express";

import {
  getSalesDocumentItemData,
  getSalesTableDataFromVBAK,
  getSalesTableDataFromVBAP,
} from "../controllers/salesTableDataController.js";
const salesRouter = express.Router();

salesRouter.get("/vbak", getSalesTableDataFromVBAK);
salesRouter.get("/vbap", getSalesTableDataFromVBAP);
salesRouter.get("/:documentNumber/itemData", getSalesDocumentItemData);

export default salesRouter;
