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

const updateKanbanBoardTitleById = async (kanbanBoardId, updatedTitle) => {
    try {
        const updatedKanbanBoard = await KanbanBoard.findOneAndUpdate(
            {_id: kanbanBoardId},
            {title: updatedTitle},
            {new: true}
        );

        if (!updatedKanbanBoard) {
            throw new Error("Kanban Board not found");
        }

        return updatedKanbanBoard;
    } catch (error) {
        throw new Error("Error updating kanban board title: " + error.message);
    }
};

const updateKanbanBoardTaskById = async (taskId, updateData) => {
    try {
        const updatedTask = await KanbanBoardTask.findOneAndUpdate(
            {_id: taskId},
            updateData,
            {new: true}
        );

        if (!updatedTask) {
            throw new Error("Kanban Board Task not found");
        }

        return updatedTask;
    } catch (error) {
        throw new Error("Error updating kanban board task: " + error.message);
    }
};

const createKanbanBoardTaskByProjectId = async (projectId, taskData) => {
    try {
        const kanbanBoard = await KanbanBoard.findOne({projectId: projectId});

        if (!kanbanBoard) {
            throw new Error("Kanban Board not found for this Project.");
        }

        const kanbanBoardId = kanbanBoard._id;

        const newTask = await KanbanBoardTask.create(
            ...taskData,
            kanbanBoardId
        );

        return newTask;
    } catch (error) {
        throw new Error("Error creating kanban board task: " + error.message);
    }
};

module.exports = {
    getKanbanBoardByProjectId,
    updateKanbanBoardTitleById,
    updateKanbanBoardTaskById,
    createKanbanBoardTaskByProjectId
};