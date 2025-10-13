// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    const fields = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'), 
        productType: document.getElementById('productType'),
        agreement: document.getElementById('agreement')
    };

    const errorMessages = {
        name: document.getElementById('nameError'),
        phone: document.getElementById('phoneError'),
        email: document.getElementById('emailError'),
        productType: document.getElementById('productTypeError'),
        deadline: document.getElementById('deadlineError'),
        agreement: document.getElementById('agreementError')
    };

    fields.name.addEventListener('input', validateName);
    fields.phone.addEventListener('input', validatePhone);
    fields.email.addEventListener('input', validateEmail);
    fields.productType.addEventListener('change', validateProductType);
    
    const deadlineRadios = document.querySelectorAll('input[name="deadline"]');
    deadlineRadios.forEach(radio => {
        radio.addEventListener('change', validateDeadline);
    });
    
    fields.agreement.addEventListener('change', validateAgreement);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isProductTypeValid = validateProductType();
        const isDeadlineValid = validateDeadline();
        const isAgreementValid = validateAgreement();

        if (isNameValid && isPhoneValid && isEmailValid && 
            isProductTypeValid && isDeadlineValid && isAgreementValid) {
            alert('Форма успешно отправлена!');
            form.reset();
            clearErrors();
        }
    });

    function validateName() {
        const value = fields.name.value.trim();
        if (!value) {
            showError('name', 'ФИО обязательно для заполнения');
            return false;
        } else if (value.length < 2) {
            showError('name', 'ФИО должно содержать минимум 2 символа');
            return false;
        } else {
            hideError('name');
            return true;
        }
    }

    function validatePhone() {
        const value = fields.phone.value.trim();
        const phonePattern = /[\+]\d{1}\s?[\(]\d{3}[\)]\s?\d{3}[\-]\d{2}[\-]\d{2}/;
        
        if (!value) {
            showError('phone', 'Телефон обязателен для заполнения');
            return false;
        } else if (!phonePattern.test(value)) {
            showError('phone', 'Введите телефон в формате +7(999)999-99-99');
            return false;
        } else {
            hideError('phone');
            return true;
        }
    }

    function validateEmail() {
        const value = fields.email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError('email', 'Email обязателен для заполнения');
            return false;
        } else if (!emailPattern.test(value)) {
            showError('email', 'Введите корректный email адрес');
            return false;
        } else {
            hideError('email');
            return true;
        }
    }

    function validateProductType() {
        const value = fields.productType.value;
        if (!value) {
            showError('productType', 'Выберите тип изделия');
            return false;
        } else {
            hideError('productType');
            return true;
        }
    }

    function validateDeadline() {
        const selected = document.querySelector('input[name="deadline"]:checked');
        if (!selected) {
            showError('deadline', 'Выберите срок выполнения');
            return false;
        } else {
            hideError('deadline');
            return true;
        }
    }

    function validateAgreement() {
        if (!fields.agreement.checked) {
            showError('agreement', 'Необходимо согласие на обработку данных');
            return false;
        } else {
            hideError('agreement');
            return true;
        }
    }

    function showError(fieldName, message) {
        errorMessages[fieldName].textContent = message;
        errorMessages[fieldName].style.display = 'block';
    }

    function hideError(fieldName) {
        errorMessages[fieldName].textContent = '';
        errorMessages[fieldName].style.display = 'none';
    }

    function clearErrors() {
        Object.keys(errorMessages).forEach(key => {
            hideError(key);
        });
    }

});
