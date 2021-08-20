const express = require("express");
const app = express();
app.use(express.json());
const data = [
  { id: 2, description: "task No.2", done: false },
  { id: 3, description: "task No.2", done: false },
];
const ids = new Set();
ids.add("2");

app.post("/tasks", function (req, res) {
  const { id, description, done } = req.body;
  //   console.log(ids);
  if (ids.has(id)) {
    res.send("The task alerady existed. ");
  } else {
    data.push(req.body);
    console.log(data);
    ids.add(id);
    res.status(201).send("The task successfully added");
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

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
