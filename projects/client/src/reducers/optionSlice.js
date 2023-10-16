import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const BASE_URL = "/option";

const initOptions = {
  merk: [],
  isLoading: false,
};

export const optionSlice = createSlice({
  name: "option",
  initialState: initOptions,
  reducers: {
    setMerk(state, action) {
      state.merk = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setMerk, setLoading } = optionSlice.actions;

export function fetchMerkByCategoryId(id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(`${BASE_URL}/merk`, {
        params: {
          categoryId: id,
        },
      });
      console.log("res mer", res.data.merk);
      dispatch(setMerk(res.data.merk));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export default optionSlice.reducer;
