import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// laasy toan bo du lieu
export const getDataTask = createAsyncThunk( "getDataTask" , async () => {
    try {
        const res = await axios.get("http://localhost:8080/task");
        return res.data
    } catch (error) {
        console.log(error);
    }
})


// them data
export const addDataTask = createAsyncThunk("addDataTask" , async (newTask : any) => {
    try {
        const res = await axios.post(`http://localhost:8080/task`,newTask);
        return res.data
    } catch (error) {
        console.log(error);
    }
})

// sua data
export const editDataTask = createAsyncThunk("editDataTask" , async (editTask : any) => {
    try {
        const res = await axios.put(`http://localhost:8080/task/${editTask.id}`,editTask);
        return res.data
    } catch (error) {
        console.log(error);
    }
})
// xoa data
export const deleteDataTask = createAsyncThunk("deleteDataTask" , async (id : number) => {
    try {
        const res = await axios.delete(`http://localhost:8080/task/${id}`);
        return id
    } catch (error) {
        console.log(error);
    }
})



const detailsSlice = createSlice({
    name:"details",
    initialState:{
        task : []
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getDataTask.fulfilled , (state , action) => {
            state.task = action.payload
        })
        .addCase(addDataTask.fulfilled , (state:any , action) => {
            state.task.push(action.payload);
        })
        .addCase(editDataTask.fulfilled , (state:any , action) => {
            const index = state.task.findIndex((i:any) => i.id === action.payload.id);
            state.task[index] = action.payload
        })
        .addCase(deleteDataTask.fulfilled , (state:any , action) => {
            state.task = state.task.filter((i:any) => i.id !== action.payload);
        })
    }
})
export default detailsSlice.reducer