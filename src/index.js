const express = require("express");
require("dotenv").config();
const connectDB = require("./db");
const app = require("./app");
const PORT = process.env.PORT || 8000;
connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    }),
  )
  .catch((err) => {
    console.log(`Error in connection: ${err}`);
  });
