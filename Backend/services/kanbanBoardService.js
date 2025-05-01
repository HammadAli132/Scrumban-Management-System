const KanbanBoard = require("../models/kanbanBoard");
const KanbanBoardTask = require("../models/kanbanBoardTask");
const Comment = require("../models/comment");

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

        const newTask = await KanbanBoardTask.create({
            ...taskData,
            kanbanBoardId
        });

        return newTask;
    } catch (error) {
        
        throw new Error("Error creating kanban board task: " + error.message);
    }
};

const getKanbanBoardIdByProjectId = async (projectId) => {
    try {
        const kanbanBoard = await KanbanBoard.findOne({ projectId: projectId });
        
        if (!kanbanBoard) {
            throw new Error("Kanban Board not found for this project");
        }

        return kanbanBoard._id;
    } catch (error) {
        throw new Error("Error getting kanban board ID: " + error.message);
    }
}

const deleteKanbanBoardTaskById = async (taskId) => {
    try {
        await Comment.deleteMany({kanbanBoardTaskId: taskId});

        const deletedTask = await KanbanBoardTask.findOneAndDelete({ _id: taskId });

        if (!deletedTask) {
            throw new Error("Kanban Board Task not found");
        }

        return deletedTask;
    } catch (error) {
        throw new Error("Error deleting kanban board task: " + error.message);
    }
};

const addCommentToKanbanTaskByTaskId = async (taskId, userId, text) => {
    try {
        const task = await KanbanBoardTask.findById(taskId);

        if (!task) {
            throw new Error("Kanban Board Task not found");
        }

        const newComment = await Comment.create({
            text,
            userId,
            kanbanBoardTaskId: taskId
        });

        await newComment.populate('userId', 'username');

        return newComment;
    } catch (error) {
        console.log(error);
        
        throw new Error("Error adding comment to task: " + error.message);
    }
};

const getAllTasksByKanbanId = async (kanbanBoardId) => {
    try {
        const kanbanBoard = await KanbanBoard.findById(kanbanBoardId);

        if (!kanbanBoard) {
            throw new Error("Kanban Board not found");
        }

        // Get all tasks with populated user and sprint data
        const tasks = await KanbanBoardTask.find({ kanbanBoardId })
            .populate('userId', 'username')
            .populate('sprintId', 'title startDate endDate')
            .sort({ createdAt: -1 });

        // Get comments for all tasks in one query
        const taskIds = tasks.map(task => task._id);
        const comments = await Comment.find({ 
            kanbanBoardTaskId: { $in: taskIds } 
        }).populate('userId', 'username');

        // Group comments by task ID
        const commentsByTask = comments.reduce((acc, comment) => {
            const taskId = comment.kanbanBoardTaskId.toString();
            if (!acc[taskId]) {
                acc[taskId] = [];
            }
            acc[taskId].push(comment);
            return acc;
        }, {});

        // Add comments to each task
        const tasksWithComments = tasks.map(task => {
            return {
                ...task.toObject(),
                comments: commentsByTask[task._id.toString()] || []
            };
        });

        return tasksWithComments;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error fetching tasks: " + error.message);
    }
};

const updateKanbanTaskSwimLaneByTaskId = async (taskId, swimLaneStatus) => {
    try {
        const updatedTask = await KanbanBoardTask.findOneAndUpdate(
            { _id: taskId },
            { swimLane: swimLaneStatus },
            { new: true }
        );

        if (!updatedTask) {
            throw new Error("Kanban Board Task not found");
        }

        return updatedTask;
    } catch (error) {
        throw new Error("Error fetching tasks: " + error.message);
    }
};

const deleteKanbanBoardTaskCommentByCommentAndTaskId = async (commentId, taskId) => {
    try {
        if (!commentId || !taskId) {
            throw new Error("Both commentId and taskId are required");
        }

        const deletedTaskComment = await Comment.findOneAndDelete(
            {_id: commentId, kanbanBoardTaskId: taskId}
        );

        return deletedTaskComment;
    } catch (error) {
        throw new Error("Error fetching tasks: " + error.message);
    }
};

module.exports = {
    getKanbanBoardByProjectId,
    updateKanbanBoardTitleById,
    updateKanbanBoardTaskById,
    createKanbanBoardTaskByProjectId,
    getKanbanBoardIdByProjectId,
    deleteKanbanBoardTaskById,
    addCommentToKanbanTaskByTaskId,
    getAllTasksByKanbanId,
    updateKanbanTaskSwimLaneByTaskId,
    deleteKanbanBoardTaskCommentByCommentAndTaskId
};