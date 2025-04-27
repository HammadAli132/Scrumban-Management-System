import React from 'react';


function ProjectFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex items-center">
      <div className="bg-[#252525] rounded-lg p-1 flex items-center">
        <button
          className={`px-3 py-1.5 text-sm rounded-md transition-all ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md transition-all ${
            activeFilter === 'owned'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => onFilterChange('owned')}
        >
          My Projects
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md transition-all ${
            activeFilter === 'collaborated'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => onFilterChange('collaborated')}
        >
          Collaborations
        </button>
      </div>
    </div>
  );
}

export default ProjectFilter;