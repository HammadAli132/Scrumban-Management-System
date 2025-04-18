const mongoose = require("mongoose");
const { createKanbanBoardTaskByProjectId, getKanbanBoardByProjectId, updateKanbanBoardTitleById } = require("../services/kanbanBoardService");

const createKanbanBoardTask = async (req, res) => {
    try {
        const {projectId} = req.params;
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
            ...(title != undefined && {title}),
            ...(description != undefined && {description}),
            ...(priorityLevel != undefined && {priorityLevel}),
            ...(dueDate != undefined && {dueDate}),
            ...(swimLane != undefined && {swimLane}),
            ...(sprintId != undefined && {sprintId}),
            ...(userId != undefined && {userId})
        };

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        } 

        const newKanbanBoardTask = await createKanbanBoardTaskByProjectId(projectId, taskData);

        res.status(200).json({success: true, data: newKanbanBoardTask});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getKanbanBoard = async (req, res) => {
    try {
        const {projectId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        } 

        const kanbanBoardTasks = await getKanbanBoardByProjectId(projectId);

        res.status(200).json({success: true, data: kanbanBoardTasks});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateKanbanBoardTitle = async (req, res) => {
    try {
        const {kanbanBoardId} = req.params;
        const {title} = req.body;

        if (!mongoose.Types.ObjectId.isValid(kanbanBoardId)) {
            return res.status(404).json({ success: false, message: "Kanban Board not found!" });
        }

        if (!title) {
            return res.status(400).json({success: false, message: "Title is required to update this field."});
        }

        const updatedBoard = await updateKanbanBoardTitleById(kanbanBoardId);

        res.status(200).json({success: true, data: updatedBoard});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};