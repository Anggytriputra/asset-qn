import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initCategory = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initCategory,
  reducers: {
    setCategory(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export default categorySlice.reducer;

export const { setCategory, setLoading } = categorySlice.actions;

export function fetchCategories(query = "") {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`http://localhost:2000/category?${query}`);
      // console.log("re4scategori", res.data.data);
      dispatch(
        setCategory({
          categories: res.data.data,
        })
      );
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      // errorAlert(err);
      // console.log(err);
    }
  };
}

export function fetchSubCategories(query = "") {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `http://localhost:2000/sub-category?${query}`
      );
    } catch (err) {
      console.log("err", err);
    }
  };
}
