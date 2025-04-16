const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'comment text is required!'],
        trim: true,
        maxlength: [1000, "comment cannot exceed 1000 characters!"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    kanbanBoardTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kanbanboardtask',
        required: true
    }
}, {timestamps: true});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;