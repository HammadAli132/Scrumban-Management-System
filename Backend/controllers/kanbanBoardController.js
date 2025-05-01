const mongoose = require("mongoose");
const { createKanbanBoardTaskByProjectId,
        getKanbanBoardByProjectId,
        updateKanbanBoardTitleById,
        updateKanbanBoardTaskById,
        getKanbanBoardIdByProjectId,
        deleteKanbanBoardTaskById,
        addCommentToKanbanTaskByTaskId,
        getAllTasksByKanbanId,
        updateKanbanTaskSwimLaneByTaskId } = require("../services/kanbanBoardService");

const createKanbanBoardTask = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        }

        const {
            title,
            description,
            priorityLevel,
            dueDate,
            swimLane,
            sprintId,
            userId
        } = req.body;

        const taskData = {
            title, description, priorityLevel, dueDate, swimLane, sprintId, userId
        };

        const newKanbanBoardTask = await createKanbanBoardTaskByProjectId(projectId, taskData);

        res.status(200).json({ success: true, data: newKanbanBoardTask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getKanbanBoard = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        }

        const kanbanBoardTasks = await getKanbanBoardByProjectId(projectId);

        res.status(200).json({ success: true, data: kanbanBoardTasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateKanbanBoardTitle = async (req, res) => {
    try {
        const { kanbanBoardId } = req.params;
        const { title } = req.body;

        if (!mongoose.Types.ObjectId.isValid(kanbanBoardId)) {
            return res.status(404).json({ success: false, message: "Kanban Board not found!" });
        }

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required to update this field." });
        }

        const updatedBoard = await updateKanbanBoardTitleById(kanbanBoardId);

        res.status(200).json({ success: true, data: updatedBoard });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateKanbanBoardTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        const {
            title,
            description,
            priorityLevel,
            dueDate,
            swimLane,
            sprintId,
            userId
        } = req.body;

        const updateData = {
            ...(title != undefined && { title }),
            ...(description != undefined && { description }),
            ...(priorityLevel != undefined && { priorityLevel }),
            ...(dueDate != undefined && { dueDate }),
            ...(swimLane != undefined && { swimLane }),
            ...(sprintId != undefined && { sprintId }),
            ...(userId != undefined && { userId })
        };

        const updatedTask = await updateKanbanBoardTaskById(taskId, updateData);

        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getKanbanBoardId = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        }

        const kanbanBoardId = await getKanbanBoardIdByProjectId(projectId);

        res.status(200).json({ success: true, kanbanBoardId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteKanbanBoardTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ success: false, message: "Kanban task not found!" });
        }

        const deletedTask = await deleteKanbanBoardTaskById(taskId);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deletedTask
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const addCommentToKanbanTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { text, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ success: false, message: "Kanban task not found!" });
        }

        if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Comment text is required"
            });
        }

        const newComment = await addCommentToKanbanTaskByTaskId(taskId, userId, text);

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: newComment
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getTasksOfKanbanBoard = async (req, res) => {
    try {
        const { kanbanBoardId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(kanbanBoardId)) {
            return res.status(404).json({ success: false, message: "Kanban board not found!" });
        }

        const tasks = await getAllTasksByKanbanId(kanbanBoardId);

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateTaskSwimLane = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { swimLane } = req.body;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ success: false, message: "Kanban board task not found!" });
        }

        if (!swimLane) {
            return res.status(400).json({success: false, message: "Swim lane status is required"});
        }

        // Update the task swim lane
        const result = await updateKanbanTaskSwimLaneByTaskId(taskId, swimLane);
        
        res.status(200).json({
            success: true,
            message: "Task swim lane updated successfully",
            data: result
        });
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createKanbanBoardTask,
    getKanbanBoard,
    updateKanbanBoardTitle,
    updateKanbanBoardTask,
    getKanbanBoardId,
    deleteKanbanBoardTask,
    addCommentToKanbanTask,
    getTasksOfKanbanBoard,
    updateTaskSwimLane
};