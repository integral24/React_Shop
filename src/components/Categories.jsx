import React, { useState } from 'react';

function Categories({ changeTitle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const selectActiveIndex = (idx) => {
    setActiveIndex(idx);
    changeTitle(categories[idx])
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, idx) => {
          return (
            <li key={idx}>
              <button
                onClick={() => selectActiveIndex(idx)}
                className={activeIndex === idx ? 'active' : ''}>
                {el}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
