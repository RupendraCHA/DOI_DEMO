import express from "express";

import {
  getProcurementItemData,
  getProcurementTableDataFromEKKO,
  getProcurementTableDataFromEKPO,
} from "../controllers/procurementTableDataController.js";

const procurementRouter = express.Router();

procurementRouter.get("/ekko", getProcurementTableDataFromEKKO);
procurementRouter.get("/ekpo", getProcurementTableDataFromEKPO);
procurementRouter.get("/:purchaseOrderNumber/ekpo", getProcurementItemData);

export default procurementRouter;
