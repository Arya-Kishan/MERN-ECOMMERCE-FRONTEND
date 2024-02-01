import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddWishlist, deleteWishlist, fetchWishlist } from './wishlistApi';





const initialState = {
    wishlistItems: null,
    wishlistCount: 0,
    status: 'idle',
};






export const AddWishlistAsync = createAsyncThunk(
    'wishlist/AddWishlist',
    async (cartItem) => {
        const response = await AddWishlist(cartItem);
        return response.data;
    }
);

export const fetchWishlistAsync = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (userId) => {
        const response = await fetchWishlist(userId);
        return response.data;
    }
);

export const deleteWishlistAsync = createAsyncThunk(
    'wishlist/deleteWishlist',
    async (cartId) => {
        const response = await deleteWishlist(cartId);
        return response.data.data;
    }
);








export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        defaultCartStatus: (state) => {
            state.status = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(AddWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(AddWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.wishlistCount++;
            })
            .addCase(fetchWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.wishlistItems = action.payload;
                state.wishlistCount = action.payload.length;
            })
            .addCase(deleteWishlistAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteWishlistAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                let index = state.wishlistItems.findIndex((e) => e._id === action.payload._id);
                state.wishlistItems.splice(index, 1);
                state.wishlistCount--;
            })
    },
});

export const { defaultCartStatus } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist?.wishlistItems;
export const selectWishlistCount = (state) => state.wishlist?.wishlistCount;

export default wishlistSlice.reducer;
