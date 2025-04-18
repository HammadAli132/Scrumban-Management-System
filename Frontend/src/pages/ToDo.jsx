import React, { useEffect, useState } from 'react';

import ToDoDetail from "../components/todo_list/ToDoDetail";
import ToDoList from "../components/todo_list/ToDoList";
import ToDoSidebar from "../components/todo_list/ToDoSidebar";
import { ToDoListContext } from "../contexts/todoContext";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const userId = import.meta.env.VITE_USER_ID;

export default function ToDo() {
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(undefined);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/todos/${userId}`);
                if (response.status !== 200) {
                    throw new Error("Failed to fetch todos");
                }
                let fetchedTodos = response.data.data
                fetchedTodos = fetchedTodos.map((todo) => {
                    return {
                        id: todo._id,
                        title: todo.title,
                        completed: todo.status,
                        priority: todo.priorityLevel,
                        dueDate: todo.dueDate || null,
                        reminderTime: todo.reminder || null,
                        description: todo.description || null,
                        notes: todo.notes || null,
                        inTrash: todo.inTrash || false,
                    };
                })
                setTodos(fetchedTodos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <ToDoListContext.Provider value={{ todos, setTodos, selectedTodo, setSelectedTodo }}>
            <div className="flex flex-row w-full h-full">
                <ToDoSidebar />
                <ToDoList />
                <ToDoDetail />
            </div>
        </ToDoListContext.Provider>
    )
}
