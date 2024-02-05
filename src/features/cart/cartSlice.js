import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddCartItem, deleteCartItem, fetchCartItems, updateCartItem } from './cartApi';








const initialState = {
  items: null,
  cartCount: null,
  cartStatus: null,
  status: 'loading',
};








export const AddCartItemAsync = createAsyncThunk(
  'cart/AddCartItem',
  async (cartItem) => {
    const response = await AddCartItem(cartItem);
    console.log(response.data);
    return response.data;
  }
);

export const fetchCartItemsAsync = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId) => {
    const response = await fetchCartItems(userId);
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (cartId) => {
    const response = await deleteCartItem(cartId);
    return response.data.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (cart) => {
    const response = await updateCartItem(cart);
    return response.data;
  }
);













export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    defaultCartStatus: (state) => {
      state.cartStatus = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartStatus = action.payload.message;
        state.cartCount++;
      })
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartCount = action.payload.length;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.items.findIndex((e) => e._id === action.payload._id);
        state.items.splice(index, 1, action.payload);

      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.items.findIndex((e) => e._id === action.payload._id);
        state.items.splice(index, 1);
        state.cartCount--;
      })
  },
});

export const { defaultCartStatus } = counterSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectcartCount = (state) => state.cart.cartCount;
export const selectcartStatus = (state) => state.cart.cartStatus;

export default counterSlice.reducer;
