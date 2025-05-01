import React, { useState } from 'react';
import { X, Calendar, User, MessageSquare, Edit2, Trash2, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskModal({ task, onClose, onUpdate, onDelete, sprints = [] }) {
  const user = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState('');

  if (!task || !editedTask) return null;

  const handleUpdate = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      text: newComment,
      userId: {
        _id: user.id, // Replace with actual user ID
        username: "Current User" // Replace with actual username
      },
      createdAt: new Date().toISOString(),
    };

    setEditedTask({
      ...editedTask,
      comments: [...editedTask.comments, comment],
    });
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    setEditedTask({
      ...editedTask,
      comments: editedTask.comments.filter((c) => c.id !== commentId),
    });
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

  // Find current sprint object based on sprintId
  const getCurrentSprint = () => {
    if (!editedTask.sprintId) return null;
    if (typeof editedTask.sprintId === 'object') return editedTask.sprintId;
    return sprints.find(s => s._id === editedTask.sprintId);
  };

  const currentSprint = getCurrentSprint();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] rounded-xl max-w-lg w-full animate-fadeIn shadow-2xl border border-[#2e2d2d] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-[#2e2d2d]">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="bg-[#252525] text-white text-lg font-semibold px-3 py-1 rounded-lg w-full border border-[#2e2d2d] focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-lg font-semibold text-white truncate">{task.title}</h2>
          )}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 space-y-4 flex-grow">
          {/* Two columns for Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Status
              </label>
              {isEditing ? (
                <select
                  value={editedTask.swimLane || editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, swimLane: e.target.value })}
                  className="bg-[#252525] text-white rounded-lg p-1 text-sm border border-[#2e2d2d] focus:border-blue-500 focus:outline-none w-full"
                >
                  <option value="ToDo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="InReview">In Review</option>
                  <option value="Done">Done</option>
                </select>
              ) : (
                <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                  {task.swimLane || task.status}
                </span>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={editedTask.priority || editedTask.priorityLevel}
                  onChange={(e) => setEditedTask({ 
                    ...editedTask, 
                    priority: e.target.value,
                    priorityLevel: e.target.value 
                  })}
                  className="bg-[#252525] text-white rounded-lg p-1 text-sm border border-[#2e2d2d] focus:border-blue-500 focus:outline-none w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  (task.priority === 'high' || task.priorityLevel === 'high') ? 'bg-red-500/20 text-red-400' :
                  (task.priority === 'medium' || task.priorityLevel === 'medium') ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {(task.priority || task.priorityLevel).charAt(0).toUpperCase() + (task.priority || task.priorityLevel).slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-2 min-h-[80px] border border-[#2e2d2d] focus:border-blue-500 focus:outline-none text-sm"
              />
            ) : (
              <p className="text-gray-300 text-sm max-h-24 overflow-y-auto">{task.description}</p>
            )}
          </div>

          {/* Date and Sprint in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Due Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className="bg-[#252525] text-white rounded-lg p-1 text-sm border border-[#2e2d2d] focus:border-blue-500 focus:outline-none w-full"
                />
              ) : (
                <div className="flex items-center text-gray-300 text-xs">
                  <Calendar size={14} className="mr-1" />
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </div>
              )}
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 flex items-center">
                <ClipboardList size={14} className="mr-1" />
                Sprint
              </label>
              {isEditing ? (
                <select
                  value={typeof editedTask.sprintId === 'object' ? editedTask.sprintId._id : editedTask.sprintId}
                  onChange={(e) => setEditedTask({ ...editedTask, sprintId: e.target.value })}
                  className="bg-[#252525] text-white rounded-lg p-1 text-sm border border-[#2e2d2d] focus:border-blue-500 focus:outline-none w-full"
                >
                  {sprints.length === 0 ? (
                    <option value="">No sprints available</option>
                  ) : (
                    sprints.map((sprint) => (
                      <option key={sprint._id} value={sprint._id}>
                        {sprint.title}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <div className="text-xs">
                  {currentSprint ? (
                    <div className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded inline-block">
                      {currentSprint.title}
                    </div>
                  ) : (
                    <span className="text-gray-400">No sprint</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Created By
            </label>
            <div className="flex items-center text-gray-300 text-sm">
              <User size={14} className="mr-1" />
              {task.userId && task.userId.username ? task.userId.username : 'Unassigned'}
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2 flex items-center">
              <MessageSquare size={14} className="mr-1" />
              Comments ({editedTask.comments.length})
            </h3>
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
              {editedTask.comments.map((comment) => (
                <div key={comment.id || comment._id} className="bg-[#252525] rounded-lg p-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
                        {comment.userId && comment.userId.username 
                          ? comment.userId.username.charAt(0).toUpperCase()
                          : (comment.author ? comment.author.charAt(0).toUpperCase() : 'U')}
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium text-white">
                          {comment.userId && comment.userId.username ? comment.userId.username : (comment.author || 'User')}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(comment.createdAt), 'MMM d')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id || comment._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="text-gray-300 mt-1 text-xs">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#252525] text-white rounded-lg px-3 py-1 text-sm border border-[#2e2d2d] focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="p-4 border-t border-[#2e2d2d] flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}