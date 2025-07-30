import hana from "@sap/hana-client";
import { MongoClient } from "mongodb";

console.log("financeTableDataController.js loaded at startup");

const connOptions = {
  host: process.env.HOST || "localhost",
  port: 30215,
  user: process.env.USER || "default_user",
  password: `${process.env.PASSWORD || "default_password"}#1234`,
};

// Validate connection options
if (!process.env.HOST || !process.env.USER || !process.env.PASSWORD) {
  console.error("Missing SAP HANA environment variables. Using fallback values:", {
    host: connOptions.host,
    port: connOptions.port,
    user: connOptions.user,
    password: "****",
  });
} else {
  console.log("SAP HANA Connection Options:", {
    host: "Host",
    port: connOptions.port,
    user: connOptions.user,
    password: "****",
  });
}

const clientConn = hana.createClient(connOptions);

// Debug route to list schemas and tables
export const listSchemasAndTables = async (req, res) => {
  try {
    console.log("Listing SAP HANA schemas and tables...");
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA for schema listing");

    const schemasQuery = "SELECT SCHEMA_NAME FROM SYS.SCHEMAS WHERE SCHEMA_NAME LIKE 'SAP%'";
    const schemas = await clientConn.exec(schemasQuery);
    console.log("Available schemas:", schemas);

    const tablesQuery = "SELECT TABLE_NAME FROM SYS.TABLES WHERE SCHEMA_NAME = 'SAPHANADB'";
    const tables = await clientConn.exec(tablesQuery);
    console.log("Tables in SAPHANADB schema:", tables);

    res.status(200).json({ success: true, schemas, tables });
  } catch (error) {
    console.error("Error listing schemas and tables:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: `Error listing schemas and tables: ${error.message} (Code: ${error.code || 'N/A'})`,
    });
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA after schema listing");
    } catch (disconnectError) {
      console.error("Error disconnecting during schema listing:", disconnectError.message);
    }
  }
};

// Debug route to list columns of ACDOCA
export const listTableColumns = async (req, res) => {
  try {
    console.log("Listing columns of SAPHANADB.ACDOCA...");
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA for column listing");

    const columnsQuery = `
      SELECT COLUMN_NAME, DATA_TYPE_NAME 
      FROM SYS.TABLE_COLUMNS 
      WHERE SCHEMA_NAME = 'SAPHANADB' AND TABLE_NAME = 'ACDOCA'
    `;
    const columns = await clientConn.exec(columnsQuery);
    console.log("Columns in SAPHANADB.ACDOCA:", columns);

    res.status(200).json({ success: true, columns });
  } catch (error) {
    console.error("Error listing columns:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: `Error listing columns: ${error.message} (Code: ${error.code || 'N/A'})`,
    });
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA after column listing");
    } catch (disconnectError) {
      console.error("Error disconnecting during column listing:", disconnectError.message);
    }
  }
};

// Health check for SAP HANA connection
export const checkHanaConnection = async (req, res) => {
  try {
    console.log("Testing SAP HANA connection...");
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA for health check");

    const result = await clientConn.exec("SELECT 1 FROM DUMMY");
    console.log("Health check query result:", result);

    res.status(200).json({ success: true, message: "SAP HANA connection is healthy" });
  } catch (error) {
    console.error("SAP HANA health check error:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: `SAP HANA connection failed: ${error.message} (Code: ${error.code || 'N/A'})`,
    });
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA after health check");
    } catch (disconnectError) {
      console.error("Error disconnecting during health check:", disconnectError.message);
    }
  }
};

// General Ledger (G/L) postings
export const getFinanceTableDataFromGL = async (req, res) => {
  console.log("Received request for General Ledger data");
  try {
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA");

    const { docNumber, start, end } = req.query;
    let query = `
      SELECT RLDNR, RBUKRS, GJAHR, BELNR, DOCLN, RACCT, DRCRK, BUDAT, BLDAT, BLART
      FROM SAPHANADB.ACDOCA
    `;
    const params = [];

    const conditions = [];
    if (docNumber) {
      conditions.push("BELNR = ?");
      params.push(docNumber);
    }
    if (start && end) {
      conditions.push("BUDAT BETWEEN ? AND ?");
      params.push(start, end);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    console.log("Executing query:", query, "with params:", params);
    const result = await clientConn.exec(query, params);
    console.log("Query result:", result);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Finance GL error:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).send(`Error fetching General Ledger data: ${error.message} (Code: ${error.code || 'N/A'})`);
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA");
    } catch (disconnectError) {
      console.error("Error disconnecting from SAP HANA:", disconnectError.message);
    }
  }
};

// Accounts Payable (AP) process
export const getFinanceTableDataFromAP = async (req, res) => {
  console.log("Received request for Accounts Payable data");
  try {
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA");

    const { docNumber, start, end } = req.query;
    let query = `
      SELECT RLDNR, RBUKRS, GJAHR, BELNR, DOCLN, RACCT, DRCRK, BUDAT, BLDAT, BLART
      FROM SAPHANADB.ACDOCA
    `;
    // Note: Removed LIFNR, UMSKZ, AWTYP, AWKEY, CPUDT as they may be invalid.
    // Reintroduce LIFNR for AP-specific data once confirmed via /columns endpoint.
    const params = [];

    const conditions = [];
    if (docNumber) {
      conditions.push("BELNR = ?");
      params.push(docNumber);
    }
    if (start && end) {
      conditions.push("BUDAT BETWEEN ? AND ?");
      params.push(start, end);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    console.log("Executing query:", query, "with params:", params);
    const result = await clientConn.exec(query, params);
    console.log("Query result:", result);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Finance AP error:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).send(`Error fetching Accounts Payable data: ${error.message} (Code: ${error.code || 'N/A'})`);
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA");
    } catch (disconnectError) {
      console.error("Error disconnecting from SAP HANA:", disconnectError.message);
    }
  }
};

// Accounts Receivable (AR) process
export const getFinanceTableDataFromAR = async (req, res) => {
  console.log("Received request for Accounts Receivable data");
  try {
    await clientConn.connect();
    console.log("Successfully connected to SAP HANA");

    const { docNumber, start, end } = req.query;
    let query = `
      SELECT RLDNR, RBUKRS, GJAHR, BELNR, DOCLN, RACCT, DRCRK, BUDAT, BLDAT, BLART
      FROM SAPHANADB.ACDOCA
    `;
    // Note: Removed KUNNR, UMSKZ, AWTYP, AWKEY, CPUDT as they may be invalid.
    // Reintroduce KUNNR for AR-specific data once confirmed via /columns endpoint.
    const params = [];

    const conditions = [];
    if (docNumber) {
      conditions.push("BELNR = ?");
      params.push(docNumber);
    }
    if (start && end) {
      conditions.push("BUDAT BETWEEN ? AND ?");
      params.push(start, end);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    console.log("Executing query:", query, "with params:", params);
    const result = await clientConn.exec(query, params);
    console.log("Query result:", result);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Finance AR error:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    res.status(500).send(`Error fetching Accounts Receivable data: ${error.message} (Code: ${error.code || 'N/A'})`);
  } finally {
    try {
      await clientConn.disconnect();
      console.log("Disconnected from SAP HANA");
    } catch (disconnectError) {
      console.error("Error disconnecting from SAP HANA:", disconnectError.message);
    }
  }
};