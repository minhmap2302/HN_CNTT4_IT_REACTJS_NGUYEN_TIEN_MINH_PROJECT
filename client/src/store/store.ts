import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import managementSlice from "./slices/managementSlice";
import detailsSlice from "./slices/detailsSlice";



const store = configureStore({
    reducer:{
        account : accountSlice,
        management : managementSlice,
        details : detailsSlice
    }   
})

export default store