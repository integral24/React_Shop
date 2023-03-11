import React, { useEffect } from 'react';

export default function Card({ title, imageUrl, products, types }) {
  const typeNames = ['тонкая', 'традиционная'];
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  useEffect(() => {
    setActiveSize(products[0]);
  }, []);

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
                onClick={() => setActiveSize(el)}
                className={activeSize.idProduct === el.idProduct ? 'active' : ''}>
                {el.size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {activeSize.price} ₽</div>
          <button className="button button--outline button--add">
            <span className="icon-plus" />
            <span>Добавить</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
}