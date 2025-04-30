const MeetingNote = require('../models/meetingNote');
const Project = require('../models/project');
const mongoose = require('mongoose');

const meetingNoteService = {
  getAllMeetingNotesByProjectId: async (projectId) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Get all meeting notes for the project
    const meetingNotes = await MeetingNote.find({ projectId })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    return meetingNotes;
  },
  
  addNewMeetingNote: async (projectId, noteData) => {
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error('Invalid project ID');
    }
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Create new meeting note
    const meetingNote = new MeetingNote({
      ...noteData,
      projectId
    });
    
    await meetingNote.save();
    return meetingNote;
  }
};

module.exports = meetingNoteService;