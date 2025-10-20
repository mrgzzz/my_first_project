function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    output.innerHTML = `
        Тип события: ${event.type}<br>
        Координаты: X=${event.clientX}, Y=${event.clientY}<br>
        Target: ${event.target.tagName}
    `;
    
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');
    
    switch(event.type) {
        case 'mouseenter':
            box.style.backgroundColor = '#e74c3c';
            break;
        case 'mouseleave':
            box.style.backgroundColor = '#3498db';
            break;
        case 'mousemove':
            output.textContent = `Координаты: X=${event.offsetX}, Y=${event.offsetY}`;
            break;
    }
}

function setupBasicEvents() {
    document.getElementById('basic-btn').addEventListener('click', handleBasicClick);
    
    const colorBox = document.getElementById('color-box');
    colorBox.addEventListener('mouseenter', handleMouseEvents);
    colorBox.addEventListener('mouseleave', handleMouseEvents);
    colorBox.addEventListener('mousemove', handleMouseEvents);
}

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    
    if ((event.ctrlKey && event.key === 's') || 
        (event.altKey && event.key === 'c') || 
        (event.shiftKey && event.key === 'a')) {
        event.preventDefault();
        output.textContent = `Комбинация ${event.key} заблокирована`;
        return;
    }
    
    output.innerHTML = `
        Клавиша: ${event.key}<br>
        Код: ${event.code}<br>
        Ctrl: ${event.ctrlKey}<br>
        Alt: ${event.altKey}<br>
        Shift: ${event.shiftKey}
    `;
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    input.addEventListener('keydown', handleKeyEvents);
    input.addEventListener('keyup', () => {
        document.getElementById('key-output').textContent = 'Клавиша отпущена';
    });
}

function handleDelegationClick(event) {
    const output = document.getElementById('delegation-output');
    
    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('selected');
    }
    
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
    
    const selectedItems = document.querySelectorAll('.item.selected');
    output.textContent = `Выбрано элементов: ${selectedItems.length}`;
}

function addNewItem() {
    const list = document.getElementById('item-list');
    const items = list.querySelectorAll('.item');
    const newId = items.length + 1;
    
    const newItem = document.createElement('li');
    newItem.className = 'item';
    newItem.setAttribute('data-id', newId);
    newItem.innerHTML = `Элемент ${newId} <button class="delete">×</button>`;
    
    list.appendChild(newItem);
}

function setupDelegationEvents() {
    document.getElementById('item-list').addEventListener('click', handleDelegationClick);
    document.getElementById('add-item-btn').addEventListener('click', addNewItem);
}

function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    output.textContent = 'Переход по ссылке заблокирован!';
    event.target.classList.add('shake');
    setTimeout(() => {
        event.target.classList.remove('shake');
    }, 500);
}

function preventFormSubmit(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const output = document.getElementById('prevention-output');
    
    if (input.value.trim() === '') {
        output.textContent = 'Ошибка: поле не может быть пустым';
        input.style.borderColor = '#e74c3c';
    } else {
        output.textContent = `Данные формы: ${input.value}`;
        input.style.borderColor = '#27ae60';
    }
}

function setupPreventionEvents() {
    document.getElementById('prevent-link').addEventListener('click', preventLinkDefault);
    document.getElementById('prevent-form').addEventListener('submit', preventFormSubmit);
}

function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: { message: "Привет от кастомного события!" }
    });
    document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    output.textContent = event.detail.message;
    
    const button = document.getElementById('trigger-custom');
    button.classList.add('pulse');
    setTimeout(() => {
        button.classList.remove('pulse');
    }, 500);
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);
    document.getElementById('trigger-custom').addEventListener('click', triggerCustomEvent);
}

document.addEventListener('DOMContentLoaded', function() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
});