import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isPast, isToday } from 'date-fns';
import { Users, Calendar } from 'lucide-react';
import { generateAvatar } from '../../../utils/avatarUtils';


function ProjectCard({ id, title, description, progress, isOwned, collaborators, dueDate }) {
  const navigate = useNavigate();
  const avatar = generateAvatar(title);

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  // Determine status classes
  let statusClasses = "text-xs font-medium px-2.5 py-0.5 rounded";
  let statusText = "";
  
  if (isPast(new Date(dueDate)) && !isToday(new Date(dueDate))) {
    statusClasses += " bg-red-900/50 text-red-300";
    statusText = "Overdue";
  } else if (isToday(new Date(dueDate))) {
    statusClasses += " bg-yellow-900/50 text-yellow-300";
    statusText = "Due Today";
  } else if (progress === 100) {
    statusClasses += " bg-green-900/50 text-green-300";
    statusText = "Completed";
  } else if (progress > 75) {
    statusClasses += " bg-blue-900/50 text-blue-300";
    statusText = "Almost Done";
  } else {
    statusClasses += " bg-purple-900/50 text-purple-300";
    statusText = "In Progress";
  }

  return (
    <div 
      className="border border-[#2e2d2d] bg-gradient-to-br from-[#1c1c1c] to-[#252525] p-5 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:border-blue-900/50 group"
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: avatar.bgColor }}
        >
          {avatar.initials}
        </div>
        
        <div className="w-full overflow-hidden">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-blue-400 transition-colors">{title}</h3>
            <span className={statusClasses}>{statusText}</span>
          </div>
          
          <p className="text-gray-400 mt-1 text-sm line-clamp-2">{description}</p>
          
          <div className="mt-4">
            <div className="mb-1 flex justify-between">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-xs text-blue-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(to right, #3B82F6, #6366F1)` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>{collaborators} {collaborators === 1 ? 'collaborator' : 'collaborators'}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{format(new Date(dueDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;