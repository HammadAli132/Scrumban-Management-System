import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle, Clock, Check, User, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function KanbanTask({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={14} className="text-red-400" />;
      case 'medium':
        return <Clock size={14} className="text-yellow-400" />;
      case 'low':
        return <Check size={14} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return '';
    }
  };

  // Get comment count
  const commentCount = task.comments ? task.comments.length : 0;
  
  // Format sprint dates
  const formatSprintDates = () => {
    if (!task.sprintId) return '';
    
    const start = format(new Date(task.sprintId.startDate), 'MMM dd');
    const end = format(new Date(task.sprintId.endDate), 'MMM dd');
    
    return `${start} - ${end}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-[#252525] rounded-lg p-4 cursor-grab shadow-sm
        border border-[#2e2d2d] hover:border-blue-500/50
        transition-colors duration-200
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-white font-medium">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getPriorityClass(task.priorityLevel)}`}>
          {getPriorityIcon(task.priorityLevel)}
          {task.priorityLevel}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>
      
      {/* Sprint information */}
      {task.sprintId && (
        <div className="mb-3 text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded flex items-center gap-1">
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            {task.sprintId.title}
          </div>
          <span className="mx-1">•</span>
          <div>{formatSprintDates()}</div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-700 pt-2">
        <div className="flex items-center">
          <User size={12} className="mr-1" />
          {task.userId.username}
        </div>
        
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {format(new Date(task.dueDate), 'MMM dd')}
        </div>
        
        {/* Comments count */}
        {commentCount > 0 && (
          <div className="flex items-center">
            <MessageSquare size={12} className="mr-1" />
            {commentCount}
          </div>
        )}
      </div>
    </div>
  );
}