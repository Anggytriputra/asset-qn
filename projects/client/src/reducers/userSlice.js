import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  id_karyawan: 0,
  username: "",
  email: "",
  name: "",
  id_role: 0,
  role: "",
  id_cabang: "",
  cabang_name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.id_karyawan = action.payload.id_karyawan;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id_role = action.payload.id_role;
      state.role = action.payload.role;
      state.id_cabang = action.payload.id_cabang;
      state.cabang_name = action.payload.cabang_name;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
