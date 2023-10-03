import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initStatus = {
  statusReturn: [],
  isLoading: true,
};

const statusSlice = createSlice({
  name: "status",
  initialState: initStatus,
  reducers: {
    setStatusReturn(state, action) {
      state.statusReturn = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setStatusReturn, setLoading } = statusSlice.actions;

export function fetchStatusReturn() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`http://localhost:2000/status`);
      console.log("ini res return", res.data);
      dispatch(setStatusReturn(res.data.statusReturn));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("err return", error);
    }
  };
}

export default statusSlice.reducer;
