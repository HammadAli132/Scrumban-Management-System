const express = require("express");
const { createKanbanBoardTask, getKanbanBoard, updateKanbanBoardTask, updateKanbanBoardTitle } = require("../controllers/kanbanBoardController");
const router = express.Router();

router.post("/:projectId", createKanbanBoardTask);
router.get("/:projectId", getKanbanBoard);
router.put("/boardtitle/:kanbanBoardId", updateKanbanBoardTitle);
router.put("/kanbantask/:taskId", updateKanbanBoardTask);