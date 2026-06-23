const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString('ru-RU');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use('/tasks', tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});