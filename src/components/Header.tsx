import React, { useState } from 'react';
import Search from './Search';
import PizzaLogo from '../assets/img/pizza-logo.svg';
import PizzaCart from '../assets/img/cart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setSortTitle,
  setArrowAsc,
  setActivePage,
  setActiveNumberPage,
  setLoadMoreActivePage,
  setSearchValue,
} from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Header: React.FC = () => {

  const isSearch = !useLocation().pathname.includes('cart');
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');

  const getDefaultPage = () => {
    setValue('');
    dispatch(setSearchValue(''));
    dispatch(setCategoryIndex(0));
    dispatch(setSortTitle(0));
    dispatch(setArrowAsc('asc'));
    dispatch(setActivePage(1));
    dispatch(setActiveNumberPage(1));
    dispatch(setLoadMoreActivePage(2));
  };

  const { totalPrice } = useSelector((state: RootState) => state.cartSlice);
  const addCount = useSelector((state: RootState) => state.cartSlice.items);
  const itemsCount = addCount.length ? addCount.reduce((sum: number, el) => sum + el.count, 0) : 0;

  return (
    <div className="header">
      <div className="container">
        <Link onClick={getDefaultPage} to="/">
          <div className="header__logo">
            <img width="38" src={PizzaLogo} alt="Pizza logo" />
            <div>
              <h1>Pizza Original</h1>
              <p>Итальянская пицца</p>
            </div>
          </div>
        </Link>
        {isSearch && (
          <Search value={value} setValue={setValue} />
        )}
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
};

export default Header;
