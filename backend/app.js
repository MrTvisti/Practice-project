const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'AI Task Manager API работает!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});