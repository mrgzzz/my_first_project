const express = require('express');
const usersRouter = require('./users');
const productsRouter = require('./products');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Главная страница');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Ошибка сервера');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});