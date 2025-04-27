import React, { useState } from 'react';
import { X, Calendar, User, MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';



export default function TaskModal({ task, onClose, onUpdate, onDelete }) {
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
      author: 'Current User', // Replace with actual user
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] rounded-xl max-w-2xl w-full animate-fadeIn shadow-2xl border border-[#2e2d2d]">
        <div className="flex justify-between items-center p-6 border-b border-[#2e2d2d]">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="bg-[#252525] text-white text-xl font-semibold px-3 py-1 rounded-lg w-full"
            />
          ) : (
            <h2 className="text-xl font-semibold text-white">{task.title}</h2>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-3 min-h-[100px]"
              />
            ) : (
              <p className="text-gray-300">{task.description}</p>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Due Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className="bg-[#252525] text-white rounded-lg p-2"
                />
              ) : (
                <div className="flex items-center text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  className="bg-[#252525] text-white rounded-lg p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Comments
            </h3>
            <div className="space-y-4 mb-4">
              {editedTask.comments.map((comment) => (
                <div key={comment.id} className="bg-[#252525] rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">{comment.author}</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-gray-300 mt-2">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#252525] text-white rounded-lg px-4 py-2"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="p-6 border-t border-[#2e2d2d] flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}