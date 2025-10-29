import React, { useState } from 'react';
import './App.css';

// Импорт всех компонентов
import ComponentTests from './components/ComponentTests';

function App() {
  const [currentView, setCurrentView] = useState('tests');

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎓 Практическая работа №15</h1>
        <div className="student-info">
          Студент: Яковлева Анастасия | Группа: 319
        </div>
      </header>
      
      <main className="App-main">
        {currentView === 'tests' && <ComponentTests />}
        
        {currentView === 'info' && (
          <div className="test-section">
            <h2>📋 О практической работе</h2>
            <div className="card">
              <h3 className="card-title">Цель работы</h3>
              <p>Освоить основы React: создание функциональных и классовых компонентов, 
              работа с props, state, событиями, жизненным циклом и hooks.</p>
            </div>
            
            <div className="card">
              <h3 className="card-title">Выполненные задачи</h3>
              <ul style={{textAlign: 'left', paddingLeft: '20px'}}>
                <li>✅ Создано 6 базовых компонентов</li>
                <li>✅ Реализовано 5 компонентов с состоянием</li>
                <li>✅ Разработано 3 компонента с жизненным циклом</li>
                <li>✅ Создано 5 компонентов с хуками + 2 кастомных хука</li>
                <li>✅ Всего: <strong>19 компонентов</strong></li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="test-nav">
          <button 
            className={`nav-btn ${currentView === 'tests' ? 'active' : ''}`}
            onClick={() => setCurrentView('tests')}
          >
            🧪 Тесты компонентов
          </button>
          <button 
            className={`nav-btn ${currentView === 'info' ? 'active' : ''}`}
            onClick={() => setCurrentView('info')}
          >
            ℹ️ О работе
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
