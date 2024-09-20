const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const userRoute = require("./routes/user.js");
const respuestasRoute = require("./routes/respuestas.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/user", userRoute);
app.use("/api/respuestas", respuestasRoute )




app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});



mongoose
  .connect(
    "mongodb+srv://hackaton:12345@cluster0.lgyib.mongodb.net/hackatoon?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed!");
  });