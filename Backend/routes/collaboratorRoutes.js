
// routes/collaboratorRoutes.js
const express = require('express');
const router = express.Router();
const collaboratorController = require('../controllers/collaboratorController');


// Add collaborator to project by username
router.post('/project/:projectId', collaboratorController.addCollaboratorToProjectByUsername);

module.exports = router;
