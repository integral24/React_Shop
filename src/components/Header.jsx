import React from 'react';
import Search from './Search.jsx';
import PizzaLogo from '../assets/img/pizza-logo.svg';
import PizzaCart from '../assets/img/cart.svg';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <div className="header">
      <div className="container">
        <Link to='/'>
          <div className="header__logo">
            <img width="38" src={PizzaLogo} alt="Pizza logo" />
            <div>
              <h1>Pizza Stars</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search/>
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <img src={PizzaCart} alt="cart" />
            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}