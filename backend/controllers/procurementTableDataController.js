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
    //       fileName: allDocuments[secondArrayIndex].fileName,
    //       UUID: allDocuments[secondArrayIndex]._id,
    //     };
    //   }
    //   return object;
    // });
    // console.log(allDocuments);

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002276") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002277") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      }
      return object;
    });

    res.status(200).json({ success: true, data: updatedArray1 });
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

    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();

    const result = await clientConn.exec("SELECT * FROM EKPO");

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002276") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002277") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      }
      return object;
    });
    res.status(200).json({ success: true, data: updatedArray1 });
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
    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();

    const query = `
      SELECT *
      FROM EKKO
      WHERE EKKO.EBELN = '${purchaseOrderNumber}'`;

    const result = await clientConn.exec(query);

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002276") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002277") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      }
      return object;
    });

    // console.log(result);

    res.status(200).json({ success: true, data: updatedArray1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementItemEKPOData = async (req, res) => {
  const { purchaseOrderNumber } = req.params;
  console.log(purchaseOrderNumber);

  try {
    clientConn.connect();
    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();

    const query = `
      SELECT *
      FROM EKPO
      WHERE EKPO.EBELN = '${purchaseOrderNumber}'`;

    const result = await clientConn.exec(query);

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002276") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002277") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      }
      return object;
    });

    // console.log(result);

    res.status(200).json({ success: true, data: updatedArray1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};
