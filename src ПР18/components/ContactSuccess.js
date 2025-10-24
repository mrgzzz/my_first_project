import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const { name, email } = location.state || {};

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Сообщение отправлено!</h1>
      {name && <p>Спасибо, {name}!</p>}
      {email && <p>Мы ответим вам на email: {email}</p>}
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default ContactSuccess;