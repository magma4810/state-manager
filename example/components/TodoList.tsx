import { FC, useState } from 'react';
import { useStore } from '../../library/index';
import { store } from '../store';
import { toggleTodo, removeTodo, updateTodo, toggleAllTodos, clearCompletedTodos } from '../store/todo.slice';
import { TodoState } from '../types';

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
        <div className="space-y-4">
            {todos.length === 0 ? <></> : <>
                <div className="flex items-center justify-between px-2  border-b p-3.5">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={allCompleted}
                            onChange={() => toggleAllTodos(!allCompleted)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Select all</span>
                    </div>
                    <button
                        onClick={clearCompletedTodos}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded"
                    >
                        Clear completed
                    </button>
                </div>



                <ul className="space-y-2">
                    {filteredTodos.map(todo => (
                        <li
                            key={todo.id}
                            className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded"
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
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className="flex border-t p-3.5 justify-between">
                    {(['all', 'active', 'completed'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 text-sm font-medium ${filter === tab
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </>
            }
        </div>
    );
};