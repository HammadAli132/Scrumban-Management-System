// ToDoContext.js
import { createContext, useContext } from 'react';

export const ToDoListContext = createContext({
  todos: [],
  setTodos: () => {},
  selectedTodo: undefined,
  setSelectedTodo: () => {}
});

export const CompletedToDoListContext = createContext({
  completedToDos: [],
  setCompletedToDos: () => {},
});

export const useToDoContext = () => useContext(ToDoListContext);
export const useCompToDoContext = () => useContext(CompletedToDoListContext);