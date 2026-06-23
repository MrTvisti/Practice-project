# AI Task Manager

Веб-приложение для управления задачами с современным интерфейсом и REST API.

## Содержание

- [Описание](#описание)
- [Технологии](#технологии)
- [Установка](#установка)
- [Ручной запуск](#ручной-запуск)
- [Запуск через Docker](#запуск-через-docker)
- [Python-скрипт экспорта](#python-скрипт-экспорта)

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

## Ручной запуск (без установки Docker)

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

