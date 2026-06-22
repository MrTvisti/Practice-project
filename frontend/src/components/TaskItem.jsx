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

  const handleTitleClick = (e) => {
    e.stopPropagation();
    if (onEditTask) onEditTask(task);
  };

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-header">
        <h3 className="task-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          {task.title}
        </h3>
        <button
          onClick={() => onDeleteTask(task.id)}
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
          onChange={(e) => onUpdateStatus(task.id, e.target.value)}
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