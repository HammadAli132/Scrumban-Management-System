import React, { useState } from 'react';
import {
    ArrowUpDown,
    Calendar,
    Clock,
    Flag,
    Plus,
    FlagTriangleRight
} from 'lucide-react';

const TodoListItem = ({ todo }) => {

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
        <div
            key={todo.id}
            className="flex items-center gap-4 p-4 border-b border-[#2e2d2d] hover:bg-[#2e2d2d] group transition-colors"
        >
            <div className="relative">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => setTodos(todos.map(t =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                    ))}
                    className={`w-5 h-5 rounded-sm appearance-none border-2 ${getPriorityColor(todo.priority)} 
                  checked:bg-current checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-[#1a1a1a] transition-colors cursor-pointer`}
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
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
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
    )
}


function ToDoList() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Complete project documentation",
            completed: false,
            priority: "high",
            dueDate: "2024-03-15",
            reminderTime: "14:00"
        },
        {
            id: 2,
            title: "Review pull requests",
            completed: false,
            priority: "medium",
            dueDate: "2024-03-14",
            reminderTime: null
        }
    ]);
    const [newTodo, setNewTodo] = useState("");
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                title: newTodo,
                completed: false,
                priority: selectedPriority,
                dueDate: selectedDate || null,
                reminderTime: selectedTime || null
            }]);
            setNewTodo("");
            setSelectedPriority(null);
            setSelectedDate("");
            setSelectedTime("");
        }
    };

    return (
        <div className="flex flex-col w-2/3 border-r border-[#2e2d2d] bg-[#1a1a1a] text-white h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
                <h1 className="text-2xl font-semibold">Todo List</h1>
                <button className="p-2 hover:bg-[#2e2d2d] rounded-lg transition-colors">
                    <ArrowUpDown size={20} />
                </button>
            </div>

            {/* Add Todo Section */}
            <div className="p-6 border-b border-[#2e2d2d] space-y-4">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full bg-[#2e2d2d] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                />

                <div className="flex gap-4 items-center">
                    {/* Priority Flags */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedPriority('high')}
                            className={`p-2 rounded-lg ${selectedPriority === 'high' ? 'bg-red-500/20' : 'hover:bg-[#2e2d2d]'}`}
                        >
                            <Flag size={20} className="text-red-500" />
                        </button>
                        <button
                            onClick={() => setSelectedPriority('medium')}
                            className={`p-2 rounded-lg ${selectedPriority === 'medium' ? 'bg-yellow-500/20' : 'hover:bg-[#2e2d2d]'}`}
                        >
                            <Flag size={20} className="text-yellow-500" />
                        </button>
                        <button
                            onClick={() => setSelectedPriority('low')}
                            className={`p-2 rounded-lg ${selectedPriority === 'low' ? 'bg-blue-500/20' : 'hover:bg-[#2e2d2d]'}`}
                        >
                            <Flag size={20} className="text-blue-500" />
                        </button>
                    </div>

                    <div className='flex ml-auto gap-5'>
                        {/* Due Date */}
                        <div className="flex gap-2 items-center">
                            <Calendar size={20} className="text-gray-400" />
                            <input
                                type="date"
                                className="bg-[#2e2d2d] rounded-lg p-2 text-sm text-white border border-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [color-scheme:dark]"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        {/* Reminder Time */}
                        <div className="flex gap-2 items-center">
                            <Clock size={20} className="text-gray-400" />
                            <input
                                type="time"
                                className="bg-[#2e2d2d] rounded-lg p-2 text-sm text-white border border-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [color-scheme:dark]"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleAddTodo}
                            className=" bg-blue-500 hover:bg-blue-600 rounded-lg p-2 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>


                </div>
            </div>

            {/* Todo List */}
            <div className="flex-1 overflow-y-auto">
                {todos.map(todo => (
                    <TodoListItem todo={todo} />
                ))}
            </div>
        </div>
    );
}

export default ToDoList;