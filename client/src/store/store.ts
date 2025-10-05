import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import managementSlice from "./slices/managementSlice";



const store = configureStore({
    reducer:{
        account : accountSlice,
        management : managementSlice
    }   
})

export default store