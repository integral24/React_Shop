import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzasCount: 0,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPizzasCount(state, action) {
      state.pizzasCount = action.payload;
    },
  },
});

export const { setPizzasCount } = productSlice.actions;

export default productSlice.reducer;
