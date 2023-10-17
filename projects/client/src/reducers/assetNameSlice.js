import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const BASE_URL = `/asset-name`;

const initBranch = {
  assetName: [],
  assetNames: [],
  isLoading: true,
};

export const assetNameSlice = createSlice({
  name: "asset name",
  initialState: initBranch,
  reducers: {
    setAssetName(state, action) {
      state.assetName = action.payload;
    },
    setAssetNames(state, action) {
      state.assetNames = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAssetName, setAssetNames, setLoading } =
  assetNameSlice.actions;

export function fetchAssetNameByCategor(id) {
  // console.log("id fetch asset", id);
  return async (dispatch) => {
    try {
      const data = await api.get(`${BASE_URL}/bycategoryId`, {
        params: {
          categoryId: id,
        },
      });
      // console.log("data nih asset name", data);
      dispatch(setAssetName(data.data.mAssetName));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchAssetName(query) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await api.get(`${BASE_URL}?${query}`);
      console.log("data nih asset name", data);
      dispatch(
        setAssetNames({
          asset: data.data.mAssetName.rows,
          totalItem: data.data.mAssetName.count,
          totalPages: Math.ceil(data.data.mAssetName.count / 7),
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export default assetNameSlice.reducer;
