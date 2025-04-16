const mongoose = require('mongoose');
const { getAllToDosByUserId, getCompletedTodosByUserId, getTrashedTodosByUserId, updateTodoById, deleteTodoById, completeTodoById } = require('../services/todoListService.js');

const getAllToDoListTasks = async (req, res) => {
    try {
        // const userId = req.session.userId;
        const userId = req.params;
        const tasks = await getAllToDosByUserId(userId);

        res.status(200).json({success: true, data: tasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const getCompletedToDoListTasks = async (req, res) => {     
    try {
        // const userId = req.session.userId;
        const userId = req.params;
        const completedTasks = await getCompletedTodosByUserId(userId);

        res.status(200).json({success: true, data: completedTasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const getTrashedToDoListTasks = async (req, res) => {
    try {
        // const userId = req.session.userId;
        const userId = req.params;
        const trashedTasks = await getTrashedTodosByUserId(userId);

        res.status(200).json({success: true, data: trashedTasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const updateToDoListTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reminder, notes, title, description, priorityLevel, dueDate } = req.body;
        // check if the respective attribute is provided and unpack it in the updatedData (if it is provded, else do not unpack)
        const updatedData = {
            ...(status != undefined && {status}),
            ...(reminder != undefined && {reminder}),
            ...(notes != undefined && {notes}),
            ...(title != undefined && {title}),
            ...(description != undefined && {description}),
            ...(priorityLevel != undefined && {priorityLevel}),
            ...(dueDate != undefined && {dueDate})
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        const updatedTask = await updateTodoById(id, updatedData);

        res.status(200).json({success: true, data: updatedTask});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const deleteToDoListTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        const deletedTask = await deleteTodoById(id);

        res.status(200).json({success: true, data: deletedTask});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const markToDoListTaskAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }
        
        const markedCompleted = await completeTodoById(id);

        res.status(200).json({success: true, data: markedCompleted});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};