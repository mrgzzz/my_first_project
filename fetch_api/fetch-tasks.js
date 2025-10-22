const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchGetRequest() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        const data = await response.json();
        document.getElementById('get-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('get-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchJsonData() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        const output = document.getElementById('get-data');
        output.innerHTML = users.map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Телефон:</strong> ${user.phone}</p>
            </div>
        `).join('');
    } catch (error) {
        document.getElementById('get-data').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchWithError() {
    try {
        const response = await fetch(`${API_BASE_URL}/invalid-url`);
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('get-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('get-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

function setupGetRequests() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
}

async function fetchPostRequest() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержание нового поста',
                userId: 1
            })
        });
        const data = await response.json();
        document.getElementById('crud-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('crud-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchPutRequest() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 1,
                title: 'Обновленный пост',
                body: 'Обновленное содержание',
                userId: 1
            })
        });
        const data = await response.json();
        document.getElementById('crud-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('crud-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchPatchRequest() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Частично обновленный пост'
            })
        });
        const data = await response.json();
        document.getElementById('crud-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('crud-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchDeleteRequest() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.getElementById('crud-output').innerHTML = '<p style="color: green;">Пост успешно удален</p>';
        } else {
            throw new Error(`Ошибка удаления: ${response.status}`);
        }
    } catch (error) {
        document.getElementById('crud-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

function setupCrudRequests() {
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
}

async function fetchWithHeaders() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                'X-Custom-Header': 'custom-value',
                'Authorization': 'Bearer token123'
            }
        });
        const data = await response.json();
        document.getElementById('headers-output').innerHTML = `
            <p><strong>Отправленные заголовки:</strong></p>
            <ul>
                <li>X-Custom-Header: custom-value</li>
                <li>Authorization: Bearer token123</li>
            </ul>
            <pre>${JSON.stringify(data.slice(0, 2), null, 2)}</pre>
        `;
    } catch (error) {
        document.getElementById('headers-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchWithAuth() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                'Authorization': 'Basic ' + btoa('user:password')
            }
        });
        const data = await response.json();
        document.getElementById('headers-output').innerHTML = `<pre>${JSON.stringify(data.slice(0, 2), null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('headers-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchWithParams() {
    try {
        const params = new URLSearchParams({
            '_limit': '5',
            '_sort': 'id',
            '_order': 'desc'
        });
        const response = await fetch(`${API_BASE_URL}/posts?${params}`);
        const data = await response.json();
        document.getElementById('headers-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('headers-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchWithTimeout() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${API_BASE_URL}/posts`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const data = await response.json();
        document.getElementById('headers-output').innerHTML = `<pre>${JSON.stringify(data.slice(0, 2), null, 2)}</pre>`;
    } catch (error) {
        if (error.name === 'AbortError') {
            document.getElementById('headers-output').innerHTML = '<p style="color: red;">Запрос отменен по таймауту</p>';
        } else {
            document.getElementById('headers-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    }
}

function setupHeadersAndParams() {
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth').addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
}

async function fetchAndCheckStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/invalid`);
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        document.getElementById('response-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('response-output').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

async function fetchAndReadHeaders() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        const headers = [];
        response.headers.forEach((value, name) => {
            headers.push(`${name}: ${value}`);
        });
        
        document.getElementById('response-output').innerHTML = `
            <p><strong>Заголовки ответа:</strong></p>
            <ul>${headers.map(header => `<li>${header}</li>`).join('')}</ul>
        `;
    } catch (error) {
        document.getElementById('response-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

function setupResponseHandling() {
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-read-headers').addEventListener('click', fetchAndReadHeaders);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchWithFormData);
}

async function fetchBlobData() {
    try {
        const response = await fetch('https://picsum.photos/200/300');
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        document.getElementById('response-output').innerHTML = `<img src="${imageUrl}" alt="Random image">`;
    } catch (error) {
        document.getElementById('response-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

async function fetchWithFormData() {
    try {
        const formData = new FormData();
        formData.append('title', 'Post from FormData');
        formData.append('body', 'Content from FormData');
        formData.append('userId', '1');

        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        document.getElementById('response-output').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        document.getElementById('response-output').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
});