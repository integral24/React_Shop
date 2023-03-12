import React from 'react';
import Search from './Search.jsx';
import PizzaLogo from '../assets/img/pizza-logo.svg';
import PizzaCart from '../assets/img/cart.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setSortTitle,
  setArrowAsc,
  setActivePage,
  setActiveNumberPage,
  setLoadMoreActivePage,
} from '../redux/slices/filterSlice.js';

export default function Header() {
  const dispatch = useDispatch();

  const getDefaultPage = () => {
    dispatch(setCategoryIndex(0));
    dispatch(setSortTitle(0));
    dispatch(setArrowAsc('asc'));
    dispatch(setActivePage(1));
    dispatch(setActiveNumberPage(1));
    dispatch(setLoadMoreActivePage(2));
  };

  const { totalPrice } = useSelector((state) => state.cartSlice);
  const addCount = useSelector((state) => state.cartSlice.items);
  const itemsCount = addCount.length ? addCount.reduce((sum, el) => sum + el.count, 0) : 0;

  return (
    <div className="header">
      <div className="container">
        <Link onClick={getDefaultPage} to="/">
          <div className="header__logo">
            <img width="38" src={PizzaLogo} alt="Pizza logo" />
            <div>
              <h1>Pizza Stars</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img src={PizzaCart} alt="cart" />
            <span>{itemsCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
