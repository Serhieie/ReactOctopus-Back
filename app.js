import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
// const { authRouter, imagesRouter } = require("./routes/api");

import boardsRouter from "./routes/api/boards.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
// app.use("/api/images", imagesRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error " } = err;
  res.status(status).json({ message });
});

// module.exports = app;

export default app;
