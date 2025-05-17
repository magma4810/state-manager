import { store } from './index';
import { TodoState, TodoAction } from '../types';

export const todoActions = {
  addTodo: (text: string) => ({
    type: 'ADD_TODO' as const,
    payload: text
  }),

  toggleTodo: (id: string) => ({
    type: 'TOGGLE_TODO' as const,
    payload: id
  }),

  removeTodo: (id: string) => ({
    type: 'REMOVE_TODO' as const,
    payload: id
  }),

  updateTodo: (id: string, text: string) => ({
    type: 'UPDATE_TODO' as const,
    payload: { id, text }
  }),

  toggleAllTodos: (completed: boolean) => ({
    type: 'TOGGLE_ALL_TODOS' as const,
    payload: completed
  }),

  clearCompletedTodos: () => ({
    type: 'CLEAR_COMPLETED_TODOS' as const
  })
};

export const todoSlice = {
  reducer: (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text: action.payload,
              completed: false
            }
          ]
        };

      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          )
        };

      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        };

      case 'UPDATE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
          )
        };

      case 'TOGGLE_ALL_TODOS':
        return {
          ...state,
          todos: state.todos.map(todo => ({ ...todo, completed: action.payload }))
        };

      case 'CLEAR_COMPLETED_TODOS':
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.completed)
        };

      default:
        return state;
    }
  },

  dispatch: (action: TodoAction) => {
    store.updateState(currentState => 
      todoSlice.reducer(currentState, action)
    );
  }
};

export const addTodo = (text: string) => todoSlice.dispatch(todoActions.addTodo(text));
export const toggleTodo = (id: string) => todoSlice.dispatch(todoActions.toggleTodo(id));
export const removeTodo = (id: string) => todoSlice.dispatch(todoActions.removeTodo(id));
export const updateTodo = (id: string, text: string) => todoSlice.dispatch(todoActions.updateTodo(id, text));
export const toggleAllTodos = (completed: boolean) => todoSlice.dispatch(todoActions.toggleAllTodos(completed));
export const clearCompletedTodos = () => todoSlice.dispatch(todoActions.clearCompletedTodos());