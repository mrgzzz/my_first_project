// Базовые тесты для функций Fetch API
console.log('Запуск тестов Fetch API...');

// Тестовая функция для проверки базовой функциональности
async function runTests() {
    console.log('=== ТЕСТЫ FETCH API ===');
    
    try {
        // Тест 1: Проверка доступности API
        const testResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        console.log('✓ API доступен');
        
        // Тест 2: Проверка структуры данных
        const testData = await testResponse.json();
        if (testData.id && testData.title && testData.body) {
            console.log('✓ Структура данных корректна');
        } else {
            console.log('✗ Неверная структура данных');
        }
        
        // Тест 3: Проверка обработки ошибок
        try {
            await fetch('https://jsonplaceholder.typicode.com/invalid-url');
            console.log('✗ Ожидалась ошибка для неверного URL');
        } catch (error) {
            console.log('✓ Обработка ошибок работает');
        }
        
        console.log('=== ТЕСТЫ ЗАВЕРШЕНЫ ===');
        
    } catch (error) {
        console.error('✗ Ошибка при выполнении тестов:', error);
    }
}

// Запуск тестов при загрузке страницы
document.addEventListener('DOMContentLoaded', runTests);