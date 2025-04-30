const collaboratorService = require('../services/collaboratorService');

const collaboratorController = {
  getAllCollaboratorsOfProject: async (req, res) => {
    try {
      const { projectId } = req.params;
      const collaborators = await collaboratorService.getAllCollaboratorsOfProject(projectId);
      
      return res.status(200).json({
        success: true,
        data: collaborators
      });
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch collaborators",
        error: error.message
      });
    }
  },

  addCollaboratorToProjectByUsername: async (req, res) => {
    try {
      const { projectId } = req.params;
      const { username } = req.body;
      
      const collaborator = await collaboratorService.addCollaboratorToProjectByUsername(projectId, username);
      
      return res.status(201).json({
        success: true,
        message: "Collaborator added successfully",
        data: collaborator
      });
    } catch (error) {
      console.error("Error adding collaborator:", error);
      
      // Handle different types of errors with appropriate status codes
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: "User not found with the provided username",
        });
      } else if (error.message === 'Project not found') {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      } else if (error.message === 'User is already a collaborator') {
        return res.status(409).json({
          success: false,
          message: "User is already a collaborator on this project",
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Failed to add collaborator",
        error: error.message
      });
    }
  }
};

module.exports = collaboratorController;