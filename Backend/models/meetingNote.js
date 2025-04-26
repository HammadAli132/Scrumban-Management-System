const mongoose = require('mongoose');

const meetingNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
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

const MeetingNote = mongoose.model('MeetingNote', meetingNoteSchema);

module.exports = MeetingNote;