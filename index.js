require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGOdb_URL;

mongoose
  .connect(dbUrl, )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Middleware
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);

//Routes
app.get("/", (req, res) => {
  res.send("welcome to the Task Manager API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
