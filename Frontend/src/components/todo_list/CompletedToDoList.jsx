import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompletedToDoItem from './CompletedToDoItem';
const apiUrl = import.meta.env.VITE_API_URL;


function CompletedToDoList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const fetchCompletedTodos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/todos/completed/${user.id}`);
                if (response.status === 200) {
                    setCompletedTodos(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch completed todos", error);
            }
        };

        fetchCompletedTodos();
    }, []);

    const handleSelectTodoCheckbox = async (id) => {
        const todo = completedTodos.find(t => t._id === id);
        const response = await axios.put(`${apiUrl}/todos/${id}`, {
            ...todo,
            status: "pending",
            priorityLevel: todo.priority,
            reminder: todo.reminderTime,
        });

        if (response.status !== 200) {
            throw new Error("Failed to update todo status");
        }

        const updatedTodos = completedTodos.filter(t => t._id !== id);
        setCompletedTodos(updatedTodos);
    }

    return (
        <div className="flex flex-col w-full bg-[#1a1a1a] text-white h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
                <h1 className="text-2xl font-semibold">Completed To-Dos</h1>
            </div>

            {/* Completed Todo List */}
            <div className="flex-1 overflow-y-auto">
                {completedTodos.map(todo => (
                    <CompletedToDoItem key={todo._id} todo={todo} onSelect={handleSelectTodoCheckbox} />
                ))}
            </div>
        </div>
    );
}

export default CompletedToDoList;
