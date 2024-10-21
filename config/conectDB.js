const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(
      "mongodb://localhost:27017/fitControl"
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((error) => {
      console.log("Connection failed!", error);
    });
}

module.exports = connectDB;
