const express = require("express");
const { getAllToDoListTasks, getCompletedToDoListTasks, getTrashedToDoListTasks, updateToDoListTask, deleteToDoListTask, markToDoListTaskAsCompleted } = require("../controllers/todoListController");

const router = express.Router();

// I have written the function names in the dummy controllers

router.get("/:userId", getAllToDoListTasks);
router.get("/completed/:userId", getCompletedToDoListTasks);
router.get("/trashed/:userId", getTrashedToDoListTasks);
router.put("/:id", updateToDoListTask);
router.delete("/:id", deleteToDoListTask);
router.get("/markdone/:id", markToDoListTaskAsCompleted);

module.exports = router;