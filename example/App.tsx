import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="main-card">
        <h1 className="app-title">
          Todo App
        </h1>
        <AddTodo />
        <TodoList />
      </div>
      <span className='edit-hint'>Double click to edit todo</span>
    </div>
  );
};

export default App;