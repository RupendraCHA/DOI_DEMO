// Data From VBAK Table
import hana from "@sap/hana-client";

const connOptions = {
  host: process.env.HOST,
  // port: process.env.PORT,
  port: 30215,
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const clientConn = hana.createClient(connOptions);

// GET TABLES DATA

// Fetching VBAK (Sales Order Header) Table Data
export const getSalesTableDataFromVBAK = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(
      "SELECT VBELN, ERDAT, ERNAM, AUDAT, AUART, NETWR, WAERK, VKORG, VTWEG, SPART, VSBED, KUNNR FROM VBAK"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching VBAP (Sales Order Item) Table Data
export const getSalesTableDataFromVBAP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(
      "SELECT VBELN, MATNR, ARKTX, MEINS, ABLFZ, NETWR< WAERK, BRGEW, NTGEW, WERKS, VSTEL, LGORT FROM VBAP"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Header) Table Data

export const getSalesTableDataFromLIKP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(
      "SELECT VBELN, VSTEL, VKORG, LFART, WADAT, INCO1, INCO2, KUNAG, KUNWE, BTGEW, NTGEW, WAERK FROM LIKP"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Item) Table Data

export const getSalesTableDataFromLIPS = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(
      "SELECT VBELN, POSNR, MATNR, MATWA, MATKL, WERKS, LGORT, NTGEW, BRGEW, LADGR, TRAGR, MTART FROM LIPS"
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Item) Table Data

export const getSalesTableDataFromVBRK = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBRK");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Item) Table Data

export const getSalesTableDataFromVBRP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBRP");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// ITEM DATA QUERY

// Fetching Sales Order Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumentOrderItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    //     const query = `
    //       SELECT VBAP.MATNR AS materialNumber,
    //        VBAP.POSNR AS itemNumber,
    //        VBAP.KWMENG AS quantity,
    //        VBAP.NETWR AS netValue
    // FROM VBAP
    // WHERE VBAP.VBELN = '${documentNumber}'`;
    // WHERE VBAP.VBELN = '${documentNumber}'

    const query = `
      SELECT *
      FROM VBAP
      WHERE VBAP.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching Sales Order Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumenDeliverytItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    const query = `
      SELECT *
      FROM LIPS
      WHERE LIPS.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching Sales Invoice Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumenBillingtItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    const query = `
      SELECT *
      FROM VBRP
      WHERE VBRP.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};
