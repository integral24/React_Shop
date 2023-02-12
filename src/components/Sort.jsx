import React, { useState, useEffect, useCallback, useRef } from 'react';
import dh from '../assets/helpers/domhelper.js';
import { useSelector, useDispatch } from 'react-redux';
import { setSortTitle } from '../redux/slices/filterSlice.js';

function Sort({ sortList, arrowAsc, setArrowAsc }) {
  const [open, setOpen] = useState(false);
  const sortRef = useRef(null);
  const sortTitle = useSelector(state => state.filterSlice.sortTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) dh.addEventListener('click', close);
    return () => dh.removeEventListener('click', close);
  }, [open]);

  const close = useCallback((e) => {
    if (!sortRef.current?.contains(e.target)) setOpen(false);
  }, []);

  const setSortTitleHandler = (event, idx) => {
    event.stopPropagation();
    dispatch(setSortTitle(idx));
    setOpen(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Сортировка по:</b>
        <div onClick={() => setOpen((prev) => !prev)}>
          <span className="sort__title"><strong>{sortList[sortTitle].name}</strong></span>
        </div>
        <div className="icon-arrow" onClick={() => setArrowAsc(prev => !prev)}>
          <div className={`icon-arrow-top ${!arrowAsc ? 'desc' : ''}`}></div>
        </div>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((_, idx) => (
              <li
                key={idx}
                onClick={(event) => setSortTitleHandler(event, idx)}
                className={sortTitle === idx ? 'active' : ''}>
                {sortList[idx].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
