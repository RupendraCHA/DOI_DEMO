import hana from "@sap/hana-client";
import { MongoClient } from "mongodb";

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

    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();
    // console.log(allDocuments.length);
    // allDocuments.map((record) => {
    //   console.log(record.fileName);
    // });

    // let secondArrayIndex = 0;

    // const updatedArray = result.map((object, index) => {
    //   if ((index + 1) % 2 !== 0) {
    //     const secondArrayIndex = ((index + 1 - 1) / 2) % allDocuments.length;
    //     return {
    //       ...object,
    //       fileName: allDocuments[secondArrayIndex].name,
    //       UUID: allDocuments[secondArrayIndex]._id,
    //     };
    //   }
    //   return object;
    // });

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
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementItemData = async (req, res) => {
  const { purchaseOrderNumber } = req.params;
  console.log(purchaseOrderNumber);

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
