import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearchText } from './searchApi';

const initialState = {
    status: 'loading',
    searchedProducts: null,
};





export const fetchSearchTextsAsync = createAsyncThunk(
    'search/fetchSearchText',
    async (search) => {
        const response = await fetchSearchText(search);
        return response.data;
    }
);






export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state) => {
            state.searchedProducts = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchTextsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchTextsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.searchedProducts = (action.payload);
            })
    },
});






export const { setSearch } = searchSlice.actions;

export const selectSearchedProducts = (state) => state.search.searchedProducts;

export default searchSlice.reducer;
