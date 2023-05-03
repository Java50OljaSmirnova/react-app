import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { codeReducer } from "./codeSlice";
import { productsReduser } from "./productsSlice";
import { shoppingReducer } from "./shoppingSlice";
export const store: any = configureStore({
    reducer:{
        auth: authReducer,
        codeState: codeReducer,
        productsState: productsReduser,
        shoppingState: shoppingReducer
    }
})