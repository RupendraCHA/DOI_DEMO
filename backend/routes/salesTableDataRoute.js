import express from "express";

import { getSalesTableDataFromVBAK } from "../controllers/salesTableDataController.js";
const salesRouter = express.Router();

salesRouter.get("/vbak", getSalesTableDataFromVBAK);

export default salesRouter;
