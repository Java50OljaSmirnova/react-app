import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { codeReducer } from "./codeSlice";
export const store: any = configureStore({
    reducer:{
        auth: authReducer,
        codeState: codeReducer
    }
})