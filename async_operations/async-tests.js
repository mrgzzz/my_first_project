function runTest(testName, testFunction) {
    console.log(`--- Запуск теста: ${testName} ---`);
    try {
        testFunction();
        console.log(`✓ Тест "${testName}" пройден`);
    } catch (error) {
        console.log(`✗ Тест "${testName}" не пройден: ${error.message}`);
    }
    console.log('--- Конец теста ---\n');
}

function testCreateBasicPromise() {
    runTest('createBasicPromise - успешное выполнение', () => {
        createBasicPromise(true)
            .then(result => {
                if (result !== "Успех!") {
                    throw new Error(`Ожидался "Успех!", получено: ${result}`);
                }
            })
            .catch(error => {
                throw new Error(`Не ожидалась ошибка: ${error}`);
            });
    });

    runTest('createBasicPromise - ошибка', () => {
        createBasicPromise(false)
            .then(result => {
                throw new Error(`Ожидалась ошибка, получено: ${result}`);
            })
            .catch(error => {
                if (error !== "Ошибка!") {
                    throw new Error(`Ожидалась "Ошибка!", получено: ${error}`);
                }
            });
    });
}

function testDelayWithPromise() {
    runTest('delayWithPromise - базовая функциональность', async () => {
        const startTime = Date.now();
        await delayWithPromise(100);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if (duration < 90 || duration > 150) {
            throw new Error(`Задержка не соответствует ожиданиям: ${duration}мс`);
        }
    });
}

function testErrorHandling() {
    runTest('handlePromiseError - обработка ошибки', () => {
        const originalOutput = document.getElementById('promise-output');
        let testOutput = '';
        document.getElementById('promise-output').textContent = '';
        
        handlePromiseError();
        
        console.log('Тест handlePromiseError завершен без исключений');
    });
}

function runAllTests() {
    console.log('=== ЗАПУСК ВСЕХ ТЕСТОВ ===\n');
    
    testCreateBasicPromise();
    testDelayWithPromise();
    testErrorHandling();
    
    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
});