// dotenv.config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const taskRoutes = require("./src/routes/taskRoutes");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const dbUrl = process.env.MONGOdb_URL;

// mongoose
//   .connect(dbUrl)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB", err));

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true }));
// app.use("/api", taskRoutes);
// app

// //Routes
// app.get("/", (req, res) => {
//   res.send("welcome to the Task Manager API!");
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
const routeFile = fs.readdirSync("./src/routes");
console.log(routeFile);

routeFile.forEach((file) => {
  // use dynamic import
  import(`./src/routes/${file}`)
  .then((route) => {
    app.use("/api/v1", route.default);
  })
  .catch((err) =>{
    console.log("Failed to load routes file", err);
  })
})

const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  } catch (error) {
    console.log("Failed to start server...", error.message);
    process.exit(1); 
  }
};

server();
