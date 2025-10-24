import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  
  const products = {
    1: { name: 'Товар 1', price: 100, description: 'Описание товара 1' },
    2: { name: 'Товар 2', price: 200, description: 'Описание товара 2' },
    3: { name: 'Товар 3', price: 300, description: 'Описание товара 3' }
  };

  const product = products[id];

  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Товар не найден</h2>
        <Link to="/products">Вернуться к списку товаров</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.name}</h2>
      <p>Цена: {product.price} руб.</p>
      <p>Описание: {product.description}</p>
      <Link to="/products">Назад к товарам</Link>
    </div>
  );
};

export default ProductDetail;