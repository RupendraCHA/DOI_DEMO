// const express = require('express');
// const cors = require('cors');
// const hana = require('@sap/hana-client');

import express from "express";
import cors from "cors";
import hana from "@sap/hana-client";
import "dotenv/config.js";

// import connectToSAPHana from "./config/db.js";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());

const connOptions = {
  host: process.env.HOST,
  port: process.env.PORT, // Default HANA port
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const client = hana.createClient(connOptions);

app.get("/", async (req, res) => {
  try {
    // const result = await client.exec('SELECT * FROM your_table');
    // res.json(result);
    client.connect();
    const result = await client.exec("SELECT * FROM VBRK");
    // const result = await client.exec('SELECT * FROM VBRN');
    res.json(result);
    // res.send("Connected to SAP HANA DB!")
    // const query = `SELECT * FROM VBRK WHERE BUKRS = '1000' AND FKART = 'F2'`
    // client.exec(query, (err, rows) => {
    //     if (err) throw err;

    //     console.log('Billing Documents:', rows);
    //   });
    // res.send(`
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //       <title>Hello from Node.js</title>
    //       <style>
    //         div{
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;
    //             height: 100vh;
    //             background-color: black;
    //         }
    //         h1{
    //             color: white;
    //         }
    //         span{
    //             background-color: white;
    //             padding: 10px;
    //             border-radius: 6px;
    //             color: black;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //         <div>
    //             <h1>You are Successfully connected <span>SAP HANA Database</span></h1>
    //         </div>
    //     </body>
    //     </html>
    //   `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    client.disconnect();
  }
});

const port = process.env.DB_PORT;
connectDB();

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:5000`);
});
