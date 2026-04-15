const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ENV = require("./lib/env");

const app = express();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (_, res) =>
  res.json({
    success: true,
    message: "Bank Ledger REST APIs",
  }),
);




module.exports = app;
