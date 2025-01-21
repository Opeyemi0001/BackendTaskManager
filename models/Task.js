const mongoose = require("mongoose");

// const TaskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
//   created: {
//     type: Date,
//     default: Date.now, // Correct usage
//   },
// });

// module.exports = mongoose.model("Task", TaskSchema);


// const mongoose = require("mongoose");

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Task title is required"] // Added custom error message
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    default: "pending", // Default value set to "pending"
    enum: ["pending", "completed"], // Ensures only these values are allowed
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Default to current date and time
  },
});

// Export the Task model
module.exports = mongoose.model("Task", taskSchema);

