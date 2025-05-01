const meetingNoteService = require('../services/meetingNoteService');

const meetingNoteController = {
  getAllMeetingNotesByProjectId: async (req, res) => {
    try {
      const { projectId } = req.params;
      const meetingNotes = await meetingNoteService.getAllMeetingNotesByProjectId(projectId);
      
      return res.status(200).json({
        success: true,
        data: meetingNotes
      });
    } catch (error) {
      console.error("Error fetching meeting notes:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch meeting notes",
        error: error.message
      });
    }
  },

  addNewMeetingNote: async (req, res) => {
    try {
      const { projectId } = req.params;
      const noteData = req.body;
      
      const newMeetingNote = await meetingNoteService.addNewMeetingNote(projectId, noteData);
      
      return res.status(201).json({
        success: true,
        message: "Meeting note added successfully",
        data: newMeetingNote
      });
    } catch (error) {
      console.error("Error adding meeting note:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add meeting note",
        error: error.message
      });
    }
  }
};

module.exports = meetingNoteController;