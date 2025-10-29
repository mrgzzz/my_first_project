import React, { useState } from 'react';
import {
  WelcomeMessage,
  UserCard,
  Button,
  Card,
  Toggle,
  ConditionalMessage
} from './basic/BasicComponents';
import {
  Counter,
  LoginForm,
  ColorPicker,
  TodoList,
  SearchBox
} from './stateful/StatefulComponents';
import {
  Timer,
  WindowSizeTracker,
  DataFetcher
} from './lifecycle/LifecycleComponents';
import {
  CounterWithHooks,
  UserProfile,
  EffectDemo,
  ThemeToggle,
  ThemeProvider,
  FetchDemo
} from './hooks/HooksComponents';

const ComponentTests = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [dataFetcherUserId, setDataFetcherUserId] = useState(1);

  // Тестовые данные
  const testUser = {
    name: 'Анастасия Яковлева',
    email: 'nastya@gmail.com',
    avatar: 'https://avatars.mds.yandex.net/i?id=91106e46cefbd1b10a14f1fe8bf63cc15edaba91-8474988-images-thumbs&n=13',
    isOnline: true
  };

  const testUser2 = {
    name: 'Камола Юсупова',
    email: 'kamola@gmail.com',
    avatar: 'https://avatars.mds.yandex.net/i?id=d653281638a1be4acbfc4469132b6b7fe007f447-8492261-images-thumbs&n=13',
    isOnline: false
  };

  const renderBasicComponents = () => (
    <div className="test-section">
      <h2>🧩 Базовые компоненты</h2>
      
      <Card title="👋 WelcomeMessage - приветственное сообщение">
        <WelcomeMessage name="Анастасия" age={19} />
        <WelcomeMessage name="Камола" age={17} />
      </Card>

      <Card title="👤 UserCard - карточка пользователя">
        <UserCard user={testUser} />
        <UserCard user={testUser2} />
      </Card>

      <Card title="🔄 Button - кнопки разных стилей">
        <Button variant="primary" size="large" onClick={() => alert('Основная кнопка!')}>
          🔥 Основная кнопка
        </Button>
        <Button variant="secondary" size="medium" onClick={() => alert('Вторичная кнопка!')}>
          ⚡ Вторичная кнопка
        </Button>
        <Button size="small" onClick={() => alert('Маленькая кнопка!')}>
          📌 Маленькая кнопка
        </Button>
      </Card>

      <Card title="🎭 Toggle - показать/скрыть контент">
        <Toggle>
          <div style={{padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <h4>Скрытый контент! 🎉</h4>
            <p>Это содержимое можно показать или скрыть с помощью кнопки.</p>
            <UserCard user={testUser} />
          </div>
        </Toggle>
      </Card>

      <Card title="📢 ConditionalMessage - сообщения по статусу">
        <ConditionalMessage status="success" message="Операция выполнена успешно! ✅" />
        <ConditionalMessage status="error" message="Произошла ошибка при выполнении! ❌" />
        <ConditionalMessage status="warning" message="Внимание: проверьте введенные данные! ⚠️" />
        <ConditionalMessage status="info" message="Информационное сообщение для пользователя ℹ️" />
      </Card>
    </div>
  );

  const renderStatefulComponents = () => (
    <div className="test-section">
      <h2>🎯 Компоненты с состоянием</h2>
      
      <Card title="🔢 Counter - счётчик с кнопками">
        <Counter />
      </Card>

      <Card title="🔐 LoginForm - форма входа с валидацией">
        <LoginForm />
      </Card>

      <Card title="🎨 ColorPicker - выбор цвета">
        <ColorPicker />
      </Card>

      <Card title="📝 TodoList - список задач">
        <TodoList />
      </Card>

      <Card title="🔍 SearchBox - поиск с результатами">
        <SearchBox />
      </Card>
    </div>
  );

  const renderLifecycleComponents = () => (
    <div className="test-section">
      <h2>⏱️ Жизненный цикл компонентов</h2>
      
      <Card title="⏰ Timer - секундомер">
        <Timer />
        <p style={{marginTop: '15px', color: '#666', fontSize: '0.9em'}}>
          💡 Откройте консоль браузера для просмотра логов жизненного цикла
        </p>
      </Card>

      <Card title="📏 WindowSizeTracker - отслеживание размера окна">
        <WindowSizeTracker />
        <p style={{marginTop: '15px', color: '#666', fontSize: '0.9em'}}>
          💡 Попробуйте изменить размер окна браузера
        </p>
      </Card>

      <Card title="🌐 DataFetcher - загрузка данных с API">
        <DataFetcher 
          userId={dataFetcherUserId}
          onUserIdChange={setDataFetcherUserId}
        />
        <p style={{marginTop: '15px', color: '#666', fontSize: '0.9em'}}>
          💡 Используется JSONPlaceholder API для демонстрации
        </p>
      </Card>
    </div>
  );

  const renderHooksComponents = () => (
    <ThemeProvider>
      <div className="test-section">
        <h2>⚛️ Хуки и функциональные компоненты</h2>
        
        <Card title="🎯 CounterWithHooks - счётчик на хуках">
          <CounterWithHooks />
        </Card>

        <Card title="👨‍💼 UserProfile - редактирование профиля">
          <UserProfile />
        </Card>

        <Card title="🔄 EffectDemo - демонстрация useEffect">
          <EffectDemo />
        </Card>

        <Card title="🌓 ThemeToggle - переключение темы">
          <ThemeToggle />
        </Card>

        <Card title="📡 FetchDemo - кастомный хук useFetch">
          <FetchDemo />
        </Card>
      </div>
    </ThemeProvider>
  );

  return (
    <div className="component-tests">
      <div className="test-summary shadow-effect">
        <h3>📊 Статистика выполнения</h3>
        <ul>
          <li>🧩 Базовые компоненты: <strong>6</strong></li>
          <li>🎯 Компоненты с состоянием: <strong>5</strong></li>
          <li>⏱️ Компоненты с жизненным циклом: <strong>3</strong></li>
          <li>⚛️ Компоненты с хуками: <strong>5 + 2 кастомных хука</strong></li>
          <li>🎉 Всего создано компонентов: <strong>19</strong></li>
        </ul>
      </div>
      
      <nav className="test-nav">
        <button 
          className={`nav-btn ${activeSection === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveSection('basic')}
        >
          🧩 Базовые
        </button>
        <button 
          className={`nav-btn ${activeSection === 'stateful' ? 'active' : ''}`}
          onClick={() => setActiveSection('stateful')}
        >
          🎯 Состояние
        </button>
        <button 
          className={`nav-btn ${activeSection === 'lifecycle' ? 'active' : ''}`}
          onClick={() => setActiveSection('lifecycle')}
        >
          ⏱️ Жизненный цикл
        </button>
        <button 
          className={`nav-btn ${activeSection === 'hooks' ? 'active' : ''}`}
          onClick={() => setActiveSection('hooks')}
        >
          ⚛️ Хуки
        </button>
      </nav>

      <div className="test-content">
        {activeSection === 'basic' && renderBasicComponents()}
        {activeSection === 'stateful' && renderStatefulComponents()}
        {activeSection === 'lifecycle' && renderLifecycleComponents()}
        {activeSection === 'hooks' && renderHooksComponents()}
      </div>
    </div>
  );
};

export default ComponentTests;