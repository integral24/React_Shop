import React, { useState } from 'react';

function Sort() {
  const [open, setOpen] = useState(false);
  const [sortTitle, setSortTitle] = useState(0);
  const sortList = ['популярности', 'цене', 'алфавиту'];

  function selectTitle(idx) {
    setSortTitle(idx);
    setOpen((prev) => !prev);
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <span className="icon-arrow-top" />
        <b>Сортировка по:</b>
        <div onClick={() => setOpen((prev) => !prev)}>
          <span>{sortList[sortTitle]}</span>
        </div>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((el, idx) => (
              <li
                key={idx}
                onClick={() => selectTitle(idx)}
                className={sortTitle === idx ? 'active' : ''}>
                {sortList[idx]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
