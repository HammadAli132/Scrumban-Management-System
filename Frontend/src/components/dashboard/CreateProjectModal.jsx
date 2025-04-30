import React, { useState } from 'react';
import { X, Calendar, Users } from 'lucide-react';


function CreateProjectModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically submit the data to your backend
    console.log('Submitting project:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div 
        className="bg-[#1c1c1c] rounded-xl max-w-md w-full animate-fadeIn shadow-2xl border border-[#2e2d2d]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
          <h3 className="text-xl font-semibold text-white">Create New Project</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#252525] border border-[#3a3939] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-[#252525] border border-[#3a3939] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Brief description of the project"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-[#252525] border border-[#3a3939] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
          </div>
          
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#2e2d2d] hover:bg-[#3a3939] text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;