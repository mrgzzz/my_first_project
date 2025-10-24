import React, { useState } from 'react';

const UserRegistrationFormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    age: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.trim()) newErrors.email = 'Email обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.bio.trim()) newErrors.bio = 'Расскажите о себе';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Форма валидна, данные:', formData);
      alert('Форма успешно отправлена!');
    } else {
      console.log('Ошибки валидации:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px' }}>
      <h2>Регистрация с валидацией</h2>
      
      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Имя: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Пароль: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Подтверждение пароля: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Пол: </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Мужской
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Женский
        </label>
        {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Подписка на рассылку
        </label>
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Возраст: </label>
        <select name="age" value={formData.age} onChange={handleChange}>
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="45+">45+</option>
        </select>
        {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>О себе: </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          style={{ width: '100%' }}
        />
        {errors.bio && <div style={{ color: 'red' }}>{errors.bio}</div>}
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default UserRegistrationFormWithValidation;