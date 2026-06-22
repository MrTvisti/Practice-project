import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

function BoardView({ tasks, onCreateTask, onUpdateStatus, onDeleteTask, onEditTask }) {
  const columns = [
    { status: 'new', title: 'Новые' },
    { status: 'in_progress', title: 'В работе' },
    { status: 'done', title: 'Выполнены' }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="board-container">
      <div className="board-sidebar">
        <div className="board-sidebar-header">
          <h2>Новая задача</h2>
        </div>
        <TaskForm onCreateTask={onCreateTask} />
      </div>
      <div className="board-columns">
        {columns.map(column => (
          <div key={column.status} className="board-column">
            <div className="column-header">
              <h3>{column.title}</h3>
              <span className="column-count">
                {getTasksByStatus(column.status).length}
              </span>
            </div>
            <div className="column-tasks">
              {getTasksByStatus(column.status).length === 0 ? (
                <div className="column-empty">
                  <p>Нет задач</p>
                </div>
              ) : (
                getTasksByStatus(column.status).map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onUpdateStatus={onUpdateStatus}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardView;