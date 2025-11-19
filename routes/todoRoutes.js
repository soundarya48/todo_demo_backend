import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

//Add new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error adding todo" });
  }
});


//Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

//Edit todo text
router.put("/edit/:id", async (req, res) => {
  const { text } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

export default router;
