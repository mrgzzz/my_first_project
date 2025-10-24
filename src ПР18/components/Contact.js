import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.email && formData.message) {
      navigate('/contact/success', { 
        state: { 
          name: formData.name,
          email: formData.email 
        }
      });
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>Контакты</h1>
      <form onSubmit={handleSubmit}>
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
        
        <div style={{ marginBottom: '15px' }}>
          <label>Сообщение: </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%' }}
            required
          />
        </div>
        
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Contact;