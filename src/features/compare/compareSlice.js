import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    compareItems: [],
    comapareCount: 0,
    status: 'idle',
};




export const comapreSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addComapareItem: (state, action) => {
            state.compareItems.push(action.payload);
            state.comapareCount++;
        },
        deleteComapareItem: (state, action) => {
            state.compareItems.splice(action.payload, 1)
            state.comapareCount--;
        },
        clearComapareItem: (state, action) => {
            state.compareItems = [];
            state.comapareCount = 0;
        },
    },
});

export const { addComapareItem, deleteComapareItem, clearComapareItem } = comapreSlice.actions;

export const selectCompareItems = (state) => state.compare.compareItems;
export const selectCompareCount = (state) => state.compare.comapareCount;

export default comapreSlice.reducer;
