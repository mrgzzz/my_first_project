import React, { useState, useEffect } from 'react';

const BasicHooks = () => {
  const [count, setCount] = useState(0);
  
  const [form, setForm] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    console.log('Компонент отрендерен');
  });

  useEffect(() => {
    console.log('Компонент смонтирован');
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []);

  useEffect(() => {
    console.log(`Счетчик изменился: ${count}`);
  }, [count]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Базовые хуки</h2>
      
      {}
      <div>
        <h3>useState: Счетчик</h3>
        <p>Текущее значение: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Сброс</button>
      </div>

      {}
      <div style={{ marginTop: '20px' }}>
        <h3>useState: Форма</h3>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <p>Имя: {form.name}</p>
        <p>Email: {form.email}</p>
      </div>
    </div>
  );
};

export default BasicHooks;