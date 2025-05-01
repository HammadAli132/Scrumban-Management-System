const { get } = require('mongoose');
const sprintService = require('../services/sprintService');

const sprintController = {
  getAllSprintsWithTasksByProjectId: async (req, res) => {
    try {
      const { projectId } = req.params;
      const sprints = await sprintService.getAllSprintsWithTasksByProjectId(projectId);
      
      return res.status(200).json({
        success: true,
        sprints
      });
    } catch (error) {
      console.error("Error fetching sprints with tasks:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch sprints with tasks",
        error: error.message
      });
    }
  },

  createNewSprint: async (req, res) => {
    try {
      const { projectId } = req.params;
      const sprintData = req.body;
      
      const newSprint = await sprintService.createNewSprint(projectId, sprintData);
      
      return res.status(201).json({
        success: true,
        message: "Sprint created successfully",
        newSprint
      });
    } catch (error) {
      console.error("Error creating sprint:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create sprint",
        error: error.message
      });
    }
  },

  getAllSprints: async (req, res) => {
    try {
      const { projectId } = req.params;
      const sprints = await sprintService.getAllSprints(projectId);
      
      return res.status(200).json({
        success: true,
        sprints
      });
    } catch (error) {
      console.error("Error fetching all sprints:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch all sprints",
        error: error.message
      });
    }
  }
};

module.exports = sprintController;