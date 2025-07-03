const { connect } = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");
const app = require("./app");
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB:", err);
});
