const express = require('express');

const { deleteReminder,
        getUserReminders, 
        deleteUserReminders} = require('../controllers/reminderController');

const router = express.Router();

router.delete('/:reminderId', deleteReminder);
router.delete('/userreminders/:userId', deleteUserReminders);
router.get("/:userId", getUserReminders);