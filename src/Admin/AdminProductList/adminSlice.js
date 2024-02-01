import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddCategory, AddProduct, fetchAllOrders, fetchSortedOrders, updateOrder } from './adminProductApi';

const initialState = {
  value: 0,
  orders: null,
  status: 'idle',
};







export const AddProductAsync = createAsyncThunk(
  'admin/AddProduct',
  async (product) => {
    const response = await AddProduct(product);
    return response.data;
  }
);

export const AddCategoryAsync = createAsyncThunk(
  'admin/AddCategory',
  async (category) => {
    const response = await AddCategory(category);
    return response.data;
  }
);


export const fetchAllOrdersAsync = createAsyncThunk(
  'admin/fetchAllOrders',
  async () => {
    const response = await fetchAllOrders();
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'admin/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const fetchSortedOrdersAsync = createAsyncThunk(
  'admin/fetchSortedOrders',
  async (order) => {
    const response = await fetchSortedOrders(order);
    return response.data;
  }
);








export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(AddCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(fetchSortedOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSortedOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.orders.findIndex((e) => e._id === action.payload._id);
        state.orders.splice(index, 1, action.payload);
      })
  },
});

export const { increment } = adminSlice.actions;

export const selectAllOrders = (state) => state.admin.orders;

export default adminSlice.reducer;
