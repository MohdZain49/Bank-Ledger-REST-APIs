const dotenv = require("dotenv");
dotenv.config();

const _env = {
  PORT: process.env.PORT,
};

const ENV = Object.seal(_env);

module.exports = ENV;
