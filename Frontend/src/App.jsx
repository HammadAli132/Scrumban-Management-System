import { Outlet } from "react-router-dom";
import ToDoSidebar from "./components/todo_list/ToDoSidebar";

export default function App() {
    return (
      <>
        <ToDoSidebar />
        <Outlet />
      </>
    );
}
