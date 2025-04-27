const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    retrospective: {
        type: String,
        trim: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project', 
        required: true
    }
}, {timestamps: true});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;