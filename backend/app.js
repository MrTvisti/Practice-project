const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/tasks', tasksRouter);
// Проверка работы сервера
app.get('/', (req, res) => {
  res.json({ message: 'AI Task Manager API работает!' });
});
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});