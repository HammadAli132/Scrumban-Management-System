const mongoose = require('mongoose');
const { getAllToDosByUserId, getCompletedTodosByUserId, getTrashedTodosByUserId } = require('../services/todoListService.js');

const getAllToDoListTasks = async (req, res) => {
    try {
        const userId = req.session.userId;

        const tasks = await getAllToDosByUserId(userId);
        res.status(200).json({success: true, data: tasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const getCompletedToDoListTasks = async (req, res) => {     
    try {
        const userId = req.session.userId;

        const completedTasks = await getCompletedTodosByUserId(userId);
        res.status(200).json({success: true, data: completedTasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const getTrashedToDoListTasks = async (req, res) => {
    try {
        const userId = req.session.userId;

        const trashedTasks = await getTrashedTodosByUserId(userId);
        res.status(200).json({success: true, data: trashedTasks});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

