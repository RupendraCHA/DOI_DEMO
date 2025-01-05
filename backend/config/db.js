import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo DB is Successful!!");
  } catch (error) {
    console.log("Mongo DB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

// import hana from "@sap/hana-client";

// const connOptions = {
//   host: process.env.HOST,
//   port: process.env.PORT,
//   user: process.env.USER,
//   password: `${process.env.PASSWORD}#1234`,
// };

// const client = hana.createClient(connOptions);

// const connectToSAPHana = () => {
//   if (connOptions) {
//     client.connect(connOptions);
//     console.log("Connected to SAP HANA DB");
//   } else {
//     console.log("Connection Failed");
//   }
// };

// export default connectToSAPHana;
