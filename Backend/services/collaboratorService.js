const ProjectCollaborator = require('../models/projectCollaborator');
const Project = require('../models/project');
const User = require('../models/user');
const mongoose = require('mongoose');

const collaboratorService = {
  getAllCollaboratorsOfProject: async (projectId) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Get all collaborator records for the project
    const collaboratorRecords = await ProjectCollaborator.find({ projectId });
    
    // Get user details for each collaborator
    const collaborators = await Promise.all(
      collaboratorRecords.map(async (record) => {
        const user = await User.findById(record.userId, { password: 0 }); // Exclude password
        return user;
      })
    );
    
    // Filter out any null values in case a user was deleted
    return collaborators.filter(Boolean);
  },
  
  addCollaboratorToProjectByUsername: async (projectId, username) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user is already a collaborator
    const existingCollaborator = await ProjectCollaborator.findOne({ 
      projectId, 
      userId: user._id 
    });
    
    if (existingCollaborator) {
      throw new Error('User is already a collaborator');
    }
    
    // Check if user is the project owner
    if (projectExists.userId.toString() === user._id.toString()) {
      throw new Error('User is the project owner and cannot be added as a collaborator');
    }

    // Create new collaborator record
    const collaborator = new ProjectCollaborator({
      userId: user._id,
      projectId
    });
    
    await collaborator.save();
    
    // Return the user info without password
    const collaboratorInfo = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.image
    };
    
    return collaboratorInfo;
  }
};

module.exports = collaboratorService;