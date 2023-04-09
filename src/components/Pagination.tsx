import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActivePage,
  setLoadMoreActivePage,
  setActiveNumberPage,
} from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

interface IPaginationProps {
  pages: number;
  addNextPage: (link: string) => void;
  loadMoreActivePage: number;
}

const Pagination: React.FC<IPaginationProps> = ({ pages, addNextPage, loadMoreActivePage }) => {
  const dispatch = useDispatch();
  const activeNumberPage = useSelector((state: RootState) => state.filterSlice.activeNumberPage);

  const getPage = (number: number) => {
    dispatch(setActivePage(number));
    dispatch(setActiveNumberPage(number));
  };

  const loadNextPage = () => {
    dispatch(setLoadMoreActivePage(loadMoreActivePage + 1));
    addNextPage(`${process.env.REACT_APP_URL}/products`);
    dispatch(setActiveNumberPage(activeNumberPage + 1));
  };

  return (
    <>
      {loadMoreActivePage <= pages ? (
        <div className="load-more" onClick={loadNextPage}>
          <button>Загрузить еще...</button>
        </div>
      ) : (
        ''
      )}
      <div className="pagination">
        {[...new Array(pages)].map((_, idx) => (
          <span
            className={cn({
              pagination__item: true,
              active: idx + 1 === activeNumberPage,
            })}
            onClick={() => getPage(idx + 1)}
            key={idx}>
            {' '}
            {idx + 1}{' '}
          </span>
        ))}
      </div>
    </>
  );
};

export default Pagination;
