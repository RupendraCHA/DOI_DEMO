import express from "express";
import cors from "cors";
import hana from "@sap/hana-client";
import "dotenv/config.js";
import multer from "multer";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import salesRouter from "./routes/salesTableDataRoute.js";
import procurementRouter from "./routes/procurementTableDataRoute.js";
import financeRouter from "./routes/financeTableDataRoute.js";
import File from "./models/fileSchema.js";

const app = express();
app.use(express.json());


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://hanelytics-reporting-frontend.onrender.com",
  "https://hanelytics-reporting-backend.onrender.com",
  "https://doi-demo.onrender.com",
  "https://doi-demo-52o9.onrender.com" // 🔁 Replace with your real deployed frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Enable preflight OPTIONS requests for all routes
// app.options("*", cors());

// 🔁 Routes
app.use("/doi/user", userRouter);
app.use("/doi/sales", salesRouter);
app.use("/doi/procurement", procurementRouter);
app.use("/doi/finance", financeRouter);

// 🔁 File upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { fileName } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newFile = new File({
      name: req.file.originalname,
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      contentType: req.file.mimetype,
      fileName,
    });

    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully!", fileId: newFile._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.get("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, error: "File Not Found" });
    }

    res.setHeader("Content-Type", file.contentType);
    res.send(file.file);
  } catch (error) {
    console.error("File fetch error:", error);
    res.status(500).json({ error: "Error retrieving file" });
  }
});

// 🔁 Home route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="icon" type="image/svg+xml"
            href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"/>
      <title>Archiving Data from SAP server</title>
      <style>
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #4661e7;
        }
        h1 {
          color: white;
        }
      </style>
    </head>
    <body>
      <div>
        <h1>You have successfully started the Visionsoft DOI Demo Server</h1>
      </div>
    </body>
    </html>
  `);
});

// 🔁 DB & Start Server
const port = process.env.DB_PORT || 5000;
connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
