import React, { useEffect, useState } from 'react';
import ProjectCard from "../components/dashboard/ProjectCard";
import TodayTasks from "../components/dashboard/TodayTasks";
import ProjectFilter from "../components/dashboard/ProjectFilter";
import CreateProjectButton from "../components/dashboard/CreateProjectButton";
import { Plus, Search } from 'lucide-react';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    name: "Analytics Dashboard",
    description: "Data visualization platform for marketing metrics",
    progress: 75,
    isOwned: true,
    collaborators: 3,
    dueDate: "2023-12-15"
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    description: "UX/UI improvements for the mobile experience",
    progress: 40,
    isOwned: false,
    collaborators: 5,
    dueDate: "2023-11-30"
  },
  {
    id: 3,
    name: "API Integration",
    description: "Connect with third-party payment systems",
    progress: 90,
    isOwned: true,
    collaborators: 2,
    dueDate: "2023-12-05"
  },
  {
    id: 4,
    name: "Documentation",
    description: "Create comprehensive developer docs",
    progress: 30,
    isOwned: true,
    collaborators: 1,
    dueDate: "2023-12-20"
  },
  {
    id: 5,
    name: "Marketing Website",
    description: "Product landing page and content strategy",
    progress: 60,
    isOwned: false,
    collaborators: 4,
    dueDate: "2023-11-28"
  },
];



export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [todayTasks, setTodayTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter projects based on ownership and search term
  const filteredProjects = projects.filter(project => {
    if (filterType === 'owned' && !project.isOwned) return false;
    if (filterType === 'collaborated' && project.isOwned) return false;
    if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    // Fetch today's tasks from the API
    const fetchTodayTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/todos/todaytasks/${user.id}`);
        setTodayTasks(response.data.todayTasks);
      } catch (error) {
        console.error("Error fetching today's tasks:", error);
      }
    };

    fetchTodayTasks();
    console.log("Today's tasks fetched:", todayTasks);

  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects/userprojects/${user.id}`);
        setProjects(response.data.projects);

      } catch (error) {
        console.error("Error fetching projects:", error.response.data);
      }
    }

    fetchProjects();
  }, [])

  console.log("Projects fetched:", projects);
  console.log("Today's tasks fetched:", todayTasks);


  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Project Dashboard</h1>
          <p className="text-gray-400">Manage your projects and today's tasks</p>
        </div>
        <div className="flex mt-4 md:mt-0 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-[#2a2a2a] text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          <CreateProjectButton onClick={() => setShowCreateModal(true)} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's tasks section */}
        <div className="lg:col-span-1">
          <TodayTasks tasks={todayTasks} />
        </div>

        {/* Projects section */}
        <div className="lg:col-span-2">
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Projects</h2>
              <ProjectFilter activeFilter={filterType} onFilterChange={setFilterType} />
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.name}
                    description={project.description}
                    progress={project.progress}
                    isOwned={project.isOwned}
                    collaborators={project.collaborators}
                    dueDate={project.endDate.split('T')[0]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No projects found matching your criteria</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center mx-auto hover:bg-blue-700 transition-colors"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={16} className="mr-2" /> Create New Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}