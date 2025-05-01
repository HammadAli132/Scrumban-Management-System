import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL


const columns = [
  { id: 'ToDo', title: 'To Do', color: 'border-red-500/20' },
  { id: 'Doing', title: 'In Progress', color: 'border-yellow-500/20' },
  { id: 'Done', title: 'Done', color: 'border-green-500/20' },
];

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function KanbanBoard() {
  const { projectid, kanbanid } = useParams();
  const [tasks, setTasks] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState('priority');
  const [createColumnId, setCreateColumnId] = useState('');
  const [sprints, setSprints] = useState([]);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/kanban/kanbantasks/${kanbanid}`);
      if (response.data.success) {
        setTasks(response.data.tasks.map((task) => ({
          ...task,
          id: task._id, // Use _id from the response as the task ID 
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : null, // Format date to YYYY-MM-DD
        })));
      } else {
        console.error('Failed to fetch tasks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchSprints = async () => {
    try {
      const response = await axios.get(`${apiUrl}/sprints/sprints/${projectid}`);
      if (response.data.success) {
        setSprints(response.data.sprints);
      } else {
        console.error('Failed to fetch sprints:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching sprints:', error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [changed]);


  useEffect(() => {
    const initializeTasks = async () => {
      await fetchTasks();
      await fetchSprints();
      setLoading(false);
    }
    initializeTasks();

  }, []);



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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overColumn = columns.find((col) => col.id === over.id);

    if (!activeTask) return;

    try {
      await axios.put(`${apiUrl}/kanban/swimlane/${activeTask.id}`, {
        swimLane: overColumn.id,
      });
      if (overColumn) {
        setTasks((tasks) =>
          tasks.map((t) =>
            t.id === activeTask.id ? { ...t, swimLane: overColumn.id } : t
          )
        );
      }
      setChanged(!changed);
    } catch (error) {
      console.error('Error updating task:', error);
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

  const handleTaskUpdate = async (updatedTask) => {
    try {
      await axios.put(`${apiUrl}/kanban/kanbantask/${updatedTask.id}`, updatedTask);
      setChanged(!changed);
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setSelectedTask(null);
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/kanban/kanbantask/${taskId}`);
      setChanged(!changed);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setSelectedTask(null);
  };

  const handleNewTask = async (task) => {
    try {
      await axios.post(`${apiUrl}/kanban/${projectid}`, task);
      setChanged(!changed);
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setShowCreateModal(false);
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = (columnId) => {
    let filteredTasks = tasks.filter((task) => task.swimLane === columnId);



    // Apply sorting
    return filteredTasks.sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityWeight[b.priorityLevel] - priorityWeight[a.priorityLevel];
      } else {
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
      }
    });
  };

  if (loading) {
    return <div className="text-white w-full flex items-center justify-center">Loading...</div>;
  }

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
          sprints={sprints}
        />
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
          sprints={sprints}
          setChanged={setChanged}
        />
      )}
    </div>
  );
}