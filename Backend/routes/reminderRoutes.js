const express = require('express');

const { deleteReminder,
        getUserReminders } = require('../controllers/reminderController');

const router = express.Router();

router.delete('/:reminderId', deleteReminder);
router.get("/:userId", getUserReminders)