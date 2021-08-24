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
  const idData = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      idData.push(data[i]);
      return;
    }
  }
  console.log(idData);
  if (idData.length > 0) {
    res.status(200).json(idData);
  } else {
    res.status(404).send("Task not found");
  }
});

app.put("/tasks/:id", (req, res) => {
  const { id, description, done } = req.body;
  if (req.params.id != id) {
    res.status(404).send("Task id did not match.");
  } else {
    const targettask = [];
    for (const task of data) {
      if (task.id == id) {
        task.description = description;
        task.done = done;
        targettask.push(task);
        res.status(200).send("The task successfully updated");
      }
    }
    if (targettask.length == 0) {
      res.status(404).send("Task did not found.");
    }
  }
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!ids.has(id)) {
    res.status(404).send("Tasks not found.");
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1);
        console.log(data);
        res.status(204).send("The task successfully deleted");
      }
    }
  }
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
