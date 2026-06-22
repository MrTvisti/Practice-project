import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdateStatus, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Нет задач. Создайте первую!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}

export default TaskList;