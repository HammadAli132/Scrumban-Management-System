const Reminder = require('../models/reminder');

const deleteTodoReminderByReminderId = async (reminderId) => {
    try {
        if (!reminderId) {
            throw new Error("Reminder ID is required");
        }

        const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

        if (!deletedReminder) {
            throw new Error("Reminder not found");
        }

        return deletedReminder;
    } catch (error) {
        throw new Error("Error deleting reminder: " + error.message);
    }
};

const getAllRemindersByUserId = async (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const reminders = await Reminder.find({ userId });

        return reminders;
    } catch (error) {
        throw new Error("Error deleting reminder: " + error.message);
    }
};

const deleteAllRemindersByUserId = async (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const result = await Reminder.deleteMany({ userId });

        return result.deletedCount;
    } catch (error) {
        throw new Error("Error deleting reminders: " + error.message);
    }
}

module.exports = {
    deleteTodoReminderByReminderId,
    getAllRemindersByUserId,
    deleteAllRemindersByUserId
}