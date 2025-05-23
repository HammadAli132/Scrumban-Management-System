const mongoose = require('mongoose');

const kanbanBoardTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priorityLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    swimLane: {
        type: String,
        enum: ['ToDo', 'Doing', 'Done'],
        required: true
    },
    sprintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sprint', 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    kanbanBoardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kanbanboard', 
        required: true
    }
}, {timestamps: true});

const KanbanBoardTask = mongoose.model("KanbanBoardTask", kanbanBoardTaskSchema);
module.exports = KanbanBoardTask;