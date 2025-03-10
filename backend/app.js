import express from "express";
import cors from "cors";
import hana from "@sap/hana-client";
import "dotenv/config.js";
import multer from "multer";

// import connectToSAPHana from "./config/db.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import salesRouter from "./routes/salesTableDataRoute.js";
import procurementRouter from "./routes/procurementTableDataRoute.js";

import File from "./models/fileSchema.js";

const app = express();

app.use(express.json());
app.use(cors());

// const connOptions = {
//   host: process.env.HOST,
//   // port: process.env.PORT,
//   port: 30215,
//   user: process.env.USER,
//   password: `${process.env.PASSWORD}#1234`,
// };

// const client = hana.createClient(connOptions);

app.use("/doi/user", userRouter);
app.use("/doi/sales", salesRouter);
app.use("/doi/procurement", procurementRouter);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { fileName } = req.body;
  try {
    if (!req.file) {
      console.error("File is missing");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", fileName);
    const newFile = new File({
      name: req.file.originalname,
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      contentType: req.file.mimetype,
      fileName: fileName,
    });

    await newFile.save();
    console.log("File saved to MongoDB");
    res
      .status(200)
      .json({ message: "File uploaded successfully!", fileId: newFile._id });
  } catch (error) {
    console.error("Error in file uploading:", error);
    res.status(500).json({ error: "Error in file uploading" });
  }
});

app.get("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ success: false, error: "File Not Found" });
    }

    const newFile = await File.findOne({ _id: req.params.id });

    res.setHeader("Content-Type", file.contentType);
    res.send(file.file);
  } catch (error) {
    res.status(500).json({ error: "Error in file uploading" });
  }
});





app.get("/", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
      <link
      rel="icon"
      type="image/svg+xml"
      href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"
    />
        <title>Archiving Data from SAP server</title>
        <style>
          div{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color:#4661e7;
          }
          h1{
              color: white;
          }
        </style>
      </head>
      <body>
          <div>
              <h1>You are Successfully started Visionsoft DOI Demo Server</h1>
          </div>
      </body>
      </html>
    `);
});

const port = process.env.DB_PORT;
connectDB();

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:5000`);
});
