import React from 'react';

function Categories({ changeTitle, value, selectCategory, closeBurger }) {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const selectActiveIndex = (idx) => {
    selectCategory(idx);
    changeTitle(categories[idx]);
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

export default Categories;
