const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(
      process.env.MONGOURI
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((error) => {
      console.log("Connection failed!", error);
    });
}

module.exports = connectDB;
