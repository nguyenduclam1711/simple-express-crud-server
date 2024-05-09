const express = require("express");

const app = express();

let id = 1;

// Act like a DB
const data = [];

app.use(express.json());

// Create 1
app.post("/blog", (req, res) => {
  const body = req.body;
  const newBody = {
    id,
    ...body,
  };
  data.push(newBody);
  id++;
  res.json(newBody);
});

// Get list
app.get("/blogs", (req, res) => {
  res.json(data);
});

// Get 1
app.get("/blog/:id", (req, res) => {
  const id = Number(req.params.id);
  const dataIndex = data.findIndex((item) => item.id === Number(id));
  if (dataIndex < 0) {
    res.json({});
    return;
  }
  res.json(data[dataIndex]);
});

// Delete 1
app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;
  const dataIndex = data.findIndex((item) => item.id === Number(id));
  if (dataIndex < 0) {
    res.json({});
    return;
  }
  const deleteData = { ...data[dataIndex] };
  data.splice(dataIndex, 1);
  res.json(deleteData);
});

// Update 1
app.put("/blog/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const dataIndex = data.findIndex((item) => item.id === id);
  if (dataIndex < 0) {
    res.json({});
    return;
  }
  data[dataIndex] = {
    ...data[dataIndex],
    ...body,
  };
  res.json(data[dataIndex]);
});

app.listen(3000, () => {
  console.log("running on 3000");
});
