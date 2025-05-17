import { Store } from '../../library/Store';
import { TodoState } from '../types';

const initialState: TodoState = {
  todos: []
};

export const store = new Store<TodoState>(initialState);