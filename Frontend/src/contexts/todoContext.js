// ToDoContext.js
import { createContext, useContext } from 'react';

export const ToDoListContext = createContext({
  todos: [],
  setTodos: () => {},
  selectedTodo: undefined,
  setSelectedTodo: () => {}
});

export const useToDoContext = () => useContext(ToDoListContext);