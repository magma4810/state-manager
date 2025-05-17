import { FC, useState } from 'react';
import { useStore } from '../../library/index';
import { store } from '../store';
import { toggleTodo, removeTodo, updateTodo, toggleAllTodos, clearCompletedTodos } from '../store/todo.slice';
import { TodoState } from '../types';
import '../slyles/TodoList.css';
import trashIcon from '../../public/free-icon-trash-bin-7267149.png';
import writeIcon from "../../public/free-icon-write-3980797.png";

export const TodoList: FC = () => {
    const { todos } = useStore<TodoState>(store);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

    const handleEditStart = (todo: { id: string; text: string }) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const handleEditSave = (id: string) => {
        if (editText.trim()) {
            updateTodo(id, editText);
        }
        setEditingId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            handleEditSave(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div className="todo-container">
            {todos.length === 0 ? null : (
                <>
                    <div className="controls-panel">
                        <div className="select-all-container">
                            <input
                                type="checkbox"
                                checked={allCompleted}
                                onChange={() => toggleAllTodos(!allCompleted)}
                                className="select-all-checkbox"
                            />
                            <span className="select-all-label">Select all</span>
                        </div>
                        <button
                            onClick={clearCompletedTodos}
                            className="clear-completed-btn"
                        >
                            Clear completed
                        </button>
                    </div>

                    <ul className="todos-list">
                        {filteredTodos.map(todo => (
                            <li
                                key={todo.id}
                                className="todo-item"
                            >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                            />

                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => handleEditSave(todo.id)}
                                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                                    autoFocus
                                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 break-words"
                                />
                            ) : (
                                <span
                                    className={`flex-1 break-words min-w-0 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                                        }`}
                                    onDoubleClick={() => handleEditStart(todo)}
                                >
                                    {todo.text}
                                </span>
                            )}

                            <div className="flex gap-1 flex-shrink-0">
                                {editingId !== todo.id && (
                                    <button
                                        onClick={() => handleEditStart(todo)}
                                        className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        <img src={writeIcon} alt=""  className='trash-bin'/>
                                    </button>
                                )}
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                                >
                                    <img src={trashIcon} alt=""  className='trash-bin'/>
                                </button>
                            </div>

                            </li>
                        ))}
                    </ul>
                    <div className="filters-panel">
                        {(['all', 'active', 'completed'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`filter-btn ${filter === tab ? 'active' : ''}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};