import ToDoDetail from "../components/todo_list/ToDoDetail";
import ToDoList from "../components/todo_list/ToDoList";
import ToDoSidebar from "../components/todo_list/ToDoSidebar";

export default function ToDo() {
    return (
        <div className="flex flex-row w-full h-full">
            <ToDoSidebar />
            <ToDoList />
            <ToDoDetail />
        </div>
    )
}
