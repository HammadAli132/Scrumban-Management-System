const express = require("express");

const router = express.Router();

// I have written the function names in the dummy controllers

router.get("/", (req, res) => {
  res.send("getAllTodos");
});

router.post("/", (req, res) => {
    res.send("createTodo");
})



module.exports = router;