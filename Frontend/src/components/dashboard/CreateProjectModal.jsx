import React, { useState, useEffect } from 'react';
import { X, Calendar, Users } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios
const apiUrl = import.meta.env.VITE_API_URL; // Adjust this if needed

function CreateProjectModal({ onClose, setOnProjectCreated }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    title: '', // Changed from 'name' to 'title' to match backend
    description: '',
    startDate: new Date().toISOString().split('T')[0], // Today's date as default
    endDate: '', // Changed from 'dueDate' to 'endDate' to match backend
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set minimum date for endDate input (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('endDate')?.setAttribute('min', today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project name is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'Due date is required';
    } else {
      const endDate = new Date(formData.endDate);
      if (endDate < today) {
        newErrors.endDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${apiUrl}/projects/${user.id}`,
        {
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setOnProjectCreated(true); // Notify parent component about the new project
        onClose(); // Close the modal on success
        // You might want to add a success notification here
      } else {
        console.error('Failed to create project:', response.data.message);
        // Handle API-level errors (like validation errors from server)
        setErrors(prev => ({
          ...prev,
          apiError: response.data.message || 'Failed to create project'
        }));
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setErrors(prev => ({
        ...prev,
        apiError: error.response?.data?.error || 'An unexpected error occurred'
      }));
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {errors.apiError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">
              {errors.apiError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 bg-[#252525] border ${errors.title ? 'border-red-500' : 'border-[#3a3939]'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter project name"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
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
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-400 mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-[#252525] border border-[#3a3939] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-400 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-2 bg-[#252525] border ${errors.endDate ? 'border-red-500' : 'border-[#3a3939]'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-400">{errors.endDate}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#2e2d2d] hover:bg-[#3a3939] text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;