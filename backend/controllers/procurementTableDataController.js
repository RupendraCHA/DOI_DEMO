import hana from "@sap/hana-client";

const connOptions = {
  host: process.env.HOST,
  port: 30215,
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const clientConn = hana.createClient(connOptions);

export const getProcurementTableDataFromEKKO = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM EKKO");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementTableDataFromEKPO = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM EKPO");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementItemData = async (req, res) => {
  const { purchaseOrderNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    const query = `
      SELECT *
      FROM EKPO
      WHERE EKPO.EBELN = '${purchaseOrderNumber}'`;

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
