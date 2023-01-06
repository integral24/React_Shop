import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import Categories from './components/Categories.jsx';
import Sort from './components/Sort.jsx';
import Card from './components/Card.jsx';
import Skeleton from './components/Skeleton.jsx';
import axios from 'axios';
import Title from './components/Title.jsx';

function App() {
  const URL = 'https://63b7bf6b4d97e82aa3c4bb44.mockapi.io/api/items';
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('Bce');

  useEffect(() => {
    getPizzas(URL);
  }, []);

  async function getPizzas(url) {
    const { data } = await axios.get(url);
    setPizzas(() => data);
    setIsLoading((prev) => !prev);
  }

  function changeTitle(title) {
    setTitle(title);
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories changeTitle={changeTitle} />
            <Sort />
          </div>
          <Title className="content__title">
            {title === 'Гриль' 
              ? `Пиццы ${title}` 
              : `${title} пиццы`}
          </Title>
          <div className="content__items">
            {isLoading
              ? [...new Array(5)].map((_, idx) => <Skeleton key={idx} />)
              : pizzas.map((el, idx) => <Card key={idx} {...el} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
