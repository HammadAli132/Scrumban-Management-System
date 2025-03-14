import React, { useState } from 'react';
import { Calendar, Clock, Flag as Flag2, Tags } from 'lucide-react';


export default function ToDoDetail({ todo }) {
    const [description, setDescription] = useState(todo?.description || '');

    if (!todo) {
        return (
            <div className="flex flex-col w-1/3 border-l border-[#2e2d2d] bg-[#1c1c1c] p-6">
                <p className="text-gray-400 text-center mt-10">Select a task to view details</p>
            </div>
        );
    }

    const handleSave = () => {
        // Handle save logic here
        console.log('Saving todo with description:', description);
    };

    const handleDelete = () => {
        // Handle delete logic here
        console.log('Deleting todo:', todo.id);
    };

    return (
        <div className="flex flex-col w-1/3 border-l border-[#2e2d2d] bg-[#1c1c1c] text-gray-200">
            {/* Top Meta Info */}
            <div className="p-6 border-b border-[#2e2d2d] space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{todo.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{todo.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Flag2 className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{todo.priority}</span>
                    </div>
                </div>

            </div>
            <div className="flex-1 p-6 space-y-6">
                <h2 className="text-xl ml-[10px] font-semibold">{todo.title}</h2>

                {/* Content */}

                {/* Description */}
                <div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-96 bg-transparent rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-gray-500 resize-none"
                        placeholder="Notes..."
                    />
                </div>

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
