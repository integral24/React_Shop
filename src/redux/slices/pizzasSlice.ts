import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPizzas = createAsyncThunk('pizzas/getPizzas', async (url: string) => {
  const { data } = await axios.get(url);
  return data;
});

export const addPizzas = createAsyncThunk('pizzas/addPizzas', async (url: string) => {
  const { data } = await axios.get(url);
  return data;
});

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IProductItem {
  size: number;
  price: number;
  idProduct: number;
}

interface IProduct {
  id: number;
  title: string;
  imageUrl: string;
  products: IProductItem[];
  types: number[];
}

interface IPizzasSliceState {
  pizzas: IProduct[];
  status: Status;
  pizzasCount: number;
}

const initialState: IPizzasSliceState = {
  pizzas: [],
  status: Status.LOADING,
  pizzasCount: 0,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(getPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload.items;
      state.pizzasCount = action.payload.count;
    });
    builder.addCase(getPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
    builder.addCase(addPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(addPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = state.pizzas.concat(action.payload.items);
    });
    builder.addCase(addPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
