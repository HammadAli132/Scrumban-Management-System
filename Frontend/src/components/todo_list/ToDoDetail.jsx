import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Flag as Flag2 } from 'lucide-react';
import { useToDoContext } from '../../contexts/todoContext';

export default function ToDoDetail() {
    const { selectedTodo } = useToDoContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.title || '');
            setDescription(selectedTodo.description || '');
            setDueDate(selectedTodo.dueDate || 'No Due Date');
            setTime(selectedTodo.reminderTime || 'No Reminder');
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
        selectedTodo.title = title;
        selectedTodo.description = description;
        selectedTodo.dueDate = dueDate;
        selectedTodo.reminderTime = time;
        selectedTodo.priority = priority;

        // You might want to call a context method here to trigger a refresh/re-render
        console.log('Todo saved:', selectedTodo);
    };

    const handleDelete = () => {
        // Handle delete logic here
        console.log('Deleting selectedTodo:', selectedTodo.id);
    };

    return (
        <div className="flex flex-col w-1/3 border-l border-[#2e2d2d] bg-[#1c1c1c] text-gray-200">
            {/* Top Meta Info */}
            <div className="p-6 border-b border-[#2e2d2d] space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Flag2 className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{priority}</span>
                    </div>
                </div>
            </div>

            {/* Description */}
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
