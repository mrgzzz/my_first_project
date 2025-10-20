function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const heading = document.createElement('h4');
    heading.textContent = title;
    
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    
    card.appendChild(heading);
    card.appendChild(paragraph);
    
    document.getElementById('target1').appendChild(card);
}

function createList(items) {
    const list = document.createElement('ol');
    
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    
    document.getElementById('target1').appendChild(list);
}

function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent.children.length;
}

function findSpecialChild() {
    const special = document.querySelector('#parent-element .special');
    return special ? special.textContent : 'Не найден';
}

function getParentBackground() {
    const child = document.querySelector('#parent-element .child');
    const parent = child.parentElement;
    return window.getComputedStyle(parent).backgroundColor;
}

function toggleStyle() {
    const element = document.getElementById('style-target');
    element.classList.toggle('active-style');
}

function changeHeaderColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('header').style.backgroundColor = randomColor;
}

function animateElement() {
    const element = document.getElementById('style-target');
    element.style.transform = 'scale(1.2)';
    element.style.opacity = '0.7';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 500);
}

function setupClickCounter() {
    let count = 0;
    const button = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    button.addEventListener('click', () => {
        count++;
        counter.textContent = count;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    
    input.addEventListener('input', () => {
        display.textContent = input.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
        console.log(`Key down: ${event.key} (Code: ${event.code})`);
    });
    
    document.addEventListener('keyup', (event) => {
        console.log(`Key up: ${event.key} (Code: ${event.code})`);
    });
}

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    
    if (input.value.trim() === '') return;
    
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.textContent = input.value;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '×';
    removeBtn.onclick = removeListItem;
    
    listItem.appendChild(removeBtn);
    list.appendChild(listItem);
    
    input.value = '';
}

function removeListItem(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    list.innerHTML = '';
}

function setupListEvents() {
    document.getElementById('dynamic-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            removeListItem(event);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
});