import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletedToDoItem from './DeletedToDoItem'; // Make sure this component exists
const apiUrl = import.meta.env.VITE_API_URL;
const userId = import.meta.env.VITE_USER_ID;

function DeletedToDoList() {
    const [deletedTodos, setDeletedTodos] = useState([]);

    useEffect(() => {
        const fetchDeletedTodos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/todos/trashed/${userId}`);
                if (response.status === 200) {
                    setDeletedTodos(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch deleted todos", error);
            }
        };

        fetchDeletedTodos();
    }, []);

    const handleRestoreTodo = async (id) => {
        const todo = deletedTodos.find(t => t._id === id);
        const response = await axios.put(`${apiUrl}/todos/${id}`, {
            ...todo,
            inTrash: false,
            priorityLevel: todo.priority,
            reminder: todo.reminderTime,
        });

        if (response.status !== 200) {
            throw new Error("Failed to restore deleted todo");
        }

        const updatedTodos = deletedTodos.filter(t => t._id !== id);
        setDeletedTodos(updatedTodos);
    };

    const handleDeletePermanently = async (id) => {
        const response = await axios.delete(`${apiUrl}/todos/${id}`);

        if (response.status !== 200) {
            throw new Error("Failed to delete todo permanently");
        }

        const updatedTodos = deletedTodos.filter(t => t._id !== id);
        setDeletedTodos(updatedTodos);
    };

    return (
        <div className="flex flex-col w-full bg-[#1a1a1a] text-white h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
                <h1 className="text-2xl font-semibold">Trash</h1>
            </div>

            {/* Deleted Todo List */}
            <div className="flex-1 overflow-y-auto">
                {deletedTodos.map(todo => (
                    <DeletedToDoItem key={todo._id} todo={todo} onRestore={handleRestoreTodo} onDeletePermanently={handleDeletePermanently} />
                ))}
            </div>
        </div>
    );
}

export default DeletedToDoList;