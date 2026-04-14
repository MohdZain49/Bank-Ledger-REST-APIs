const mongoose = require("mongoose");
const ENV = require("./env");

const connectDataBase = async () => {
  if (!ENV.DATABASE_URL) {
    throw new Error("DataBase URL not found!!");
  }

  try {
    await mongoose.connect(ENV.DATABASE_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY!!");
  } catch (error) {
    console.error("FAILED TO CONNECT DATABASE!!");
    throw error;
  }
};

module.exports = connectDataBase;
