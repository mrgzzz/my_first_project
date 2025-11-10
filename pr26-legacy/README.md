# Задание 1. Анализ legacy PHP-кода
**Анализ:**

1. Переменная $id = $_GET['id'] напрямую вставляется в SQL-запрос без какой-либо проверки, поэтому можно выполнить произвольный SQL-код.

2. PHP-код работы с базой данных перемешан с HTML-разметкой. Логика выборки данных и их отображения находится в одном месте.

3. Отсутствуют обработки ошибок (успешность подключения к бд, обработка ошибок, проверка существования параметра id).

4. Небезопасный вывод данных.

# Инструкция по установке и запуску Laravel:**

**Требования**
-PHP 8.0 или выше
-Composer
-MySQL/PostgreSQL/SQLite
-Расширения PHP: BCMath, Ctype, cURL, DOM, Fileinfo, JSON, Mbstring, OpenSSL, PCRE, PDO, Tokenizer, XML

**Установка**
1. Создание нового проекта Laravel
```composer create-project laravel/laravel my-project
cd my-project

2. Настройка окружения
cp .env.example .env
php artisan key:generate

3. Настройка базы данных
Для файла .env:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

4. Запуск сервера
php artisan server

Приложение будет доступно по адресу: http://localhost:8000