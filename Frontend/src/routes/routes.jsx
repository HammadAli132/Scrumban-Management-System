import App from "../App.jsx";
import CompletedToDoList from "../components/todo_list/CompletedToDoList.jsx";
import DeletedToDoList from "../components/todo_list/DeletedToDoList.jsx";
import ToDoMain from "../components/todo_list/ToDoMain.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import KanbanBoard from "../pages/KanbanBoard.jsx";
import Login from "../pages/Login.jsx";
import Projects from "../pages/Projects.jsx";
import ToDo from "../pages/ToDo.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/to-do-list",
                element: <ToDo />,
                children: [
                    {
                        index: true,
                        element: <ToDoMain />,
                    },
                    {
                        path: "/to-do-list/completed",
                        element: <CompletedToDoList />,
                    },
                    {
                        path: "/to-do-list/deleted",
                        element: <DeletedToDoList />,
                    }
                ],
            },
            {
                path: "/kanban-board/:projectId",
                element: <KanbanBoard />,
            },
            {
                path: "/project/:projectId",
                element: <Projects />,
            },
        ],
    },
];

export default routes;