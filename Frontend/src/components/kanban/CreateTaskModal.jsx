import React, { useState } from 'react';
import { X, Calendar, User, ClipboardList } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function CreateTaskModal({ onClose, onCreate, columnId, sprints = [] }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { kanbanid } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priorityLevel: 'medium',
    status: columnId,
    dueDate: new Date().toISOString().split('T')[0],
    sprintId: sprints.length > 0 ? sprints[0]._id : '',
    comments: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title: task.title,
      description: task.description,
      priorityLevel: task.priorityLevel,
      dueDate: task.dueDate,
      swimLane: task.status,
      sprintId: task.sprintId,
      userId: user.id,
      kanbanBoardId: kanbanid,
    });
    onClose();
  };

  // Format sprint dates for display
  const formatSprintDates = (sprint) => {
    if (!sprint) return '';
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    
    const startFormatted = startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    const endFormatted = endDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] rounded-xl max-w-md w-full animate-fadeIn shadow-2xl border border-[#2e2d2d]">
        <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
          <h2 className="text-xl font-semibold text-white">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full bg-[#252525] text-white rounded-lg p-3"
              required
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full bg-[#252525] text-white rounded-lg p-3 min-h-[100px]"
              required
              placeholder="Describe the task details"
            />
          </div>

          {/* Sprint Selection Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 flex items-center">
              <ClipboardList size={16} className="mr-1" />
              Sprint
            </label>
            <div className="relative">
              <select
                value={task.sprintId}
                onChange={(e) => setTask({ ...task, sprintId: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-3 pr-8 appearance-none border border-[#2e2d2d] focus:border-blue-500 focus:outline-none"
                required
              >
                {sprints.length === 0 ? (
                  <option value="">No sprints available</option>
                ) : (
                  sprints.map((sprint) => (
                    <option key={sprint._id} value={sprint._id}>
                      {sprint.title} ({formatSprintDates(sprint)})
                    </option>
                  ))
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                <Calendar size={16} className="mr-1" />
                Due Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-2 border border-[#2e2d2d] focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Priority
              </label>
              <select
                value={task.priorityLevel}
                onChange={(e) => setTask({ ...task, priorityLevel: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-2 border border-[#2e2d2d] focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}