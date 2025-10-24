import React, { useRef } from 'react';

const ContactFormUncontrolled = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };

    console.log('Данные формы (неуправляемая):', formData);
    alert('Форма отправлена! Проверьте консоль для просмотра данных.');

    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px' }}>
      <h2>Обратная связь (неуправляемая форма)</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Имя: </label>
        <input
          type="text"
          ref={nameRef}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email: </label>
        <input
          type="email"
          ref={emailRef}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Сообщение: </label>
        <textarea
          ref={messageRef}
          rows="4"
          style={{ width: '100%' }}
          required
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactFormUncontrolled;