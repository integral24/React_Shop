import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';

interface ICartItemProps {
  title: string;
  imageUrl: string;
  idProduct: number;
  price: number;
  type: string;
  size: number;
  count: number;
}

const CartItem: React.FC<ICartItemProps> = ({
  title,
  imageUrl,
  idProduct,
  price,
  type,
  size,
  count,
}) => {
  const dispatch = useDispatch();

  const removeProduct = () => {
    dispatch(removeItem(idProduct));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="cart__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{`${type} тесто, ${size} см.`}</p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          disabled={+count <= 1}
          onClick={() => dispatch(minusItem(idProduct))}>
          <span className='svg-icon'/>
        </button>
        <b>{count}</b>
        <div
          className="button button--outline button--circle cart__item-count-plus"
          onClick={() => dispatch(addItem({ idProduct }))}>
          <span className='svg-icon'/>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{`${price * count} ₽`}</b>
      </div>
      <div className="cart__item-remove" onClick={() => removeProduct()}>
        <div className="button button--outline button--circle">
          <span className='svg-icon'/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
