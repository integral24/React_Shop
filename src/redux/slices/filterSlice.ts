import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFilterSliceState {
  searchValue: string;
  categoryIndex: number;
  sortTitle: number;
  sortList: {
    name: 'Популярности' | 'Цене' | 'Алфавиту';
    sort: 'rating' | 'price' | 'title';
  }[];
  arrowAsc: string;
  activePage: number;
  activeNumberPage: number;
  loadMoreActivePage: number;
}

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryIndex: 0,
  sortTitle: 0,
  sortList: [
    { name: 'Популярности', sort: 'rating' },
    { name: 'Цене', sort: 'price' },
    { name: 'Алфавиту', sort: 'title' },
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setSortTitle(state, action: PayloadAction<number>) {
      state.sortTitle = action.payload;
    },
    setArrowAsc(state, action: PayloadAction<string>) {
      state.arrowAsc = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setActiveNumberPage(state, action: PayloadAction<number>) {
      state.activeNumberPage = action.payload;
    },
    setLoadMoreActivePage(state, action: PayloadAction<number>) {
      state.loadMoreActivePage = action.payload;
    },
    setFilters(state, action: PayloadAction<Record<string, string>>) {
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
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
