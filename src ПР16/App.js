import React from 'react';
import BasicHooks from './components/BasicHooks';
import AdvancedHooks from './components/AdvancedHooks';
import CustomHooks from './components/CustomHooks';
import HooksTests from './components/HooksTests';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Hooks Практика</h1>
      <BasicHooks />
      <AdvancedHooks />
      <CustomHooks />
      <HooksTests />
    </div>
  );
}

export default App;