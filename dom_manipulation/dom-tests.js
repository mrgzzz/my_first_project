function runTests() {
    console.log('=== Запуск тестов ===');

    try {
        createCard('Тест', 'Тестовое содержимое');
        const card = document.querySelector('.card');
        console.assert(card !== null, 'Карточка должна создаваться');
        console.log('✓ Тест 1 пройден');
    } catch (e) {
        console.error('✗ Тест 1 не пройден:', e);
    }

    try {
        createList(['Один', 'Два']);
        const list = document.querySelector('ol');
        console.assert(list !== null, 'Список должен создаваться');
        console.log('✓ Тест 2 пройден');
    } catch (e) {
        console.error('✗ Тест 2 не пройден:', e);
    }

    try {
        const count = countChildren();
        console.assert(typeof count === 'number', 'Должно возвращаться число');
        console.log('✓ Тест 3 пройден');
    } catch (e) {
        console.error('✗ Тест 3 не пройден:', e);
    }
    try {
        const text = findSpecialChild();
        console.assert(typeof text === 'string', 'Должен возвращаться текст');
        console.log('✓ Тест 4 пройден');
    } catch (e) {
        console.error('✗ Тест 4 не пройден:', e);
    }
    
    console.log('=== Тесты завершены ===');
}

document.addEventListener('DOMContentLoaded', runTests);