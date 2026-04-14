const dotenv = require("dotenv");
dotenv.config({
  quiet: true
});
  
const _env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  DATABASE_URL: process.env.DATABASE_URL,
};

const ENV = Object.seal(_env);

module.exports = ENV;
