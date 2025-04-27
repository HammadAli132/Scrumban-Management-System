const Project = require('../models/project');

const getProjectDetailsByProjectId = async (projectId) => {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        // Get collaborators for this project
        const collaborators = await ProjectCollaborator.find({ projectId }).populate('userId', 'name username email image');

        // Populate the creator details
        await project.populate('userId', 'name username email image');

        return {
            project,
            collaborators
        };
    } catch (error) {
        throw new Error("Error getting project with collaborators: " + error.message);
    }
};

module.exports = {
    getProjectDetailsByProjectId
}