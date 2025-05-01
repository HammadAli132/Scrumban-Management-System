const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/sprintController');

// Get all sprints with kanban tasks by project ID
router.get('/project/:projectId', sprintController.getAllSprintsWithTasksByProjectId);
router.get('/sprints/:projectId', sprintController.getAllSprints);
// Create new sprint
router.post('/project/:projectId', sprintController.createNewSprint);

module.exports = router;