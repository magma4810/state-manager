export type Todo = {
    id: string;
    text: string;
    completed: boolean;
}

export type TodoState = {
    todos: Todo[];
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_ALL_TODOS'; payload: boolean }
  | { type: 'CLEAR_COMPLETED_TODOS' };