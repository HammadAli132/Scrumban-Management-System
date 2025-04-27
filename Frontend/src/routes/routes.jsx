import App from "../App.jsx";
import CompletedToDoList from "../components/todo_list/CompletedToDoList.jsx";
import DeletedToDoList from "../components/todo_list/DeletedToDoList.jsx";
import ToDoMain from "../components/todo_list/ToDoMain.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import KanbanBoard from "../pages/KanbanBoard.jsx";
import Login from "../pages/Login.jsx";
import Projects from "../pages/Projects.jsx";
import ToDo from "../pages/ToDo.jsx";
import Repository from "../pages/Repository.jsx";
import DashboardLayout from "../components/dashboard_layout/DashboardLayout.jsx";
import FileView from "../pages/FileView.jsx";
import SignupPage from "../pages/Signup.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "/dashboard",
                element: <DashboardLayout>
                    <Dashboard />
                    </DashboardLayout> ,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/to-do-list",
                element: <DashboardLayout>
                    <ToDo />
                    </DashboardLayout>,
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
                path: "/project/:projectid",
                element: <DashboardLayout>
                    <Projects />
                </DashboardLayout>,
            },
            {
                path: "/project/:projectid/kanban/:kanbanid",
                element: <DashboardLayout>
                    <KanbanBoard />
                </DashboardLayout>,
            },
            {
                path: "/project/:projectid/repository/:repositoryid",
                element: <DashboardLayout>
                    <Repository />
                </DashboardLayout>,
            },
            {
                path: "/project/:projectid/repository/:repositoryid/file/:fileid",
                element: <DashboardLayout>
                    <FileView />
                </DashboardLayout>,
            }
        ],
    },
];

export default routes;