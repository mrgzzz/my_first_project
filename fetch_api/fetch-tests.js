console.log('Запуск тестов Fetch API...');
async function runTests() {
    console.log('=== ТЕСТЫ FETCH API ===');
    
    try {
        const testResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        console.log('✓ API доступен');
        
        const testData = await testResponse.json();
        if (testData.id && testData.title && testData.body) {
            console.log('✓ Структура данных корректна');
        } else {
            console.log('✗ Неверная структура данных');
        }
        
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

document.addEventListener('DOMContentLoaded', runTests);
