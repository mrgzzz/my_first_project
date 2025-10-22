function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех!");
            } else {
                reject("Ошибка!");
            }
        }, 1000);
    });
}

function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Ожидание...';
    
    createBasicPromise(true)
        .then(result => {
            output.textContent = `Результат: ${result}`;
        })
        .catch(error => {
            output.textContent = `Ошибка: ${error}`;
        });
}

function createPromiseChain() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Запуск цепочки...';
    
    createBasicPromise(true)
        .then(result => {
            output.textContent += `\nШаг 1: ${result}`;
            return new Promise(resolve => {
                setTimeout(() => resolve(`${result} -> Шаг 2`), 500);
            });
        })
        .then(result => {
            output.textContent += `\nШаг 2: ${result}`;
            return new Promise(resolve => {
                setTimeout(() => resolve(`${result} -> Шаг 3`), 500);
            });
        })
        .then(result => {
            output.textContent += `\nШаг 3: ${result}`;
            output.textContent += '\nЦепочка завершена!';
        });
}

function handlePromiseError() {
    const output = document.getElementById('promise-output');
    output.textContent = 'Ожидание ошибки...';
    
    createBasicPromise(false)
        .then(result => {
            output.textContent = `Результат: ${result}`;
        })
        .catch(error => {
            output.textContent = `Поймана ошибка: ${error}`;
        });
}

function setupPromiseEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
}

async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    output.textContent = 'Ожидание...';
    
    try {
        const result = await createBasicPromise(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        output.textContent = `Результат: ${result}`;
    } catch (error) {
        output.textContent = `Ошибка: ${error}`;
    }
}

async function handleAsyncError() {
    const output = document.getElementById('async-output');
    output.textContent = 'Ожидание ошибки...';
    
    try {
        const result = await createBasicPromise(false);
        output.textContent = `Результат: ${result}`;
    } catch (error) {
        output.textContent = `Поймана ошибка: ${error}`;
    }
}

async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    output.textContent = 'Запуск параллельных операций...';
    
    const startTime = Date.now();
    
    try {
        const results = await Promise.all([
            createBasicPromise(true),
            createBasicPromise(true),
            createBasicPromise(true)
        ]);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.textContent = `Все операции завершены за ${duration}мс\n`;
        output.textContent += `Результаты: ${results.join(', ')}`;
    } catch (error) {
        output.textContent = `Ошибка: ${error}`;
    }
}

function setupAsyncEvents() {
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
}

async function fetchUsers() {
    const output = document.getElementById('api-output');
    const dataContainer = document.getElementById('api-data');
    
    output.textContent = 'Загрузка пользователей...';
    dataContainer.innerHTML = '';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        output.textContent = `Загружено пользователей: ${users.length}`;
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <strong>${user.name}</strong><br>
                Email: ${user.email}<br>
                Телефон: ${user.phone}
            `;
            dataContainer.appendChild(userCard);
        });
        
    } catch (error) {
        output.textContent = `Ошибка загрузки: ${error.message}`;
    }
}

async function createPost() {
    const output = document.getElementById('api-output');
    output.textContent = 'Отправка POST запроса...';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Post',
                body: 'This is a test post',
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = `Пост создан! ID: ${data.id}\nЗаголовок: ${data.title}\nТекст: ${data.body}`;
        
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
    }
}

async function testApiError() {
    const output = document.getElementById('api-output');
    output.textContent = 'Тестирование ошибки API...';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = `Данные: ${JSON.stringify(data)}`;
        
    } catch (error) {
        output.textContent = `Поймана ошибка: ${error.message}`;
    }
}

function setupApiEvents() {
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
}

let intervalId;
let intervalCounter = 0;

async function startAsyncInterval() {
    const output = document.getElementById('interval-output');
    output.textContent = 'Интервал запущен...';
    intervalCounter = 0;
    
    intervalId = setInterval(async () => {
        intervalCounter++;
        output.textContent = `Счетчик: ${intervalCounter}`;
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }, 1000);
}

function stopAsyncInterval() {
    const output = document.getElementById('interval-output');
    
    if (intervalId) {
        clearInterval(intervalId);
        output.textContent = `Интервал остановлен. Финальный счетчик: ${intervalCounter}`;
        intervalCounter = 0;
    }
}

function delayWithPromise(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function testDelay() {
    const output = document.getElementById('timer-output');
    output.textContent = 'Тестирование задержек...';
    
    try {
        output.textContent += '\nЗадержка 1...';
        await delayWithPromise(1000);
        output.textContent += '\nЗадержка 2...';
        await delayWithPromise(1000);
        output.textContent += '\nЗадержка 3...';
        await delayWithPromise(1000);
        output.textContent += '\nВсе задержки завершены!';
    } catch (error) {
        output.textContent += `\nОшибка: ${error}`;
    }
}

function setupTimerEvents() {
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
}

document.addEventListener('DOMContentLoaded', function() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
});