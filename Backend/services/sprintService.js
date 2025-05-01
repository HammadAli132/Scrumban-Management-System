const Sprint = require('../models/sprint');
const KanbanBoardTask = require('../models/kanbanBoardTask');
const Project = require('../models/project');
const User = require('../models/user');
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
    
    // For each sprint, get its kanban tasks with associated user details
    const sprintsWithTasks = await Promise.all(sprints.map(async (sprint) => {
      // Get basic task data
      const tasks = await KanbanBoardTask.find({ sprintId: sprint._id });
      
      // Enhance each task with user details
      const tasksWithUserDetails = await Promise.all(tasks.map(async (task) => {
        // Find user by the userId in the task
        const user = await User.findById(task.userId, { password: 0 }); // Exclude password field
        
        // Return task with user information
        return {
          ...task.toObject(),
          user: user ? {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image
          } : null
        };
      }));
      
      return {
        ...sprint.toObject(),
        tasks: tasksWithUserDetails
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