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

export const getSalesTableDataFromVBAK = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBAK");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getSalesTableDataFromVBAP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBAP");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getSalesDocumentItemData = async (req, res) => {
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
