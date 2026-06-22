const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  exportTasks
} = require('../controllers/tasksController');

// GET /tasks - получить все задачи
router.get('/', getAllTasks);

// POST /tasks - создать задачу
router.post('/', createTask);

// PUT /tasks/:id - обновить статус задачи
router.put('/:id', updateTaskStatus);

// DELETE /tasks/:id - удалить задачу
router.delete('/:id', deleteTask);

// GET /tasks/export - экспорт задач в CSV
router.get('/export', exportTasks);  // ← Добавьте этот маршрут

module.exports = router;