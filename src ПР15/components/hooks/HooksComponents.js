import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// ЗАДАНИЕ 6: Хуки useState и useEffect

// 6.1. Компонент CounterWithHooks
const CounterWithHooks = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-hooks">
      <h3>Счетчик с хуками</h3>
      <p>Текущее значение: {count}</p>
      <div className="counter-buttons">
        <button 
          onClick={() => setCount(count - 1)}
          className="btn btn-secondary"
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)}
          className="btn btn-secondary"
        >
          Сброс
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="btn btn-primary"
        >
          +
        </button>
      </div>
    </div>
  );
};

// 6.2. Компонент UserProfile
const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Анастасия Яковлева',
    email: 'nastya@gmail.com',
    phone: '+7 (999) 999-99-99',
    bio: 'Студентка 319гр'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Здесь обычно будет API call для сохранения
    alert('Профиль сохранен!');
  };

  return (
    <div className="user-profile">
      <h3>Профиль пользователя</h3>
      
      <div className="profile-header">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-secondary"
        >
          {isEditing ? 'Отмена' : 'Редактировать'}
        </button>
      </div>

      <div className="profile-fields">
        <div className="field">
          <label>Имя:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div className="field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div className="field">
          <label>Телефон:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </div>

        <div className="field">
          <label>О себе:</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              rows="3"
            />
          ) : (
            <span>{user.bio}</span>
          )}
        </div>
      </div>

      {isEditing && (
        <button onClick={handleSave} className="btn btn-primary">
          Сохранить
        </button>
      )}
    </div>
  );
};

// 6.3. Компонент EffectDemo
const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect без зависимостей (componentDidMount + componentDidUpdate)
  useEffect(() => {
    console.log('Компонент смонтирован или обновлен');
  });

  // useEffect с пустым массивом зависимостей (только componentDidMount)
  useEffect(() => {
    console.log('Компонент смонтирован (один раз)');
    
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []);

  // useEffect с зависимостями (componentDidUpdate для конкретных значений)
  useEffect(() => {
    document.title = `Счетчик: ${count}`;
    console.log(`Счетчик обновлен: ${count}`);
  }, [count]);

  // useEffect для слушателя событий
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="effect-demo">
      <h3>Демонстрация useEffect</h3>
      
      <div className="demo-section">
        <h4>Счетчик: {count}</h4>
        <button 
          onClick={() => setCount(count + 1)}
          className="btn btn-primary"
        >
          Увеличить
        </button>
        <p>Заголовок страницы обновляется при изменении счетчика</p>
      </div>

      <div className="demo-section">
        <h4>Ввод имени</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите ваше имя"
        />
        <p>Привет, {name || 'незнакомец'}!</p>
      </div>

      <div className="demo-section">
        <h4>Ширина окна: {windowWidth}px</h4>
        <p>Попробуйте изменить размер окна браузера</p>
      </div>

      <div className="console-info">
        <p>Откройте консоль браузера, чтобы увидеть логи useEffect</p>
      </div>
    </div>
  );
};

// ЗАДАНИЕ 7: Кастомные хуки и useContext

// 7.1. Кастомный хук useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// 7.2. Кастомный хук useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

// Создание Context для темы
const ThemeContext = createContext();

// 7.3. Компонент ThemeToggle
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useLocalStorage('themeSettings', {
    darkMode: false,
    fontSize: 'medium'
  });

  const handleFontSizeChange = (size) => {
    setSettings(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  return (
    <div className={`theme-toggle ${theme}`}>
      <h3>Настройки темы</h3>
      
      <div className="theme-controls">
        <button onClick={toggleTheme} className="btn btn-primary">
          Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
        </button>
        
        <div className="font-size-controls">
          <label>Размер шрифта:</label>
          <div className="size-buttons">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                className={`btn ${settings.fontSize === size ? 'btn-primary' : 'btn-secondary'}`}
              >
                {size === 'small' ? 'Мелкий' : size === 'medium' ? 'Средний' : 'Крупный'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="theme-preview">
        <h4>Предпросмотр:</h4>
        <div className={`preview-content ${settings.fontSize}`}>
          <p>Это пример текста с текущими настройками темы.</p>
          <p>Тема: {theme === 'light' ? 'Светлая' : 'Тёмная'}</p>
          <p>Размер шрифта: {
            settings.fontSize === 'small' ? 'Мелкий' : 
            settings.fontSize === 'medium' ? 'Средний' : 'Крупный'
          }</p>
        </div>
      </div>
    </div>
  );
};

// Компонент-обёртка для провайдера темы
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Демонстрационный компонент для useFetch
const FetchDemo = () => {
  const [postId, setPostId] = useState(1);
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return (
    <div className="fetch-demo">
      <h3>Демонстрация useFetch</h3>
      
      <div className="post-controls">
        <label>ID поста: </label>
        <input
          type="number"
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          min="1"
          max="100"
        />
      </div>

      {loading && <div className="loading">Загрузка поста...</div>}
      {error && <div className="error">Ошибка: {error}</div>}
      
      {post && !loading && (
        <div className="post">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <p><em>Post ID: {post.id}</em></p>
        </div>
      )}
    </div>
  );
};

export {
  CounterWithHooks,
  UserProfile,
  EffectDemo,
  useLocalStorage,
  useFetch,
  ThemeToggle,
  ThemeProvider,
  ThemeContext,
  FetchDemo
};