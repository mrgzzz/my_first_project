import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserRegistrationForm />
      <hr />
      <UserRegistrationFormWithValidation />
      <hr />
      <ContactFormUncontrolled />
    </div>
  );
}

export default App;