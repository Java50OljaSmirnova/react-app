import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
export const store: any = configureStore({
    reducer:{
        auth: authReducer
    }
})