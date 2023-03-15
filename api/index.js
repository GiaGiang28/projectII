import express from "express";
import cors from "cors";
import multer from "multer";
//import fs from "fs";
import { db } from "./connect.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import bookingRoutes from "./routes/booking.js";
import billRoutes from "./routes/bill.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../res/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.get("/test", function (req, res) {
  let query = "INSERT INTO abcde(inter, dou) VALUES (?), (?)";
  query = query + ", (?)";
  db.query(
    query,
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully");
    }
  );
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api", bookingRoutes);
app.use("/api/bill", billRoutes);

app.listen(8800, () => {
  console.log("API working");
});
