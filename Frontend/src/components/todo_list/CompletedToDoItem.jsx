const CompletedToDoItem = ({ todo, onSelect }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-500 border-red-500';
            case 'medium': return 'text-yellow-500 border-yellow-500';
            case 'low': return 'text-blue-500 border-blue-500';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="flex items-center gap-4 p-4 border-b border-[#2e2d2d] hover:bg-[#2e2d2d] group transition-colors cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={todo.completed === "completed"}
                    onChange={() => onSelect(todo.id)}
                    className={`w-5 h-5 rounded-sm appearance-none border-2 ${getPriorityColor(todo.priority)} 
                        checked:bg-current checked:border-transparent focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors cursor-pointer`}
                />
                {todo.completed && (
                    <svg
                        className="absolute top-0.5 left-0.5 w-4 h-4 text-[#1a1a1a] pointer-events-none"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                )}
            </div>

            <span className="flex-1 font-normal text-sm line-through text-gray-500">
                {todo.title}
            </span>

            {todo.dueDate && (
                <div className="text-right">
                    <div className="font-bold text-sm text-gray-300">
                        {formatDate(todo.dueDate)}
                    </div>
                    {todo.reminderTime && (
                        <div className="text-xs text-gray-400">
                            {formatTime(todo.reminderTime)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompletedToDoItem;
