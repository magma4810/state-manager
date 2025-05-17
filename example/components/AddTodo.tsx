import React, { FC, useState } from 'react';
import { addTodo } from '../store/todo.slice';
import '../slyles/AddTodo.css'; 

export const AddTodo: FC = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button
          type="submit"
          className="add-button"
        >
          Add
        </button>
      </div>
    </form>
  );
};