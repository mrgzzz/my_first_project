import React, { useState } from 'react';

const UserRegistrationForm = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px' }}>
      <h2>Регистрация пользователя</h2>
      
      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Имя: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Пароль: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {}
      <div style={{ marginBottom: '15px' }}>
        <label>Подтверждение пароля: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
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
        <select name="age" value={formData.age} onChange={handleChange} required>
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="45+">45+</option>
        </select>
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
          required
        />
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default UserRegistrationForm;