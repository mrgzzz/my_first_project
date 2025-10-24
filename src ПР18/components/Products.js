import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
    { id: 3, name: 'Товар 3', price: 300 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Товары</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <Link to={`/products/${product.id}`}>
              {product.name} - {product.price} руб.
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;