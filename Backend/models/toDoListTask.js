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
        required: true
    },
    priorityLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const toDoListTask = mongoose.model("todolisttask", toDoListTaskSchema);
module.exports = toDoListTask;