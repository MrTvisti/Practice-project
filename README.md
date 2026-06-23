# AI Task Manager

Веб-приложение для управления задачами с современным интерфейсом и REST API.

## Содержание

- [Описание](#описание)
- [Технологии](#технологии)
- [Описание файлов](#описание-файлов)
- [Установка](#установка)
- [Ручной запуск](#ручной-запуск-без-установки-docker)
- [Запуск через Docker](#запуск-через-docker)
- [Python-скрипт экспорта](#python-скрипт-экспорта-данных)

## Описание

AI Task Manager — это приложение для управления задачами с:
- Созданием, редактированием и удалением задач
- Изменением статуса задач (Новая, В работе, Выполнена)
- Двумя режимами отображения (список и канбан-доска)
- Светлой и тёмной темой
- Экспортом задач в CSV

## Технологии

**Frontend:**
- React 18+
- JavaScript (ES6+)
- Vite
- CSS3 с CSS Variables

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)

**Дополнительно:**
- Python 3.x (для экспорта данных)
- Docker & Docker Compose
- Git

## Описание файлов

### Корневые файлы

- **README.md** — Документация проекта с инструкциями по установке и запуску
- **docker-compose.yml** — Конфигурация Docker Compose для запуска всех сервисов (frontend, backend, PostgreSQL)
- **.gitignore** — Список файлов и папок, которые Git должен игнорировать

### database/

- **init.sql** — SQL-скрипт для создания таблицы `tasks` в PostgreSQL с полями: id, title, description, status, created_at

### backend/

- **app.js** — Главный файл сервера Express. Настраивает middleware (cors, json), подключает маршруты и запускает сервер на порту 3000
- **db.js** — Подключение к PostgreSQL через библиотеку `pg`. Создаёт пул соединений с параметрами из `.env`
- **.env** — Переменные окружения: данные для подключения к базе данных (хост, порт, имя БД, пользователь, пароль)
- **Dockerfile** — Инструкция для Docker по созданию образа backend (установка Node.js, зависимостей, запуск сервера)
- **package.json** — Список зависимостей backend (express, pg, dotenv, cors) и скрипты для запуска
- **controllers/tasksController.js** — Логика CRUD-операций: получение всех задач, создание задачи, обновление задачи, удаление задачи, экспорт в CSV
- **routes/tasks.js** — Маршруты API: GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id, GET /tasks/export

### frontend/

- **Dockerfile** — Инструкция для Docker по созданию образа frontend (установка Node.js, зависимостей, запуск Vite dev server)
- **package.json** — Список зависимостей frontend (react, react-dom, axios, vite) и скрипты для запуска
- **vite.config.js** — Конфигурация Vite (сборщик для React)
- **index.html** — HTML-шаблон приложения
- **src/main.jsx** — Точка входа React-приложения. Рендерит компонент `<App />` в DOM
- **src/App.jsx** — Главный компонент: управление состоянием задач, тема, режим отображения, API-запросы через axios, экспорт CSV
- **src/App.css** — Все стили приложения: CSS-переменные для тем, градиенты, карточки, модальное окно, адаптивность
- **src/components/TaskForm.jsx** — Форма создания задачи с полями "Название" и "Описание". Валидация обязательного поля названия
- **src/components/TaskList.jsx** — Компонент для отображения задач в режиме "Список"
- **src/components/TaskItem.jsx** — Карточка отдельной задачи: заголовок, описание, статус-бейдж, select для смены статуса, кнопка удаления. Клик по карточке открывает модальное окно редактирования
- **src/components/BoardView.jsx** — Режим "Колонки" (канбан-доска): 3 колонки по статусам (Новые, В работе, Выполнены) + форма создания задачи слева
- **src/components/ThemeToggle.jsx** — Кнопка переключения между светлой и тёмной темой
- **src/components/EditTaskModal.jsx** — Модальное окно редактирования задачи: поля для изменения названия, описания, статуса + кнопки "Отмена", "Удалить", "Сохранить"

### python/

- **export_tasks.py** — Python-скрипт для экспорта задач из PostgreSQL в CSV-файл. Подключается к БД через psycopg2, выгружает все задачи, преобразует статусы в читаемый вид, сохраняет в tasks_export.csv с кодировкой UTF-8 BOM для корректного отображения кириллицы в Excel

## Установка

### Требования:
- Node.js 20.x или выше
- PostgreSQL 15.x
- Python 3.8+ (для скрипта экспорта)
- Docker Desktop (опционально)

### 1. Клонируйте репозиторий (команды вводите в терминале редактора):
```bash
git clone https://github.com/MrTvisti/Practice-project
cd Practice-project
```

### 2. Установите зависимости:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Python-скрипт
cd ../python
pip install psycopg2-binary
```

### 3. Создайте базу данных:
```bash
psql -U postgres
CREATE DATABASE "AI_Task_Manager";
\q

psql -U postgres -d AI_Task_Manager -f database/init.sql
```

### 4. Настройте переменные окружения:

**Создайте файл backend/.env и введите следующий код:**
```bash
DB_USER=postgres
DB_HOST=localhost
DB_NAME=AI_Task_Manager
DB_PASSWORD=ваш_пароль
DB_PORT=5432
PORT=3000
```

## Ручной запуск без установки Docker

**Создайте 2 терминала и выполните в них код:**

*Терминал 1*
```bash
cd backend
node app.js
```
*Терминал 2*
```bash
cd frontend
npm run dev
```
**Приложение доступно по адресу: http://localhost:5173**

## Запуск через Docker
```bash
# Запуск
docker compose up -d

# Остановка
docker compose down

# Пересборка (после изменения кода)
docker compose up -d --build

# Просмотр статуса контейнеров
docker compose ps

# Просмотр логов
docker compose logs -f
```
*Сервисы:*
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

## Python-скрипт экспорта данных
```bash
cd python
python export_tasks.py
```
*Скрипт создаст файл tasks_export.csv со всеми задачами из базы данных.*

