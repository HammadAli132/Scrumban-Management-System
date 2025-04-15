const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }  
}, {timestamps: true});

const ToDoList = mongoose.model('todolist', toDoListSchema);
module.exports = ToDoList;