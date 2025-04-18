import React, { useState } from 'react';
import {
    ArrowUpDown,
    Calendar,
    Clock,
    Flag,
    Plus
} from 'lucide-react';
import ToDoItem from './ToDoItem';
import { useToDoContext } from '../../contexts/todoContext';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const userId = import.meta.env.VITE_USER_ID;

function ToDoList() {
    const { todos, setTodos } = useToDoContext();
    const [newTodo, setNewTodo] = useState("");
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleSelectTodoCheckbox = async (id) => {
        const todo = todos.find(t => t.id === id);
        const response = await axios.put(`${apiUrl}/todos/${id}`, {
            ...todo,
            status: todo.completed === "completed" ? "pending" : "completed",
            priorityLevel: todo.priority,
            reminder: todo.reminderTime,
        });

        if (response.status !== 200) {
            throw new Error("Failed to update todo status");
        }

        setTodos(todos.map(t =>
            t.id === id ? { ...t, completed: t.completed === "completed" ? "pending" : "completed" } : t
        ))
    }

    const handleAddTodo = async () => {
        const response = await axios.post(`${apiUrl}/todos/${userId}`, {
            title: newTodo,
            status: "pending",
            priorityLevel: selectedPriority,
            dueDate: selectedDate,
            reminder: selectedTime,
            description: null,
            notes: null,
            inTrash: false,
        });

        if (response.status !== 201) {
            throw new Error("Failed to add todo");
        }

        const { data } = response.data;

        if (newTodo.trim()) {
            setTodos([...todos, {
                id: data._id,
                title: data.title,
                completed: data.status,
                priority: data.priorityLevel,
                dueDate: data.dueDate,
                reminderTime: data.reminder,
                description: data.description,
                notes: data.notes,
                inTrash: data.inTrash,
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
                            className={`p-2 rounded-lg ${selectedPriority === 'high' ? 'bg-red-500/20' : 'hover:bg-[#2e2d2d]'} cursor-pointer`}
                        >
                            <Flag size={20} className="text-red-500" />
                        </button>
                        <button
                            onClick={() => setSelectedPriority('medium')}
                            className={`p-2 rounded-lg ${selectedPriority === 'medium' ? 'bg-yellow-500/20' : 'hover:bg-[#2e2d2d]'} cursor-pointer`}
                        >
                            <Flag size={20} className="text-yellow-500" />
                        </button>
                        <button
                            onClick={() => setSelectedPriority('low')}
                            className={`p-2 rounded-lg ${selectedPriority === 'low' ? 'bg-blue-500/20' : 'hover:bg-[#2e2d2d]'} cursor-pointer`}
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
                                className="bg-[#2e2d2d] rounded-lg p-2 text-sm text-white border border-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [color-scheme:dark] cursor-pointer"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        {/* Reminder Time */}
                        <div className="flex gap-2 items-center">
                            <Clock size={20} className="text-gray-400" />
                            <input
                                type="time"
                                className="bg-[#2e2d2d] rounded-lg p-2 text-sm text-white border border-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [color-scheme:dark] cursor-pointer"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleAddTodo}
                            className=" bg-blue-500 hover:bg-blue-600 rounded-lg p-2 transition-colors cursor-pointer"
                        >
                            <Plus size={20} />
                        </button>
                    </div>


                </div>
            </div>

            {/* Todo List */}
            <div className="flex-1 overflow-y-auto">
                {todos.map(todo => (
                    <ToDoItem key={todo.id} todo={todo} onSelect={handleSelectTodoCheckbox}/>
                ))}
            </div>
        </div>
    );
}

export default ToDoList;