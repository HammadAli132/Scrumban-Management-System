const mongoose = require('mongoose');

const toDoListTaskSchema = new mongoose.Schema({
    toDoListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todolist",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    reminder: {
        type: Date
    },
    notes: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    priorityLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
    },
    inTrash: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const ToDoListTask = mongoose.model("todolisttask", toDoListTaskSchema);
module.exports = ToDoListTask;