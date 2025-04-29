const { deleteTodoReminderByReminderId,
        getAllRemindersByUserId,
        deleteAllRemindersByUserId } = require('../services/reminderService');

const deleteReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(reminderId)) {
            return res.status(400).json({ success: false, message: "Reminder not found" });
        }

        const deletedReminder = await deleteTodoReminderByReminderId(reminderId);

        res.status(200).json({ success: true, data: deletedReminder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getUserReminders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const reminders = await getAllRemindersByUserId(userId);

        res.status(200).json({ success: true, reminders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteUserReminders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const result = await deleteAllRemindersByUserId(userId);

        res.status(200).json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    deleteReminder,
    getUserReminders,
    deleteUserReminders
};