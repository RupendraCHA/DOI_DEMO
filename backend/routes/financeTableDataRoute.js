import express from "express";
import authMiddleware from "../middlewares/auth.js";

import {
  getFinanceTableDataFromGL,
  getFinanceTableDataFromAP,
  getFinanceTableDataFromAR,
  checkHanaConnection,
  listSchemasAndTables,
} from "../controllers/financeTableDataController.js";

const financeRouter = express.Router();

// Routes for finance data, supporting query parameters like ?docNumber= and ?start=/&end=
financeRouter.get("/gl", getFinanceTableDataFromGL);
financeRouter.get("/ap", getFinanceTableDataFromAP);
financeRouter.get("/ar", getFinanceTableDataFromAR);
financeRouter.get("/health", checkHanaConnection);
financeRouter.get("/schemas", listSchemasAndTables); // Debug route to list schemas and tables

export default financeRouter;