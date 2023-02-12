import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sortTitle: 0,
  sortList: [
    {name: 'популярности', sort: 'rating'}, 
    {name: 'цене', sort: 'price'}, 
    {name: 'алфавиту', sort: 'title'}
  ]
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSortTitle(state, action) {
      state.sortTitle = action.payload;
    }
  }
});

export const { setCategoryIndex, setSortTitle } = filterSlice.actions;

export default filterSlice.reducer;