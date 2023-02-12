import React, { useEffect, useState, useContext } from 'react';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import Card from '../components/Card.jsx';
import Skeleton from '../components/Skeleton.jsx';
import axios from 'axios';
import Title from '../components/Title.jsx';
import { SearchContext } from '../App.js';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/filterSlice.js';

function HomePage() {
  const categoryIndex = useSelector(state => state.filterSlice.categoryIndex);
  const sortList = useSelector(state => state.filterSlice.sortList);

  const sortTitle = useSelector(state => state.filterSlice.sortTitle);
  const dispatch = useDispatch();
  const [arrowAsc, setArrowAsc] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('Bce');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    getPizzas(`${process.env.REACT_APP_URL}/items`);
    window.scrollTo(0, 0);
  }, [categoryIndex, sortTitle, arrowAsc]);

  function createLink(link) {
    const requestLink = categoryIndex === 0 
      ? `${link}?sortBy=${sortList[sortTitle].sort}` 
      : `${link}?category=${categoryIndex}&sortBy=${sortList[sortTitle].sort}`;

    const result = arrowAsc ? `${requestLink}&order=asc` : `${requestLink}&order=desc`;
    return result;
  }

  async function getPizzas(link) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(createLink(link));
      setPizzas(() => data);
      setIsLoading(false);
    } catch (err) {
      console.log('Error:', err.message);
    }
  }

  function changeTitle(title) {
    setTitle(title);
  }

  const closeBurgerMenu = () => {
    setBurgerOpen(false);
  };

  const selectCategory = (index) => {
    dispatch(setCategoryIndex(index));
  };

  return (
    <>
      <div className="content__top">
        <div className="burger">
          <button 
            className="burger__button"
            onClick={() => setBurgerOpen(true)}>
            <div className="burger__img"></div>
          </button>
          <div className={!burgerOpen ? 'burger__page close' : 'burger__page'}>
            <div className="bp__header">
              <div className="bp__title"><strong>ВЫБОР КАТЕГОРИИ</strong></div>
              <button 
                className='bp__button'
                onClick={() => closeBurgerMenu()}>&#10006;
              </button>
            </div>
            <div className="bp__categories">
              <Categories 
                changeTitle={changeTitle}
                closeBurger={() => closeBurgerMenu()} 
                value={categoryIndex}
                selectCategory={selectCategory}/>
            </div>
          </div>
        </div>
        <div className="categories">
          <Categories 
            changeTitle={changeTitle} 
            closeBurger={() => closeBurgerMenu()} 
            value={categoryIndex}
            selectCategory={selectCategory}/>
        </div>
        <Sort 
          sortList={sortList}
          arrowAsc={arrowAsc}
          setArrowAsc={(value) => setArrowAsc(value)}/>
      </div>
      <Title className="content__title medium">
        {title === 'Гриль' ? `Пиццы ${title}` : `${title} пиццы`}
      </Title>
      <div className="content__items">
        {isLoading
          ? [...new Array(5)].map((_, idx) => <Skeleton key={idx} />)
          : pizzas.filter(obj => {
            return obj.title.toLowerCase().includes(searchValue.toLowerCase()) 
              ? true : false;
          }).map((el, idx) => <Card key={idx} {...el}/>)}
      </div>
    </>
  );
}

export default HomePage;
