const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Телефон', price: 1000 },
  { id: 2, name: 'Ноутбук', price: 2000 }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Товар не найден');
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Товар не найден');
  
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Товар не найден');
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

module.exports = router;