const express = require('express');

const { deleteReminder } = require('../controllers/reminderController');

const router = express.Router();

router.delete('/:reminderId', deleteReminder);