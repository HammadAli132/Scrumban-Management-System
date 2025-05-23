const mongoose = require('mongoose');

const kanbanBoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true
    }
}, {timestamps: true});

const KanbanBoard = mongoose.model('kanbanboard', kanbanBoardSchema);
module.exports = KanbanBoard;