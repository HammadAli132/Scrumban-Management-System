const express = require("express");
const { getAllToDoListTasks,
        getCompletedToDoListTasks,
        getTrashedToDoListTasks,
        updateToDoListTask,
        deleteToDoListTask,
        markToDoListTaskAsCompleted,
        addNewToDoListTask, 
        getTodayTasksFromTodoList} = require("../controllers/todoListController");

const router = express.Router();

// I have written the function names in the dummy controllers

router.get("/:userId", getAllToDoListTasks);
router.get("/completed/:userId", getCompletedToDoListTasks);
router.get("/trashed/:userId", getTrashedToDoListTasks);
router.put("/:id", updateToDoListTask);
router.post("/:userId", addNewToDoListTask);
router.delete("/:id", deleteToDoListTask);
router.get("/markdone/:id", markToDoListTaskAsCompleted);
router.get("/todaytasks/:userId", getTodayTasksFromTodoList)

module.exports = router;