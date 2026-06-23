function TaskItem({ task, onUpdateStatus, onDeleteTask, onEditTask }) {
  const getStatusLabel = (status) => {
    const labels = {
      new: 'Новая',
      in_progress: 'В работе',
      done: 'Выполнена'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    const classes = {
      new: 'status-new',
      in_progress: 'status-in_progress',
      done: 'status-done'
    };
    return classes[status] || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.btn-delete') || e.target.closest('.status-select')) {
      return;
    }
    if (onEditTask) {
      onEditTask(task);
    }
  };

  return (
    <div className={`task-card status-${task.status}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task.id);
          }}
          className="btn-delete"
          title="Удалить задачу"
        >
          Удалить
        </button>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <div className="task-meta">
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {getStatusLabel(task.status)}
          </span>
          <span className="task-date">
            {formatDate(task.created_at)}
          </span>
        </div>
        
        <select
          value={task.status}
          onChange={(e) => {
            e.stopPropagation();
            onUpdateStatus(task.id, e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="status-select"
        >
          <option value="new">Новая</option>
          <option value="in_progress">В работе</option>
          <option value="done">Выполнена</option>
        </select>
      </div>
    </div>
  );
}

export default TaskItem;