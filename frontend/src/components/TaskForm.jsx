import { useState } from 'react';

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка: поле названия обязательно
    if (!title.trim()) {
      setError('Поле "Название задачи" обязательно для заполнения');
      return;
    }
    
    // Если всё ок, создаём задачу
    onCreateTask(title, description);
    
    // Очищаем форму
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(''); // Очищаем ошибку при вводе
            }}
            placeholder="Название задачи..."
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание (необязательно)"
            className="form-textarea"
          />
        </div>
        
        {error && (
          <div className="error-message" style={{
            color: '#e74c3c',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#ffeaea',
            borderRadius: '8px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}
        
        <button type="submit" className="btn-primary">
          + Добавить задачу
        </button>
      </form>
    </div>
  );
}

export default TaskForm;