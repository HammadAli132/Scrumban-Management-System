const ToDoList = require("../models/toDoList");
const ToDoListTask = require("../models/toDoListTask");
const mongoose = require("mongoose");

/**
 * Get all todos given a user id
 * @param {string} userId - The user id to get todos for
 * @return {Promise<Array>} - A promise that resolves to an array of todos
 */

const getAllToDos = async (userId) => {
  try {
    const todoList = await ToDoList.findOne({ userId });
    const toDoListId = todoList._id;

    const todos = await ToDoListTask.find({ toDoListId }).populate("todoListId", "userId");
    if (!todos) {
      throw new Error("No todos found for this user");
    }
    return todos;
  } catch (error) {
    throw new Error("Error getting todos: " + error.message);
  }
}