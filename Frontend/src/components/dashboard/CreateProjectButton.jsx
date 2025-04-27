import React from 'react';
import { Plus } from 'lucide-react';

function CreateProjectButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <Plus size={18} />
      <span>New Project</span>
    </button>
  );
}

export default CreateProjectButton;