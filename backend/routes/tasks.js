const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  exportTasks
} = require('../controllers/tasksController');

router.get('/', getAllTasks);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

router.get('/export', exportTasks); 

module.exports = router;