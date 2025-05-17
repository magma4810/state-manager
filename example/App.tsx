import React from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-[100vw]">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>
        <AddTodo />
        <TodoList />
      </div>
      <span className=' flex justify-center p-3.5 text-blue-600/40'> Double click to edit todo</span>
    </div>
  );
};

export default App;