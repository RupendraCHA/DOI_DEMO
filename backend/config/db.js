import hana from "@sap/hana-client";

const connOptions = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const client = hana.createClient(connOptions);

const connectToSAPHana = () => {
  if (connOptions) {
    client.connect(connOptions);
    console.log("Connected to SAP HANA DB");
  } else {
    console.log("Connection Failed");
  }
};

export default connectToSAPHana;
