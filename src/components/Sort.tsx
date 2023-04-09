import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortTitle, setArrowAsc } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Sort: React.FC = () => {
  const sortList = useSelector((state: RootState) => state.filterSlice.sortList);
  const sortTitle = useSelector((state: RootState) => state.filterSlice.sortTitle);
  const arrowAsc = useSelector((state: RootState) => state.filterSlice.arrowAsc);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.addEventListener('click', close);
    return () => document.body.removeEventListener('click', close);
  }, [open]);

  const close = useCallback((event: MouseEvent) => {
    if (!sortRef.current?.contains(event.target as HTMLElement)) setOpen(false);
  }, []);

  const setSortTitleHandler = (event: React.MouseEvent<HTMLLIElement>, idx: number) => {
    event.stopPropagation();
    dispatch(setSortTitle(idx));
    setOpen(false);
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Сортировка по:</b>
        <div onClick={() => setOpen((prev) => !prev)}>
          <span className="sort__title">
            <strong>{sortList[sortTitle].name}</strong>
          </span>
        </div>
        <div
          className="icon-arrow"
          onClick={() => dispatch(setArrowAsc(arrowAsc === 'asc' ? 'desc' : 'asc'))}>
          <div className={`icon-arrow-top ${arrowAsc === 'desc' ? 'desc' : ''}`}></div>
        </div>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((_, idx: number) => (
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
};

export default Sort;
