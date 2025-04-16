const mongoose = require('mongoose');

const swimLaneSchema = new mongoose.Schema({
    kanbanBoardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kanbanboard",
        required: true
    }
}, {timestamps: true});

const SwimLane = mongoose.model("swimlane", swimLaneSchema);
module.exports = SwimLane;