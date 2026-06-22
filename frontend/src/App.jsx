import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import BoardView from './components/BoardView';
import EditTaskModal from './components/EditTaskModal';  // ← Добавьте импорт
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const API_URL = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('viewMode');
    return saved || 'list';
  });
  const [editingTask, setEditingTask] = useState(null);  // ← Добавьте состояние

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  };

  const createTask = async (title, description) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        description
      });
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  // ← Добавьте функцию обновления задачи
  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task =>
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const updateStatus = async (id, status) => {
    await updateTask(id, { status });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'board' : 'list');
  };

  // ← Добавьте функции для модалки
  const openEditModal = (task) => {
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  const saveEditedTask = async (id, updates) => {
    await updateTask(id, updates);
    setEditingTask(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1>AI Task Manager</h1>
        <div className="header-controls">
          <button
            onClick={toggleViewMode}
            className="btn-view-toggle"
            title={viewMode === 'list' ? 'Переключить на вид колонок' : 'Переключить на вид списка'}
          >
            {viewMode === 'list' ? 'Колонки' : 'Список'}
          </button>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      <main className="app-main">
        {viewMode === 'list' ? (
          <>
            <TaskForm onCreateTask={createTask} />
            <TaskList
              tasks={tasks}
              onUpdateStatus={updateStatus}
              onDeleteTask={deleteTask}
              onEditTask={openEditModal}  // ← Добавьте пропс
            />
          </>
        ) : (
          <BoardView
            tasks={tasks}
            onCreateTask={createTask}
            onUpdateStatus={updateStatus}
            onDeleteTask={deleteTask}
            onEditTask={openEditModal}  // ← Добавьте пропс
          />
        )}
      </main>

      {/* ← Добавьте модалку */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={saveEditedTask}
          onDelete={deleteTask}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default App;