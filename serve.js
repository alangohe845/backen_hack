const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const userRoute = require("./routes/user.js");
const respuestasRoute = require("./routes/respuestas.js");
const app = express();
const morgan = require('morgan');
const cors = require("cors")

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes desde el frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));


app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// routes
app.use("/api/user", userRoute);
app.use("/api/respuestas", respuestasRoute )

mongoose
  .connect(
    "mongodb+srv://hackaton:12345@cluster0.lgyib.mongodb.net/hackatoon?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed!");
  });