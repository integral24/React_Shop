import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sortTitle: 0,
  sortList: [
    { name: 'популярности', sort: 'rating' },
    { name: 'цене', sort: 'price' },
    { name: 'алфавиту', sort: 'title' },
  ],
  arrowAsc: 'asc',
  activePage: 1,
  activeNumberPage: 1,
  loadMoreActivePage: 2,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = Number(action.payload);
    },
    setSortTitle(state, action) {
      state.sortTitle = Number(action.payload);
    },
    setArrowAsc(state, action) {
      state.arrowAsc = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = Number(action.payload);
    },
    setActiveNumberPage(state, action) {
      state.activeNumberPage = Number(action.payload);
    },
    setLoadMoreActivePage(state, action) {
      state.loadMoreActivePage = Number(action.payload);
    },
    setFilters(state, action) {
      state.categoryIndex = Number(action.payload.category);
      state.activePage = Number(action.payload.page);
      state.arrowAsc = action.payload.order;
      state.activeNumberPage = Number(action.payload.page);
    },
  },
});

export const {
  setCategoryIndex,
  setSortTitle,
  setArrowAsc,
  setActivePage,
  setLoadMoreActivePage,
  setActiveNumberPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
