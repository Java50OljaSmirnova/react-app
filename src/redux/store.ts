import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { codeReducer } from "./codeSlice";
import { productsReduser } from "./productsSlice";
export const store: any = configureStore({
    reducer:{
        auth: authReducer,
        codeState: codeReducer,
        productsState: productsReduser
    }
})