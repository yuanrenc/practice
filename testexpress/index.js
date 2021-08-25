const express = require("express");
const app = express();
app.use(cors);
app.use(express.json());
const data = [];
let id = 0;

app.post("/tasks", (req, res) => {
  const { description } = req.body;
  //   console.log(ids);
  if (!description) {
    return res.status(400).json("description is missing");
  } else {
    id += 1;
    const task = { description, done: false, id };
    data.push(task);
    return res.status(201).send("The task successfully added");
  }
});

app.get("/tasks", (req, res) => {
  res.status(200).json(data);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return res.status(200).json(data[i]);
    }
  }
  return res.status(404).send("Task not found");
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  for (const task of data) {
    if (task.id == id) {
      task.done = true;
      return res.status(200).send(task);
    }
  }
  return res.status(404).send("Task did not found.");
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      // console.log(data);
      data.splice(i, 1);
      // console.log(data);
      return res.status(204).send("The task successfully deleted");
    }
  }
  return res.status(404).send("Tasks not found.");
});

function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
}

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
