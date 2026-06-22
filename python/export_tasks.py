import psycopg2
import csv
import os
from datetime import datetime

# Настройки подключения к PostgreSQL
DB_CONFIG = {
    'dbname': 'AI_Task_Manager',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'client_encoding': 'utf8'
}

# Путь для сохранения CSV
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'tasks_export.csv')

def export_tasks_to_csv():
    """Экспортирует все задачи из PostgreSQL в CSV файл"""
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Получение всех задач
        cursor.execute('''
            SELECT id, title, description, status, created_at 
            FROM tasks 
            ORDER BY created_at DESC
        ''')
        
        tasks = cursor.fetchall()
        
        # Создание CSV файла с UTF-8 BOM
        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.writer(csvfile, quoting=csv.QUOTE_MINIMAL)
            
            # Заголовки
            writer.writerow(['ID', 'Название', 'Описание', 'Статус', 'Дата создания'])
            
            # Данные
            for task in tasks:
                task_id, title, description, status, created_at = task
                
                # Преобразование статуса в читаемый вид
                status_labels = {
                    'new': 'Новая',
                    'in_progress': 'В работе',
                    'done': 'Выполнена'
                }
                status_label = status_labels.get(status, status)
                
                writer.writerow([
                    task_id,
                    title,
                    description or '',
                    status_label,
                    created_at.strftime('%d.%m.%Y %H:%M') if created_at else ''
                ])
        
        print(f'Экспорт завершён!')
        print(f'Файл сохранён: {OUTPUT_FILE}')
        print(f'Всего задач экспортировано: {len(tasks)}')
        
        cursor.close()
        conn.close()
        
        return True
        
    except Exception as e:
        print(f'✗ Ошибка при экспорте: {e}')
        return False

if __name__ == '__main__':
    export_tasks_to_csv()