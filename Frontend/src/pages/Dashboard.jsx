import React, { useEffect, useState } from 'react';
import ProjectCard from "../components/dashboard/ProjectCard";
import TodayTasks from "../components/dashboard/TodayTasks";
import ProjectFilter from "../components/dashboard/ProjectFilter";
import CreateProjectButton from "../components/dashboard/CreateProjectButton";
import { Plus, Search, Loader2 } from 'lucide-react';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [todayTasks, setTodayTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState(null);

  // Filter projects based on ownership and search term
  const filteredProjects = projects.filter(project => {
    if (filterType === 'owned' && !project.isOwner) return false;
    if (filterType === 'collaborated' && project.isOwner) return false;
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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
        setError("Failed to load today's tasks");
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTodayTasks();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects/userprojects/${user.id}`);
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data);
        setError("Failed to load projects");
      } finally {
        setLoadingProjects(false);
      }
    }

    fetchProjects();
  }, []);

  console.log("Projects:", projects);
  

  // Function to transform API project data to match component expectations
  const transformProjectData = (project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    progress: project.kanbanTaskCount > 0 
      ? Math.round((project.completedKanbanTaskCount / project.kanbanTaskCount) * 100)
      : 0,
    isOwned: project.isOwner,
    collaborators: project.collaboratorCount,
    dueDate: project.endDate.split('T')[0]
  });

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
          {loadingTasks ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin text-blue-500 h-8 w-8" />
            </div>
          ) : (
            <TodayTasks tasks={todayTasks} />
          )}
        </div>

        {/* Projects section */}
        <div className="lg:col-span-2">
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Projects</h2>
              <ProjectFilter activeFilter={filterType} onFilterChange={setFilterType} />
            </div>

            {loadingProjects ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-blue-500 h-8 w-8" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                {error}
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((_project) => (
                  <ProjectCard
                    key={_project._id}
                    {...transformProjectData(_project)}
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