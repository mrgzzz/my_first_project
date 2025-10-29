import React, { Component } from 'react';
import './LifecycleComponents.css';

// ЗАДАНИЕ 5: Методы жизненного цикла

// 5.1. Компонент Timer
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false
    };
    this.timerId = null;
  }

  componentDidMount() {
    console.log('Timer component mounted');
  }

  componentWillUnmount() {
    this.stopTimer();
    console.log('Timer component will unmount');
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerId = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time + 1 }));
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      this.setState({ isRunning: false });
      clearInterval(this.timerId);
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ time: 0 });
  };

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  render() {
    return (
      <div className="timer">
        <h3>Секундомер</h3>
        <div className="timer-display">
          {this.formatTime(this.state.time)}
        </div>
        <div className="timer-controls">
          <button 
            onClick={this.startTimer} 
            disabled={this.state.isRunning}
            className="btn btn-primary"
          >
            Старт
          </button>
          <button 
            onClick={this.stopTimer} 
            disabled={!this.state.isRunning}
            className="btn btn-secondary"
          >
            Стоп
          </button>
          <button 
            onClick={this.resetTimer}
            className="btn btn-secondary"
          >
            Сброс
          </button>
        </div>
        <p>Статус: {this.state.isRunning ? 'Запущен' : 'Остановлен'}</p>
      </div>
    );
  }
}

// 5.2. Компонент WindowSizeTracker
class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    console.log('WindowSizeTracker component mounted');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    console.log('WindowSizeTracker component will unmount');
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return (
      <div className="window-size-tracker">
        <h3>Размер окна браузера</h3>
        <div className="size-info">
          <p>Ширина: <strong>{this.state.width}px</strong></p>
          <p>Высота: <strong>{this.state.height}px</strong></p>
        </div>
        <div 
          className="size-visualization"
          style={{
            width: `${this.state.width / 10}px`,
            height: `${this.state.height / 10}px`
          }}
        >
          Масштаб 1:10
        </div>
      </div>
    );
  }
}

// 5.3. Компонент DataFetcher
class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    
    try {
      // Используем JSONPlaceholder API для демонстрации
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${this.props.userId || 1}`
      );
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ 
        error: error.message, 
        loading: false 
      });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div className="data-fetcher">
        <h3>Загрузка данных пользователя</h3>
        <div className="user-id-control">
          <label>ID пользователя: </label>
          <input
            type="number"
            value={this.props.userId || 1}
            onChange={(e) => this.props.onUserIdChange(Number(e.target.value))}
            min="1"
            max="10"
          />
        </div>

        {loading && <div className="loading">Загрузка...</div>}
        
        {error && (
          <div className="error">
            Ошибка: {error}
            <button onClick={this.fetchData} className="btn btn-secondary">
              Повторить
            </button>
          </div>
        )}
        
        {data && !loading && (
          <div className="user-data">
            <h4>Данные пользователя:</h4>
            <p><strong>Имя:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Телефон:</strong> {data.phone}</p>
            <p><strong>Website:</strong> {data.website}</p>
            <p><strong>Компания:</strong> {data.company?.name}</p>
          </div>
        )}
      </div>
    );
  }
}

export {
  Timer,
  WindowSizeTracker,
  DataFetcher
};