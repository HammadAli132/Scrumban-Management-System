import React, { useEffect, useState } from 'react';
import { Flag as Flag2 } from 'lucide-react';
import { useToDoContext } from '../../contexts/todoContext';

export default function ToDoDetail() {
    const { selectedTodo, setSelectedTodo, todos, setTodos } = useToDoContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState('');

    // Helper function to format date for input[type="date"]
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Helper function to format time for input[type="time"] (24-hour format)
    const formatTimeForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.title || '');
            setDescription(selectedTodo.description || '');
            setDueDate(formatDateForInput(selectedTodo.dueDate) || '');
            setTime(formatTimeForInput(selectedTodo.reminderTime) || '');
            setPriority(selectedTodo.priority || '');
        }
    }, [selectedTodo]);

    if (!selectedTodo) {
        return (
            <div className="flex flex-col w-1/3 border-l border-[#2e2d2d] bg-[#1c1c1c] p-6">
                <p className="text-gray-400 text-center mt-10">Select a task to view details</p>
            </div>
        );
    }

    const handleSave = () => {
        // Create updated todo object
        // Convert dueDate and time back to ISO strings.
        const updatedTodo = {
            ...selectedTodo,
            title,
            description,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            // Use the dueDate and time to create a new ISO date string for reminder.
            reminder: time ? new Date(`${dueDate}T${time}Z`).toISOString() : null,
            priority
        };

        // Update the todos array
        const updatedTodos = todos.map(todo => 
            todo.id === selectedTodo.id ? updatedTodo : todo
        );

        setTodos(updatedTodos);
        setSelectedTodo(updatedTodo);
    };

    const handleDelete = () => {
        const filteredTodos = todos.filter((todo) => todo.id !== selectedTodo.id);
        setSelectedTodo(undefined);
        setTodos(filteredTodos);
    };

    const inputClass = "bg-[#2e2d2d] rounded-lg p-2 text-sm text-white border border-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [color-scheme:dark] cursor-pointer";

    const flagColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-blue-500';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="flex flex-col w-1/3 border-l border-[#2e2d2d] bg-[#1c1c1c] text-gray-200">
            {/* Top Meta Info (Editable) */}
            <div className="p-6 border-b border-[#2e2d2d] space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 w-1/3">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={`${inputClass} w-full`}
                            placeholder="Due Date"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-1/3">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className={`${inputClass} w-full`}
                            placeholder="Reminder Time"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-1/3 justify-end">
                        <Flag2 className={`w-4 h-4 ${flagColor(priority)}`} />
                        <span className="text-sm">{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-none text-xl font-semibold mb-4 focus:outline-none focus:border-gray-300"
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-96 bg-transparent rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-gray-500 resize-none"
                    placeholder="Notes..."
                />
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-[#2e2d2d] flex justify-end space-x-4">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-200 hover:cursor-pointer hover:bg-red-500 rounded-xl transition-colors"
                >
                    Delete
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors hover:cursor-pointer"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}