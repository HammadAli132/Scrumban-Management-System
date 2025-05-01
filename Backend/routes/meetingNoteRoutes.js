const express = require('express');
const router = express.Router();
const meetingNoteController = require('../controllers/meetingNoteController');

// Get all meeting notes by project ID
router.get('/project/:projectId/meeting-notes', meetingNoteController.getAllMeetingNotesByProjectId);

// Add new meeting note
router.post('/project/:projectId', meetingNoteController.addNewMeetingNote);

module.exports = router;