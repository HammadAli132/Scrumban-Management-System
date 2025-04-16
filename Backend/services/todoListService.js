const ToDoList = require("../models/toDoList");
const ToDoListTask = require("../models/toDoListTask");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/scrumbandb"); // remove this file after testing
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

/**
 * Get all todos given a user id
 * @param {string} userId - The user id to get todos for
 * @return {Promise<Array>} - A promise that resolves to an array of todos
 */

const getAllToDosByUserId = async (userId) => {
  try {
    const todoList = await ToDoList.findOne({ userId });
    const toDoListId = todoList._id;

    const todos = await ToDoListTask.find({ toDoListId }).populate("toDoListId", "userId");
    if (!todos) {
      throw new Error("No todos found for this user");
    }
    return todos;
  } catch (error) {
    throw new Error("Error getting todos: " + error.message);
  }
}

const getCompletedTodosByUserId = async (userId) => {
  try {
    const todoList = await ToDoList.findOne({ userId });
    const toDoListId = todoList._id;

    const todos = await ToDoListTask.find({ toDoListId, status: "completed" }).populate("toDoListId", "userId");
    if (!todos) {
      throw new Error("No completed todos found for this user");
    }
    return todos;
  } catch (error) {
    throw new Error("Error getting completed todos: " + error.message);
  }
}

const getTrashedTodosByUserId = async (userId) => {
    try {
        const todoList = await ToDoList.findOne({ userId });
        const toDoListId = todoList._id;
    
        const todos = await ToDoListTask.find({ toDoListId, inTrash: true }).populate("toDoListId", "userId");
        if (!todos) {
        throw new Error("No trashed todos found for this user");
        }
        return todos;
    } catch (error) {
        throw new Error("Error getting trashed todos: " + error.message);
    }
}

const updateTodoById = async (todoId, updateData) => {
    try {
        const updatedTodo = await ToDoListTask.findOneAndUpdate(
            { _id: todoId },
            updateData,
            { new: true }
        );
        if (!updatedTodo) {
            throw new Error("Todo not found");
        }
        return updatedTodo;
    } catch (error) {
        throw new Error("Error updating todo: " + error.message);
    }
}

const deleteTodoById = async (todoId) => {
    try {
        const deletedTodo = await ToDoListTask.findOneAndDelete({ _id: todoId });
        if (!deletedTodo) {
            throw new Error("Todo not found");
        }
        return deletedTodo;
    } catch (error) {
        throw new Error("Error deleting todo: " + error.message);
    }
}   

const test = async () => {
    try {
        const todos = await deleteTodoById("67ff6df0424226671a0d62ea");
        console.log(todos);
    } catch (error) {
        console.error(error.message);
    }
}
test();