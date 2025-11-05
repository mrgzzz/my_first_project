const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Иван', email: 'ivan@mail.com' },
  { id: 2, name: 'Мария', email: 'maria@mail.com' }
];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Пользователь не найден');
  res.json(user);
});

router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Пользователь не найден');
  
  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('Пользователь не найден');
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;