const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", ()=>{
    console.log("Connected to database "+config.database);
});

// On Error
mongoose.connection.on("error", (error)=>{
    console.log("Database error "+error);
});

const app = express();

const users = require("./routes/users");

// PORT Number
const port = 2000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Para que redirija todas las rutas que sean /users/XXXX
app.use("/users", users);

// Index route
app.get("/", (req, res)=> {
    res.send("Invalid endpoint")
});

// Start server
app.listen(port, ()=>{
    console.log("Server started on port "+port);
});