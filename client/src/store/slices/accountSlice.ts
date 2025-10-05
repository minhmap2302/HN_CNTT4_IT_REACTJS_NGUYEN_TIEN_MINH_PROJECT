
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../utils/type";


// lay thong tin account
export const getAllAccount =createAsyncThunk("getAllAccount" ,async () => {
    try {
        const res = await axios.get("http://localhost:8080/user");
        return res.data
    } catch (error) {
        console.log(error);
    }
})
// hàm thêm (đăng kí user )

export const addUser = createAsyncThunk("addUser" , async (newUser:User) => {
    try {
        const res = await axios.post("http://localhost:8080/user",newUser)
        return res.data
    } catch (error) {
        console.log(error);
    }
})




const account  = createSlice({
    name:"account",
    initialState:{
        users : []
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllAccount.fulfilled,(state , action) => {
            state.users = action.payload
        })
        .addCase(addUser.fulfilled,(state,action) => {
            console.log("them thanh cong", action.payload);
            state.users.push(action.payload);
        })
    }
})

export default account.reducer