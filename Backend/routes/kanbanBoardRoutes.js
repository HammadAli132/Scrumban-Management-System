const express = require("express");
const { createKanbanBoardTask,
        getKanbanBoard,
        updateKanbanBoardTask,
        updateKanbanBoardTitle,
        getKanbanBoardId, 
        deleteKanbanBoardTask,
        addCommentToKanbanTask,
        getTasksOfKanbanBoard,
        updateTaskSwimLane} = require("../controllers/kanbanBoardController");
const router = express.Router();

router.post("/:projectId", createKanbanBoardTask);
router.get("/:projectId", getKanbanBoard);
router.put("/boardtitle/:kanbanBoardId", updateKanbanBoardTitle);
router.put("/kanbantask/:taskId", updateKanbanBoardTask);
router.get("/kanbanId/:projectId", getKanbanBoardId);
router.delete("/kanbantask/:taskId", deleteKanbanBoardTask);
router.post("/comment/:taskId", addCommentToKanbanTask);
router.get("/kanbantasks/:kanbanBoardId", getTasksOfKanbanBoard);
router.put("/swimlane/:taskId", updateTaskSwimLane);

module.exports = router;