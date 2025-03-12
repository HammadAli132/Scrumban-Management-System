import App from "../App.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
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
            },
            {
                path: "/kanban-board",
                element: <ToDo />,
            },
        ],
    },
];

export default routes;