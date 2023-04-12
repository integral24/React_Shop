import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ICategoriesProps {
  changeTitle: (title: string) => void;
  value: number;
  selectCategory: (index: number) => void;
}

const Categories: React.FC<ICategoriesProps> = ({ changeTitle, value, selectCategory }) => {
  const categoryIndex = useSelector((state: RootState) => state.filterSlice.categoryIndex);
  const [open, setOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  useEffect(() => {
    changeTitle(categories[categoryIndex]);
  }, [categoryIndex]);

  useEffect(() => {
    if (open) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const close = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (!categoriesRef.current?.contains(target)) setOpen(false);
  }, []);

  const selectActiveIndex = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number,
  ) => {
    event.stopPropagation();
    selectCategory(idx);
    setOpen(false);
  };

  return (
    <div className="categories" ref={categoriesRef}>
      <div className="categories__label">
        <div className="categories__label__name">
          <b>Выбор категории:</b>
        </div>
        <div onClick={() => setOpen((prev) => !prev)}>
          <span className="categories__title">
            <strong>{categories[categoryIndex]}</strong>
          </span>
        </div>
      </div>
      <div className={`categories__popup ${open ? 'active' : ''}`}>
        <ul className="categories__content">
          {categories.map((el, idx) => {
            return (
              <li key={idx}>
                <button
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                    selectActiveIndex(event, idx)
                  }
                  className={value === idx ? 'active' : ''}>
                  {el}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
