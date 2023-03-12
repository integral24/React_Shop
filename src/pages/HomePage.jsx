import React, { useEffect, useState, useContext, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import Card from '../components/Card.jsx';
import Skeleton from '../components/Skeleton.jsx';
import axios from 'axios';
import Title from '../components/Title.jsx';
import Pagination from '../components/Pagination.jsx';
import { SearchContext } from '../App.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryIndex,
  setFilters,
  setSortTitle,
  setActivePage,
  setActiveNumberPage,
  setLoadMoreActivePage,
} from '../redux/slices/filterSlice.js';
import { setPizzasCount } from '../redux/slices/productSlice.js';

/* TODO:
- Всеравно происходят 2 запроса на сервер при открытии ссылки с параметрами (после того, как добавил функцию setFilterParamsToURL добавления параметров в ссылку при непервой загркзке страницы) Вариант из курса и использованием юзэффекта не работает и каждый раз увеличиваетс количество перерендера true

*/

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryIndex = useSelector((state) => state.filterSlice.categoryIndex);
  const sortTitle = useSelector((state) => state.filterSlice.sortTitle);
  const sortList = useSelector((state) => state.filterSlice.sortList);
  const arrowAsc = useSelector((state) => state.filterSlice.arrowAsc);
  const activePage = useSelector((state) => state.filterSlice.activePage);
  const loadMoreActivePage = useSelector((state) => state.filterSlice.loadMoreActivePage);

  const pizzasCount = useSelector((state) => state.productSlice.pizzasCount);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('Bce');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { searchValue } = useContext(SearchContext);
  const isFirstLoad = useRef(true);
  // const isMounted = useRef(false);
  // console.log(isMounted);

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

  // useEffect(() => {
  //   if (isMounted) {
  //     setFilterParamsToURL();
  //   }
  //   isMounted.current = true;
  // }, []);

  const getProducts = () => {
    getPizzas(`${process.env.REACT_APP_URL}/products`);
    dispatch(setLoadMoreActivePage(activePage + 1));
  };

  const getFilterParamsFromURL = () => {
    if (isFirstLoad.current) {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        dispatch(setFilters(params));

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

  const createSortLink = (link) => {
    const requestLink =
      categoryIndex === 0
        ? `${link}?sortBy=${sortList[sortTitle].sort}`
        : `${link}?category=${categoryIndex}&sortBy=${sortList[sortTitle].sort}`;
    const result = `${requestLink}&order=${arrowAsc}`;
    return result;
  };

  const createSearchLink = (searchValue) => {
    return searchValue ? `&search=${searchValue}` : '';
  };

  const createPaginationLink = (pageNumber, limitPizzas) => {
    return `&page=${pageNumber}&limit=${limitPizzas}`;
  };

  const getPizzas = async (link) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        createSortLink(link) +
          createSearchLink(searchValue) +
          createPaginationLink(activePage, limitPizzas),
      );
      dispatch(setPizzasCount(data.count));
      setPizzas(data.items);
      setIsLoading(false);
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const changeTitle = (title) => {
    setTitle(title);
  };

  const closeBurgerMenu = () => {
    setBurgerOpen(false);
  };

  const selectCategory = (index) => {
    dispatch(setCategoryIndex(index));
    dispatch(setActivePage(1));
    dispatch(setActiveNumberPage(1));
    dispatch(setLoadMoreActivePage(2));
  };

  const addNextPage = async (link) => {
    try {
      const { data } = await axios.get(
        createSortLink(link) +
          createSearchLink(searchValue) +
          createPaginationLink(loadMoreActivePage, limitPizzas),
      );
      setPizzas((prev) => prev.concat(data.items));
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  return (
    <>
      <div className="content__top">
        <div className="burger">
          <button className="burger__button" onClick={() => setBurgerOpen(true)}>
            <div className="burger__img"></div>
          </button>
          <div className={!burgerOpen ? 'burger__page close' : 'burger__page'}>
            <div className="bp__header">
              <div className="bp__title">
                <strong>ВЫБОР КАТЕГОРИИ</strong>
              </div>
              <button className="bp__button" onClick={() => closeBurgerMenu()}>
                &#10006;
              </button>
            </div>
            <div className="bp__categories">
              <Categories
                changeTitle={changeTitle}
                closeBurger={() => closeBurgerMenu()}
                value={categoryIndex}
                selectCategory={selectCategory}
              />
            </div>
          </div>
        </div>
        <div className="categories">
          <Categories
            changeTitle={changeTitle}
            closeBurger={() => closeBurgerMenu()}
            value={categoryIndex}
            selectCategory={selectCategory}
          />
        </div>
        <Sort />
      </div>
      <Title className="content__title medium">
        {title === 'Гриль' ? `Пиццы ${title}` : `${title} пиццы`}
      </Title>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : pizzas.map((el, idx) => <Card key={idx} {...el} />)}
      </div>
      <Pagination pages={pages} addNextPage={addNextPage} loadMoreActivePage={loadMoreActivePage} />
    </>
  );
}
