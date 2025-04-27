import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import KanbanColumn from '../components/kanban/KanbanColumn';
import KanbanTask from '../components/kanban/KanbanTask';
import KanbanFilters from '../components/kanban/KanbanFilters';
import CreateTaskModal from '../components/kanban/CreateTaskModal';
import TaskModal from '../components/kanban/TaskModal';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { compareAsc, parseISO } from 'date-fns';

const defaultTasks = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for the project',
    status: 'todo',
    priority: 'high',
    assignee: 'John Smith',
    dueDate: '2024-03-15',
    comments: [],
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate third-party APIs for payment processing',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Alex Kim',
    dueDate: '2024-03-20',
    comments: [],
    createdAt: '2024-03-02T10:00:00Z'
  },
  {
    id: '3',
    title: 'User Authentication',
    description: 'Implement secure user authentication flow',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Lisa Moore',
    dueDate: '2024-03-10',
    comments: [],
    createdAt: '2024-03-03T10:00:00Z'
  },
  {
    id: '4',
    title: 'Database Schema',
    description: 'Design and implement database schema',
    status: 'done',
    priority: 'medium',
    assignee: 'John Smith',
    dueDate: '2024-03-25',
    comments: [],
    createdAt: '2024-03-04T10:00:00Z'
  },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-red-500/20' },
  { id: 'in-progress', title: 'In Progress', color: 'border-yellow-500/20' },
  { id: 'done', title: 'Done', color: 'border-green-500/20' },
];

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function KanbanBoard() {
  const { projectid } = useParams();
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [createColumnId, setCreateColumnId] = useState('');

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overColumn = columns.find((col) => col.id === over.id);

    if (!activeTask) return;

    if (overColumn) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === activeTask.id ? { ...t, status: overColumn.id } : t
        )
      );
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const handleCreateTask = (columnId) => {
    setCreateColumnId(columnId);
    setShowCreateModal(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(null);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTask(null);
  };

  const handleNewTask = (task) => {
    setTasks([...tasks, task]);
    setShowCreateModal(false);
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = (columnId) => {
    let filteredTasks = tasks.filter((task) => task.status === columnId);

    // Apply date filter
    if (dateFilter) {
      filteredTasks = filteredTasks.filter(
        (task) => task.dueDate === dateFilter
      );
    }

    // Apply sorting
    return filteredTasks.sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      } else {
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
      }
    });
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6">
        <Link to={`/project/${projectid}`} className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Project
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Project Tasks</h1>
          <div className="flex items-center gap-4">
            <KanbanFilters
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={getFilteredAndSortedTasks(column.id)}
              onCreateTask={() => handleCreateTask(column.id)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask ? (
              <div className="w-[calc(100vw-4rem)] md:w-[350px]">
                <KanbanTask task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleNewTask}
          columnId={createColumnId}
        />
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
}