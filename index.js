const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MONGODB CONNECTION (Local)
mongoose
  .connect("mongodb://127.0.0.1:27017/jamila-crud")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(" Connection error:", err));


// START SERVER
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const User = require("./User");

// CREATE
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user); // 201 = Created
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).send({ error: error.message });
  }
});

// READ all
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

// READ one
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(user);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted" });
});
