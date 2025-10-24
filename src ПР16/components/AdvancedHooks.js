import React, { useReducer, useContext, createContext, useCallback, useMemo, useRef } from 'react';

const UserContext = createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

const AdvancedHooks = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const user = useContext(UserContext);

  const inputRef = useRef(null);
  const renderCount = useRef(0);
  renderCount.current++;

  const handleFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const expensiveValue = useMemo(() => {
    console.log('Вычисление дорогой операции...');
    return state.count * 100;
  }, [state.count]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Продвинутые хуки</h2>

      {}
      <div>
        <h3>useReducer: Счетчик</h3>
        <p>Текущее значение: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button>
      </div>

      {}
      <div>
        <h3>useContext: Данные пользователя</h3>
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      {}
      <div>
        <h3>useRef: Фокус на input</h3>
        <input ref={inputRef} type="text" placeholder="Нажмите кнопку для фокуса" />
        <button onClick={handleFocus}>Фокус на input</button>
        <p>Компонент отрендерен: {renderCount.current} раз</p>
      </div>

      {}
      <div>
        <h3>useMemo: Дорогое вычисление</h3>
        <p>Результат: {expensiveValue}</p>
      </div>
    </div>
  );
};

const AdvancedHooksWithProvider = () => (
  <UserContext.Provider value={{ name: 'Иван Иванов', email: 'ivan@example.com' }}>
    <AdvancedHooks />
  </UserContext.Provider>
);

export default AdvancedHooksWithProvider;