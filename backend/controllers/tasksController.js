const pool = require('../db');
// Получить все задачи
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении задач' });
  }
};
// Создать новую задачу
const createTask = async (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Поле title обязательно' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description || '', 'new']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании задачи' });
  }
};
// Обновить статус задачи
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status || !['new', 'in_progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Некорректный статус' });
  }
  
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении задачи' });
  }
};
// Обновить задачу полностью
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  
  try {
    // Сначала получаем текущую задачу
    const currentTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (currentTask.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    // Используем существующие значения, если новые не предоставлены
    const updatedTitle = title !== undefined ? title : currentTask.rows[0].title;
    const updatedDescription = description !== undefined ? description : currentTask.rows[0].description;
    const updatedStatus = status !== undefined ? status : currentTask.rows[0].status;
    
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, status = $3 
       WHERE id = $4 
       RETURNING *`,
      [updatedTitle, updatedDescription, updatedStatus, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    res.status(500).json({ error: 'Ошибка при обновлении задачи' });
  }
};
// Удалить задачу
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json({ message: 'Задача удалена' });
  } catch (error) {
    console.error('Ошибка при удалении:', error);
    res.status(500).json({ error: 'Ошибка при удалении задачи' });
  }
};
// Экспорт задач в CSV
const exportTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    const tasks = result.rows;
    
    // Формирование CSV-данных
    const csvRows = [];
    csvRows.push('ID,Название,Описание,Статус,Дата создания');
    
    tasks.forEach(task => {
      const title = task.title;
      const description = task.description || '';
      const status = getStatusLabel(task.status);
      const createdAt = new Date(task.created_at).toLocaleString('ru-RU');
      
      csvRows.push(`${task.id},${title},${description},${status},${createdAt}`);
    });
    
    const csvContent = csvRows.join('\n');
    
    // Добавляем BOM (Byte Order Mark) для UTF-8
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks_export.csv');
    res.send(csvWithBOM);  // ← Отправляем с BOM
    
  } catch (error) {
    console.error('Ошибка при экспорте:', error);
    res.status(500).json({ error: 'Ошибка при экспорте задач' });
  }
};

function getStatusLabel(status) {
  const labels = {
    new: 'Новая',
    in_progress: 'В работе',
    done: 'Выполнена'
  };
  return labels[status] || status;
}
module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  exportTasks
};