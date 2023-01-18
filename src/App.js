import React from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
