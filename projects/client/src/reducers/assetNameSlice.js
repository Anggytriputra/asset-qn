import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const BASE_URL = `/asset-name-by-categoryId`;

const initBranch = {
  assetName: [],
  isLoading: true,
};

export const assetNameSlice = createSlice({
  name: "asset name",
  initialState: initBranch,
  reducers: {
    setAssetName(state, action) {
      state.assetName = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAssetName, setLoading } = assetNameSlice.actions;

export function fetchAssetNameByCategor(id) {
  console.log("id fetch asset", id);
  return async (dispatch) => {
    try {
      const data = await api.get(`${BASE_URL}`, {
        params: {
          categoryId: id,
        },
      });
      console.log("data nih asset name", data);
      dispatch(setAssetName(data.data.mAssetName));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export default assetNameSlice.reducer;
