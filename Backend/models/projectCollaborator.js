const mongoose = require('mongoose');

const projectCollaboratorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true
    }
}, {timestamps: true});

const ProjectCollaborator = mongoose.model('ProjectCollaborator', projectCollaboratorSchema);

module.exports = ProjectCollaborator;