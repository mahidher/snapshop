// const express = require("express");
// const products = require("./data/products");
// const dotenv = require("dotenv");
import express from "express";
import path from "path";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use;
app.use(bodyParser.json());
dotenv.config();

connectDB();

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("dirname= " + __dirname);
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", function (req, res) {
    res.send("Api is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.log("in errorhandler");
//   const statusCode = res.statusCode === 200 ? 500 : statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
