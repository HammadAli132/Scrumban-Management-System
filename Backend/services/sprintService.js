const Sprint = require('../models/sprint');
const KanbanBoardTask = require('../models/kanbanBoardTask');
const Project = require('../models/project');
const mongoose = require('mongoose');

const sprintService = {
  getAllSprintsWithTasksByProjectId: async (projectId) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Get all sprints for the project
    const sprints = await Sprint.find({ projectId });
    
    // For each sprint, get its kanban tasks
    const sprintsWithTasks = await Promise.all(sprints.map(async (sprint) => {
      const tasks = await KanbanBoardTask.find({ sprintId: sprint._id });
      
      return {
        ...sprint.toObject(),
        tasks
      };
    }));
    
    return sprintsWithTasks;
  },
  
  createNewSprint: async (projectId, sprintData) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Create new sprint
    const sprint = new Sprint({
      ...sprintData,
      projectId
    });
    
    await sprint.save();
    return sprint;
  }
};

module.exports = sprintService;