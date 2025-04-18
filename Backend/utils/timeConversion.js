const parseReminderDate = (reminderTime, dueDateString, timezoneOffset = '+05:00') => {
    if (!reminderTime) return null;

    let dateToUse;

    if (dueDateString) {
        dateToUse = new Date(dueDateString);
    } else {
        dateToUse = new Date();
    }

    if (isNaN(dateToUse)) return null;

    const yyyy = dateToUse.getFullYear();
    const mm = String(dateToUse.getMonth() + 1).padStart(2, '0');
    const dd = String(dateToUse.getDate()).padStart(2, '0');

    const isoString = `${yyyy}-${mm}-${dd}T${reminderTime}:00${timezoneOffset}`;
    const finalDate = new Date(isoString);

    return isNaN(finalDate) ? null : finalDate;
};

module.exports = {
    parseReminderDate
};