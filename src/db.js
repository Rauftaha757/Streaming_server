require("dotenv").config();
const mongoose = require("mongoose");
const { db_name } = require("./constants");

// MongoDB professional connection
const connectDB = async () => {
  const dburl = process.env.DBURL;
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DBURL}/${db_name}`,
    );
    console.log(
      `MongoDB Connected Successfully: ${connectionInstance.connection.host}`,
    );
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
