import { createSlice } from '@reduxjs/toolkit';

const initialItemState = [];
const itemSlice = createSlice({
    name: 'items',
    initialState: initialItemState,
    reducers: {
        setItem(state, action) {
            return action.payload;
        },
    },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
