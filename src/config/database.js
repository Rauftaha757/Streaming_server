const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DBURL}/${process.env.DB_NAME || "streaming_side"}`,
    );
    console.log(
      `MongoDB connected successfully: ${connectionInstance.connection.host}`,
    );
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
