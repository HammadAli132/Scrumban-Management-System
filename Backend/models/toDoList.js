const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }  
}, {timestamps: true})