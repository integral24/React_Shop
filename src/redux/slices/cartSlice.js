import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((el) => el.idProduct === action.payload.idProduct);

      if (findItem) findItem.count++;
      else state.items.push(action.payload);

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((el) => el.idProduct === action.payload.idProduct);

      if (findItem.count > 0) findItem.count--;

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((el) => el.idProduct !== action.payload.idProduct);

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
