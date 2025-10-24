import React, { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const CustomHooks = () => {

  const [name, setName] = useLocalStorage('username', '');
  
  const [isVisible, toggleVisible] = useToggle(true);
  
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Кастомные хуки</h2>

      {}
      <div>
        <h3>useLocalStorage: Сохранение в localStorage</h3>
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Сохраненное имя: {name}</p>
      </div>

      {}
      <div>
        <h3>useToggle: Переключатель видимости</h3>
        <button onClick={toggleVisible}>
          {isVisible ? 'Скрыть' : 'Показать'}
        </button>
        {isVisible && <p>Этот текст можно скрыть/показать</p>}
      </div>

      {}
      <div>
        <h3>useFetch: Загрузка данных</h3>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        {data && (
          <div>
            <p>ID: {data.id}</p>
            <p>Title: {data.title}</p>
            <p>Completed: {data.completed ? 'Да' : 'Нет'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomHooks;