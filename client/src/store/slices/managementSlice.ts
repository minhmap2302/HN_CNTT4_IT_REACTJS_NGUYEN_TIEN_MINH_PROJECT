import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy toàn bộ dự án
export const getAllData = createAsyncThunk("getAllData", async () => {
  try {
    const res = await axios.get(`http://localhost:8080/project`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Thêm dự án
export const addProject = createAsyncThunk(
  "addProject",
  async (newProject: any) => {
    try {
      const res = await axios.post("http://localhost:8080/project", newProject);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Sửa dự án
export const editProject = createAsyncThunk("editProject", async (p: any) => {
  try {
    const res = await axios.put(`http://localhost:8080/project/${p.id}`, p);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Xóa dự án
export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/project/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

// ✅ Thêm reducer mới để cập nhật danh sách thành viên
const managementSlice = createSlice({
  name: "management",
  initialState: {
    project: [],
  },
  reducers: {
    updateProjectMembers: (state: any, action) => {
      const { projectId, members } = action.payload;
      const index = state.project.findIndex(
        (p: any) => p.id === Number(projectId)
      );
      if (index !== -1) {
        state.project[index].members = members;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(addProject.fulfilled, (state: any, action) => {
        state.project.push(action.payload);
      })
      .addCase(editProject.fulfilled, (state: any, action) => {
        const index = state.project.findIndex(
          (i: any) => i.id === action.payload.id
        );
        if (index !== -1) {
          state.project[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.project = state.project.filter(
          (i: any) => i.id !== action.payload
        );
      });
  },
});

export const { updateProjectMembers } = managementSlice.actions;
export default managementSlice.reducer;
