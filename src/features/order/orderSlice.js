import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddOrder, deleteAllUserCartItem, fetchOrder, mailOrderReceipt } from './orderApi';

const initialState = {
  orders: [],
  allCartDeleted: null,
  orderStatus: null,
  status: 'idle',
};









export const AddOrderAsync = createAsyncThunk(
  'order/AddOrder',
  async (order) => {
    const response = await AddOrder(order);
    return response.data;
  }
);

export const fetchOrderAsync = createAsyncThunk(
  'order/fetchOrder',
  async (userId) => {
    const response = await fetchOrder(userId);
    return response.data;
  }
);

export const deleteAllUserCartItemAsync = createAsyncThunk(
  'order/deleteCartItem',
  async (userId) => {
    const response = await deleteAllUserCartItem(userId);
    return response.data;
  }
);


export const mailOrderReceiptAsync = createAsyncThunk(
  'order/mailOrderReceipt',
  async (order) => {
    const response = await mailOrderReceipt(order);
    return response.data;
  }
);













export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderStatus: (state) => {
      state.orderStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = (action.payload);
        state.orderStatus = "Placed";
      })
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(deleteAllUserCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAllUserCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allCartDeleted = null;
      })
      .addCase(mailOrderReceiptAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mailOrderReceiptAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allCartDeleted = null;
      })
  },
});

export const { setOrderStatus } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectOrderStatus = (state) => state.order.orderStatus;

export default orderSlice.reducer;
