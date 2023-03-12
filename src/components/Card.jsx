import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice.js';

export default function Card({ id, title, imageUrl, products, types }) {
  const typeNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState(0);
  const [activeProduct, setActiveProduct] = useState({});

  const dispatch = useDispatch();
  const addCount = useSelector((state) => state.cartSlice.items.filter((el) => el.idCard === id));
  const itemCount = addCount.length ? addCount.reduce((sum, el) => sum + el.count, 0) : 0;

  useEffect(() => {
    setActiveProduct(products[0]);
  }, []);

  const onClickAdd = () => {
    const item = {
      idCard: id,
      title,
      imageUrl,
      idProduct: activeProduct.idProduct,
      price: activeProduct.price,
      type: typeNames[activeType],
      size: activeProduct.size,
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-card">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el, idx) => (
              <li
                key={idx}
                onClick={() => setActiveType(el)}
                className={activeType === el ? 'active' : ''}>
                {typeNames[el]}
              </li>
            ))}
          </ul>
          <ul>
            {products.map((el, idx) => (
              <li
                key={idx}
                onClick={() => setActiveProduct(el)}
                className={activeProduct.idProduct === el.idProduct ? 'active' : ''}>
                {el.size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {activeProduct.price} ₽</div>
          <button className="button button--outline button--add" onClick={() => onClickAdd()}>
            <span className="icon-plus" />
            <span>Добавить</span>
            {itemCount > 0 && <i><p>{itemCount}</p></i>}
          </button>
        </div>
      </div>
    </div>
  );
}
