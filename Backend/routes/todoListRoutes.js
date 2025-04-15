const express = require("express");

const router = express.Router();

// I have written the function names in the dummy controllers

router.get("/", (req, res) => {
  res.send("getAllTodos");
});

router.post("/", (req, res) => {
    res.send("createTodo");
})

router.get("/:id", (req, res) => {
    res.send("getTodoById");
});

router.get("/user/:userid", (req, res) => {
    res.send("getTodosByUserId");
});

module.exports = router;