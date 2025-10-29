import React, { Component } from 'react';
import './StatefulComponents.css';

// ЗАДАНИЕ 3: Классовые компоненты с состоянием

// 3.1. Компонент Counter
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="counter">
        <h3>Счетчик: {this.state.count}</h3>
        <div className="counter-buttons">
          <button onClick={this.decrement} className="btn btn-secondary">-</button>
          <button onClick={this.reset} className="btn btn-secondary">Сброс</button>
          <button onClick={this.increment} className="btn btn-primary">+</button>
        </div>
      </div>
    );
  }
}

// 3.2. Компонент LoginForm
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!this.state.email) {
      errors.email = 'Email обязателен';
    } else if (!this.validateEmail(this.state.email)) {
      errors.email = 'Некорректный email';
    }

    if (!this.state.password) {
      errors.password = 'Пароль обязателен';
    } else if (this.state.password.length < 6) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (Object.keys(errors).length === 0) {
      alert('Форма успешно отправлена!');
      this.setState({ email: '', password: '', errors: {} });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h3>Форма входа</h3>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className={this.state.errors.email ? 'error' : ''}
          />
          {this.state.errors.email && (
            <span className="error-message">{this.state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className={this.state.errors.password ? 'error' : ''}
          />
          {this.state.errors.password && (
            <span className="error-message">{this.state.errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    );
  }
}

// 3.3. Компонент ColorPicker
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#007bff',
      colors: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14']
    };
  }

  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <div className="color-picker">
        <h3>Выбор цвета</h3>
        <div 
          className="color-preview"
          style={{ backgroundColor: this.state.selectedColor }}
        >
          Выбранный цвет: {this.state.selectedColor}
        </div>
        <div className="color-options">
          {this.state.colors.map((color, index) => (
            <div
              key={index}
              className={`color-option ${this.state.selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => this.handleColorSelect(color)}
            />
          ))}
        </div>
      </div>
    );
  }
}

// ЗАДАНИЕ 4: Обработка событий и формы

// 4.1. Компонент TodoList
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    if (this.state.newTodo.trim()) {
      const newTodo = {
        id: Date.now(),
        text: this.state.newTodo.trim(),
        completed: false
      };
      
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
        newTodo: ''
      }));
    }
  };

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  };

  render() {
    return (
      <div className="todo-list">
        <h3>Список задач</h3>
        
        <div className="todo-input">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Введите новую задачу..."
          />
          <button onClick={this.addTodo} className="btn btn-primary">
            Добавить
          </button>
        </div>

        <div className="todos">
          {this.state.todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                onClick={() => this.deleteTodo(todo.id)}
                className="btn btn-secondary btn-small"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// 4.2. Компонент SearchBox
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      allItems: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS',
        'Node.js',
        'Vue',
        'Angular',
        'Python',
        'Java'
      ]
    };
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.trim()) {
      const results = this.state.allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ results });
    } else {
      this.setState({ results: [] });
    }
  };

  clearSearch = () => {
    this.setState({ query: '', results: [] });
  };

  render() {
    return (
      <div className="search-box">
        <h3>Поиск</h3>
        
        <div className="search-input">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleSearch}
            placeholder="Введите запрос..."
          />
          {this.state.query && (
            <button onClick={this.clearSearch} className="btn btn-secondary">
              ×
            </button>
          )}
        </div>

        {this.state.results.length > 0 && (
          <div className="search-results">
            <h4>Результаты поиска:</h4>
            <ul>
              {this.state.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}

        {this.state.query && this.state.results.length === 0 && (
          <div className="no-results">Ничего не найдено</div>
        )}
      </div>
    );
  }
}

export {
  Counter,
  LoginForm,
  ColorPicker,
  TodoList,
  SearchBox
};