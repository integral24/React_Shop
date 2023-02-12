import React, { useState, createContext } from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Cart from './pages/Cart.jsx';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="*" element={<NotFoundPage />}/>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
