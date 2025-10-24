import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Главная</Link>
          <Link to="/about" style={{ marginRight: '15px' }}>О нас</Link>
          <Link to="/products" style={{ marginRight: '15px' }}>Товары</Link>
          <Link to="/contact">Контакты</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/success" element={<ContactSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;