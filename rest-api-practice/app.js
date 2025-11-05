const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', year: 1869, genre: 'роман', isbn: '1234567890' },
  { id: 2, title: 'Преступление и наказание', author: 'Федор Достоевский', year: 1866, genre: 'роман', isbn: '1234567891' }
];

const logMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

app.use(logMiddleware);

app.get('/api/books', (req, res) => {
  let filteredBooks = [...books];
  const { author, genre, year, page = 1, limit = 10 } = req.query;

  if (author) {
    filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  if (genre) {
    filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if (year) {
    filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = filteredBooks.slice(startIndex, endIndex);

  res.json({
    books: result,
    total: filteredBooks.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author, year, genre, isbn } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Название и автор обязательны' });
  }

  if (isbn && books.find(b => b.isbn === isbn)) {
    return res.status(400).json({ error: 'Книга с таким ISBN уже существует' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || null,
    genre: genre || null,
    isbn: isbn || null
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const { title, author, year, genre, isbn } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Название и автор обязательны' });
  }

  if (isbn && books.find((b, index) => b.isbn === isbn && index !== bookIndex)) {
    return res.status(400).json({ error: 'Книга с таким ISBN уже существует' });
  }

  books[bookIndex] = {
    id: books[bookIndex].id,
    title,
    author,
    year: year || null,
    genre: genre || null,
    isbn: isbn || null
  };

  res.json(books[bookIndex]);
});

app.patch('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const { title, author, year, genre, isbn } = req.body;

  if (isbn && books.find((b, index) => b.isbn === isbn && index !== bookIndex)) {
    return res.status(400).json({ error: 'Книга с таким ISBN уже существует' });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...(title && { title }),
    ...(author && { author }),
    ...(year && { year }),
    ...(genre && { genre }),
    ...(isbn && { isbn })
  };

  res.json(books[bookIndex]);
});

app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Книга удалена', book: deletedBook });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});