import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Categories({ changeTitle, value, selectCategory, closeBurger }) {
  const categoryIndex = useSelector(state => state.filterSlice.categoryIndex);
  
  const categories = [
    'Все', 
    'Мясные', 
    'Вегетарианские', 
    'Гриль', 
    'Острые', 
    'Закрытые'
  ];
  
  useEffect(() => {
    changeTitle(categories[categoryIndex]);
  }, [categoryIndex]);

  const selectActiveIndex = (idx) => {
    selectCategory(idx);
    closeBurger();
  };

  return (
    <ul>
      {categories.map((el, idx) => {
        return (
          <li key={idx}>
            <button
              onClick={() => selectActiveIndex(idx)}
              className={value === idx ? 'active' : ''}>
              {el}
            </button>
          </li>
        );
      })}
    </ul>
  );
}