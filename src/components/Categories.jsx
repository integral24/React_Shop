import React, { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectActiveIndex = (idx) => {
    setActiveIndex(idx);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
