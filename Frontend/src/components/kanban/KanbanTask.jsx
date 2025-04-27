import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle, Clock, Check, User, Calendar } from 'lucide-react';
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
        <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getPriorityClass(task.priority)}`}>
          {getPriorityIcon(task.priority)}
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <User size={14} className="mr-1" />
          {task.assignee}
        </div>
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {format(new Date(task.dueDate), 'MMM dd')}
        </div>
      </div>
    </div>
  );
}