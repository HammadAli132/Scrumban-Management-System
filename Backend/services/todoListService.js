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

const getAllToDos = async (userId) => {
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


const test = async () => {
    try {
        const todos = await getAllToDos("67ff6def424226671a0d62d7");
        console.log(todos);
    } catch (error) {
        console.error(error.message);
    }
}
test();