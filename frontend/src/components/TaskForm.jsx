import { useState } from 'react';

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onCreateTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Название задачи..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows="2"
          />
        </div>
        <button type="submit" className="btn-primary">
          + Добавить задачу
        </button>
      </form>
    </div>
  );
}

export default TaskForm;