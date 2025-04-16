const express = require("express");
const { getAllToDoListTasks, getCompletedToDoListTasks, getTrashedToDoListTasks, updateToDoListTask, deleteToDoListTask } = require("../controllers/todoListController");

const router = express.Router();

// I have written the function names in the dummy controllers

router.get("/:userId", getAllToDoListTasks);
router.get("/completed/:userId", getCompletedToDoListTasks);
router.get("/trashed/:userId", getTrashedToDoListTasks);
router.put("/update/:id", updateToDoListTask);
router.delete("delete/:id", deleteToDoListTask);

module.exports = router;