const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//Get all tasks
router.get("/", async (req,res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({error: "Server error" });
  }
});

// Create a task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch(err) {
    res.status(400).json({error: "Bad request"});
  }
})

//Delete a task
router.delete("/:id", async (req,res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
});

module.exports = router;