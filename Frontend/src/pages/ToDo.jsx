import React, { useState } from 'react';

import ToDoDetail from "../components/todo_list/ToDoDetail";
import ToDoList from "../components/todo_list/ToDoList";
import ToDoSidebar from "../components/todo_list/ToDoSidebar";
import { ToDoListContext } from "../contexts/todoContext";

export default function ToDo() {
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
    const [selectedTodo, setSelectedTodo] = useState(undefined);

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
