import { createSlice } from "@reduxjs/toolkit";
const initialState: {counter: number} = {
    counter: 0
}
const counterSlice = createSlice({
initialState: initialState,
name: "count",
reducers: {
    increment: (state, data) => {
        state.counter = state.counter + data.payload
    },
    decrement: (state, data) => {
        state.counter = state.counter - data.payload
    },
    reset: (state) => {
        state.counter = initialState.counter
    }
}
});
export const  counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;