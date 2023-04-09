import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((el) => el.idProduct === action.payload);

      if (findItem) {
        if (findItem.count > 1) findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, el) => {
        return sum + el.price * el.count;
      }, 0);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((el) => el.idProduct !== action.payload);

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
