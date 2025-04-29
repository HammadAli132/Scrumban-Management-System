const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: String,
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;