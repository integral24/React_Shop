import React, { useEffect, useState, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import Title from '../components/Title';
import Pagination from '../components/Pagination';
import {
  setCategoryIndex,
  setFilters,
  setSortTitle,
  setActivePage,
  setActiveNumberPage,
  setLoadMoreActivePage,
} from '../redux/slices/filterSlice';
import { getPizzas, addPizzas } from '../redux/slices/pizzasSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    categoryIndex,
    sortTitle,
    sortList,
    arrowAsc,
    activePage,
    loadMoreActivePage,
    searchValue,
  } = useAppSelector((state) => state.filterSlice);
  const { pizzasCount, pizzas, status } = useAppSelector((state) => state.pizzasSlice);
  const [title, setTitle] = useState('Bce');

  const isFirstLoad = useRef<boolean>(true);
  const limitPizzas = 6;
  const pages = Math.ceil(pizzasCount / limitPizzas);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstLoad.current) {
      getFilterParamsFromURL();
      getProducts();
    } else {
      getProducts();
      setFilterParamsToURL();
    }
    isFirstLoad.current = false;
  }, [categoryIndex, sortTitle, arrowAsc, activePage, searchValue]);

  const getProducts = () => {
    getPizzasHandler(`${process.env.REACT_APP_URL}/products`);
    dispatch(setLoadMoreActivePage(activePage + 1));
  };

  const getFilterParamsFromURL = () => {
    if (isFirstLoad.current) {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        dispatch(setFilters(params as Record<string, string>));

        let sortNumber = 0;
        if (params.sortBy === 'price') {
          sortNumber = 1;
        } else if (params.sortBy === 'title') {
          sortNumber = 2;
        }
        dispatch(setSortTitle(sortNumber));
        isFirstLoad.current = false;
      }
    } else {
      isFirstLoad.current = false;
    }
  };

  const setFilterParamsToURL = () => {
    const queryString = qs.stringify({
      category: categoryIndex,
      sortBy: sortList[sortTitle].sort,
      order: arrowAsc,
      page: activePage,
    });
    navigate(`?${queryString}`);
  };

  const createSortLink = (link: string) => {
    const requestLink =
      categoryIndex === 0
        ? `${link}?sortBy=${sortList[sortTitle].sort}`
        : `${link}?category=${categoryIndex}&sortBy=${sortList[sortTitle].sort}`;
    const result = `${requestLink}&order=${arrowAsc}`;
    return result;
  };

  const createSearchLink = (searchValue: string) => {
    return searchValue ? `&search=${searchValue}` : '';
  };

  const createPaginationLink = (pageNumber: number, limitPizzas: number) => {
    return `&page=${pageNumber}&limit=${limitPizzas}`;
  };

  const getPizzasHandler = async (link: string) => {
    const url =
      createSortLink(link) +
      createSearchLink(searchValue) +
      createPaginationLink(activePage, limitPizzas);

    dispatch(getPizzas(url));
  };

  const changeTitle = (title: string) => {
    setTitle(title);
  };

  const selectCategory = (index: number) => {
    dispatch(setCategoryIndex(index));
    dispatch(setActivePage(1));
    dispatch(setActiveNumberPage(1));
    dispatch(setLoadMoreActivePage(2));
  };

  const addNextPage = async (link: string) => {
    const url = (createSortLink(link) +
      createSearchLink(searchValue) +
      createPaginationLink(loadMoreActivePage, limitPizzas)) as string;

    dispatch(addPizzas(url));
  };

  return (
    <>
      <div className="content__top">
        <Categories
          changeTitle={changeTitle}
          value={categoryIndex}
          selectCategory={selectCategory}
        />
        <Sort />
      </div>
      <Title className="content__title medium">
        {title === 'Гриль' ? `Пиццы ${title}` : `${title} пиццы`}
      </Title>
      {status === 'error' ? (
        <div className="server-error">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось загрузить список пицц.</p>
          <p>Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
            : pizzas.map((el, idx) => <Card key={idx} {...el} />)}
        </div>
      )}
      <Pagination pages={pages} addNextPage={addNextPage} loadMoreActivePage={loadMoreActivePage} />
    </>
  );
};

export default HomePage;
