import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import KanbanTask from './KanbanTask';
import { Plus } from 'lucide-react';


export default function KanbanColumn({ 
  id, 
  title, 
  tasks, 
  color,
  onCreateTask,
  onTaskClick
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#1c1c1c] rounded-xl shadow-lg border-t-2 ${color} flex flex-col h-[calc(100vh-12rem)]`}
    >
      <div className="p-4 border-b border-[#2e2d2d]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 bg-[#252525] px-2 py-1 rounded">
              {tasks.length}
            </span>
            <button
              onClick={onCreateTask}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} onClick={() => onTaskClick(task)}>
                <KanbanTask task={task} />
              </div>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}