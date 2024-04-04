import { createSlice } from '@reduxjs/toolkit';

const initialFlightInfoState = [];
const flightInfoSlice = createSlice({
    name: 'flightInfo',
    initialState: initialFlightInfoState,
    reducers: {
        initialFlightInfo() {
            return [];
        },
        setFlightInfo(state, action) {
            return [...state, action.payload]; // 새로운 배열을 반환하여 불변성 유지
        },
        // deleteFlightInfo(state, action) {
        //     deleteFlightInfo(1, action.payload);
        // },
    },
});

export const flightInfoActions = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
