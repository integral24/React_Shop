import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import ls from '../../helpers/ls';

interface ICartProduct {
  idCard: number;
  title: string;
  imageUrl: string;
  idProduct: number;
  price: number;
  type: string;
  size: number;
  count: number;
}

interface ICartSliceState {
  totalPrice: number;
  items: ICartProduct[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartProduct | { idProduct: number }>) {
      const findItem = state.items.find((el) => el.idProduct === action.payload.idProduct);

      if (findItem) {
        findItem.count++;
      } else if ('idCard' in action.payload) state.items.push(action.payload);

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);

      ls.setItem('cartState', state);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((el) => el.idProduct === action.payload);

      if (findItem) {
        if (findItem.count > 1) findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);

      ls.setItem('cartState', state);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((el) => el.idProduct !== action.payload);

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);

      ls.setItem('cartState', state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;

      ls.removeItem('cartState');
    },
    getCart(state) {
      const cart = ls.getItem<ICartSliceState>('cartState');
      if (cart) {
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
      }
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems, getCart } = cartSlice.actions;

export default cartSlice.reducer;
