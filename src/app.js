const express = require("express");

const app = express();

app.use(express.json())

app.use("/", (_, res) =>
  res.json({
    success: true,
    message: "Bank Ledger REST APIs",
  }),
);

module.exports = app;
