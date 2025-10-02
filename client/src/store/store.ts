import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/account";



export const store = configureStore({
    reducer:{
        account : accountSlice
    }
})