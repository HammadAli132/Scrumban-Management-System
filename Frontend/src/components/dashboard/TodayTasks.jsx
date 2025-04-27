import React from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';


function TodayTasks({ tasks }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-400" />;
      case 'low':
        return <Check size={16} className="text-green-400" />;
      default:
        return <Check size={16} className="text-green-400" />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-green-500';
    }
  };

  return (
    <div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Today's Tasks</h2>
        <span className="text-sm text-gray-400">{tasks.length} tasks</span>
      </div>

      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`border-l-4 ${getPriorityClass(task.priority)} bg-[#252525] rounded-r-lg p-4 cursor-pointer transform transition-all hover:translate-x-1 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium mb-1">{task.title}</h3>
                  <p className="text-gray-400 text-sm">{task.project}</p>
                </div>
                <div className="flex items-center ml-2">
                  {getPriorityIcon(task.priority)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks scheduled for today</p>
        </div>
      )}
      
      <button className="w-full mt-6 py-2.5 bg-[#2e2d2d] hover:bg-[#3a3939] text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
        View All Tasks
      </button>
    </div>
  );
}

export default TodayTasks;