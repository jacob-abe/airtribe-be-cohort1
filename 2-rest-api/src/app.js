const express = require("express");
const swaggerConfig = require("./swaggerConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();

let tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description of task 1",
    completed: false,
    priority: "high",
    createdAt: "2020-01-01",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description of task 2",
    completed: true,
    priority: "low",
    createdAt: "2020-01-02",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description of task 3",
    completed: false,
    priority: "medium",
    createdAt: "2020-01-03",
  },
];

// setup express app
const app = express();
app.use(cors());
app.use("/api", routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerConfig.serve, swaggerConfig.setup);

const PORT = process.env.PORT || 3000;

//Endpoints

routes.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// Retrieve all tasks with optional filtering and sorting
routes.get("/tasks", (req, res) => {
  const { completed, sortBy, sortOrder } = req.query;
  let filteredTasks = tasks;
  if (completed !== undefined) {
    filteredTasks = tasks.filter(
      (task) => task.completed === (completed === "true")
    );
  }
  if (sortOrder === "asc") {
    filteredTasks.sort((a, b) => {
      if (typeof a[sortBy] === "string") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else {
        return a[sortBy] - b[sortBy];
      }
    });
  } else if (sortOrder === "desc") {
    filteredTasks.sort((a, b) => {
      if (typeof a[sortBy] === "string") {
        return b[sortBy].localeCompare(a[sortBy]);
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  }
  res.json(filteredTasks);
});

// Retrieve tasks with a specific priority level
routes.get("/tasks/priority/:level", (req, res) => {
  const { level } = req.params;
  const validLevels = ["low", "medium", "high"];
  if (!validLevels.includes(level)) {
    return res.status(400).send("Invalid priority level");
  }
  const filteredTasks = tasks.filter((task) => task.priority === level);
  res.json(filteredTasks);
});

// Retrieve a single task by its ID
routes.get("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

// Create a new task
routes.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || completed === undefined) {
    return res.status(400).send("Invalid input");
  }
  const id = tasks.length + 1;
  const task = { id, title, description, completed };
  tasks.push(task);
  res.json(task);
});

// Update an existing task by its ID
routes.put("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  const { title, description, completed } = req.body;
  if (!title || !description || completed === undefined) {
    return res.status(400).send("Invalid input");
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  res.json(task);
});

// Delete a task by its ID
routes.delete("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.send(`Task ${req.params.id} deleted`);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});

// Server start
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
