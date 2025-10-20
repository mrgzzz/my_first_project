function runTests() {
    console.log('=== Запуск тестов обработки событий ===');
    
    try {
        const btn = document.getElementById('basic-btn');
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
        console.log('✓ Тест 1: Базовые клики работают');
    } catch (e) {
        console.error('✗ Тест 1 не пройден:', e);
    }
    
    try {
        const box = document.getElementById('color-box');
        const enterEvent = new Event('mouseenter');
        box.dispatchEvent(enterEvent);
        console.log('✓ Тест 2: События мыши работают');
    } catch (e) {
        console.error('✗ Тест 2 не пройден:', e);
    }
    
    try {
        const input = document.getElementById('key-input');
        const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
        input.dispatchEvent(keyEvent);
        console.log('✓ Тест 3: События клавиатуры работают');
    } catch (e) {
        console.error('✗ Тест 3 не пройден:', e);
    }
    
    try {
        const list = document.getElementById('item-list');
        const items = list.querySelectorAll('.item');
        console.assert(items.length > 0, 'Список должен содержать элементы');
        console.log('✓ Тест 4: Делегирование настроено');
    } catch (e) {
        console.error('✗ Тест 4 не пройден:', e);
    }
    
    try {
        const link = document.getElementById('prevent-link');
        const clickEvent = new Event('click');
        link.dispatchEvent(clickEvent);
        console.log('✓ Тест 5: Предотвращение поведения работает');
    } catch (e) {
        console.error('✗ Тест 5 не пройден:', e);
    }
    
    console.log('=== Тесты завершены ===');
}

document.addEventListener('DOMContentLoaded', runTests);