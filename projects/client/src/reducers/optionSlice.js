import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";

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

export function createAssetName(data) {
  console.log("ini datanya", data);
  return async (dispatch) => {
    try {
      const res = await api.post(`${BASE_URL}/asset_name`, data);
      console.log("res set asset names", res);
      successAlert(res.data.message);
    } catch (error) {
      console.log("error", error);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export default optionSlice.reducer;
