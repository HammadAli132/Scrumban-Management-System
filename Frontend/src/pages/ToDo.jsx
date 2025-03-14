import React, { useState } from 'react';

import ToDoDetail from "../components/todo_list/ToDoDetail";
import ToDoList from "../components/todo_list/ToDoList";
import ToDoSidebar from "../components/todo_list/ToDoSidebar";

export default function ToDo() {
    const [selectedTodo] = useState({
        id: 1,
        title: "SE Meeting",
        description: "Software Engineering team meeting to discuss project progress and upcoming milestones.",
        dueDate: "Mar 10, 2024",
        time: "22:15",
        priority: "High",
        tags: ["University", "Meeting", "Important"]
      });
    return (
        <div className="flex flex-row w-full h-full">
            <ToDoSidebar />
            <ToDoList />
            <ToDoDetail todo={selectedTodo}  />
        </div>
    )
}
