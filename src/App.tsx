import React, { Suspense } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import FullCardItem from './pages/FullCardItem';
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route path="/pizza/:id" element={<FullCardItem />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
