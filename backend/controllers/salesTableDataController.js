// Data From VBAK Table
import hana from "@sap/hana-client";

export const getSalesTableDataFromVBAK = async (req, res) => {
  const connOptions = {
    host: process.env.HOST,
    // port: process.env.PORT,
    port: 30215,
    user: process.env.USER,
    password: `${process.env.PASSWORD}#1234`,
  };

  const clientConn = hana.createClient(connOptions);
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
