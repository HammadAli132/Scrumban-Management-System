const KanbanBoard = require("../models/kanbanBoard");
const KanbanBoardTask = require("../models/kanbanBoardTask");

const getKanbanBoardByProjectId = async (projectId) => {
    try {
        const kanbanBoard = await KanbanBoard.findOne({projectId: projectId});
        const kanbanBoardId = kanbanBoard._id;

        const boardTasks = await KanbanBoardTask.find({kanbanBoardId: kanbanBoardId});

        if (!boardTasks) {
            throw new Error("No tasks found for this kanban board");
        }

        return boardTasks;
    } catch (error) {
        throw new Error("Error getting kanban board: " + error.message);
    }
};
