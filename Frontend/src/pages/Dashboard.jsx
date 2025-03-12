import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div>
            <Link to="/to-do-list"
                className="block p-2 bg-blue-500 text-white text-center w-1/4 mx-auto mt-4 rounded-md"
            >
                View ToDo List
            </Link>
        </div>
    )
}
