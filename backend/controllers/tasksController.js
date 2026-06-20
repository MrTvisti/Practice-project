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
// Удалить задачу
const deleteTask = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    res.json({ message: 'Задача удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении задачи' });
  }
};
module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};