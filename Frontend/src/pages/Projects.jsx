import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, CheckSquare, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// This would normally come from your API or state management
const dummyProjects = [
  { 
    id: 1, 
    name: "Analytics Dashboard", 
    description: "Data visualization platform for marketing metrics", 
    progress: 75,
    isOwned: true,
    collaborators: 3,
    dueDate: "2023-12-15",
    tasks: [
      { id: 1, title: "Design mockups", completed: true },
      { id: 2, title: "Set up API routes", completed: true },
      { id: 3, title: "Implement data visualization", completed: false },
      { id: 4, title: "Add filter functionality", completed: false },
      { id: 5, title: "Test with real data", completed: false },
    ]
  },
  { 
    id: 2, 
    name: "Mobile App Redesign", 
    description: "UX/UI improvements for the mobile experience", 
    progress: 40,
    isOwned: false,
    collaborators: 5,
    dueDate: "2023-11-30",
    tasks: [
      { id: 1, title: "Review current UI issues", completed: true },
      { id: 2, title: "Create wireframes", completed: true },
      { id: 3, title: "Design new components", completed: false },
      { id: 4, title: "Usability testing", completed: false },
    ]
  },
  // Other projects would be defined here
];

function ProjectDetails() {
  const { projectid } = useParams();
  const projectId = parseInt(projectid || '1', 10);
  
  // Find the project from our dummy data
  const project = dummyProjects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white font-semibold">Project not found</h2>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-400">
            <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">{project.name}</h1>
        <p className="text-gray-400 mt-2">{project.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                Add Task
              </button>
            </div>
            
            <div className="space-y-3">
              {project.tasks.map(task => (
                <div key={task.id} className="flex items-center bg-[#252525] p-4 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    readOnly
                    className="h-5 w-5 text-blue-600 rounded border-gray-500 focus:ring-blue-500"
                  />
                  <span className={`ml-3 ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-6">Activity</h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                  JS
                </div>
                <div className="ml-4">
                  <p className="text-white">
                    <span className="font-medium">John Smith</span>
                    <span className="text-gray-400"> added a new task: </span>
                    <span className="text-blue-400">Test with real data</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                  AK
                </div>
                <div className="ml-4">
                  <p className="text-white">
                    <span className="font-medium">Alex Kim</span>
                    <span className="text-gray-400"> completed task: </span>
                    <span className="text-blue-400">Set up API routes</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                  LM
                </div>
                <div className="ml-4">
                  <p className="text-white">
                    <span className="font-medium">Lisa Moore</span>
                    <span className="text-gray-400"> changed the due date to </span>
                    <span className="text-blue-400">Dec 15, 2023</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Progress</h2>
            
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle 
                    className="text-[#252525]" 
                    strokeWidth="10" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-blue-600" 
                    strokeWidth="10" 
                    strokeDasharray={`${project.progress * 2.51} 251.2`} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{project.progress}%</span>
                </div>
              </div>
              
              <div className="mt-6 w-full">
                <div className="flex items-center mb-2">
                  <CheckSquare size={16} className="text-green-500 mr-2" />
                  <span className="text-white">
                    {project.tasks.filter(t => t.completed).length} / {project.tasks.length} tasks completed
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-blue-500 mr-2" />
                  <span className="text-white">
                    Due on {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="text-yellow-500 mr-2" />
                  <span className="text-white">
                    Updated 2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Team</h2>
            
            <div className="flex -space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#1c1c1c] bg-purple-700 flex items-center justify-center text-white font-medium">
                JS
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#1c1c1c] bg-green-700 flex items-center justify-center text-white font-medium">
                AK
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#1c1c1c] bg-pink-700 flex items-center justify-center text-white font-medium">
                LM
              </div>
              {project.collaborators > 3 && (
                <div className="w-10 h-10 rounded-full border-2 border-[#1c1c1c] bg-gray-700 flex items-center justify-center text-white font-medium">
                  +{project.collaborators - 3}
                </div>
              )}
            </div>
            
            <button className="w-full py-2.5 bg-[#252525] hover:bg-[#2e2d2d] text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center">
              <Users size={16} className="mr-2" />
              Manage Team
            </button>
          </div>
          
          <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
            
            <div className="space-y-4 mb-4">
              <div className="bg-[#252525] p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                    AK
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-medium">Alex Kim</p>
                    <p className="text-gray-400 text-sm mt-1">
                      The API routes are set up, but we need to add authentication to secure endpoints.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                JS
              </div>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="ml-3 bg-[#252525] border-none text-white w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;