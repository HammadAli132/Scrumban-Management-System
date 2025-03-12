import NavigationBar from "../components/NavigationBar";
import ToDoSidebar from "../components/todo_list/ToDoSidebar";

export default function ToDo() {
    return (
        <div className="flex flex-row w-full h-full">
            <NavigationBar />
            <ToDoSidebar />
        </div>
    )
}
