require("dotenv").config();

// framework
const express = require("express");
const mongoose = require("mongoose");

//Microservices Routes
const Books = require("./API/Book");
const AuthorModel = require("./API/author");
const PublicationModel = require("./API/publication");

//initializing express
const shapeAI = express();

///
shapeAI.use(express.json());

/// establish database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection established!!!!!!"));

  // initializing Microservices

shapeAI.use("/book",Books);
shapeAI.use("/author",Authors);
shapeAI.use("/publication",Publications);
shapeAI.listen(3000, () => console.log("server running!!!!"));
///
