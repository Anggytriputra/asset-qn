import { createSlice } from "@reduxjs/toolkit";
import {
  successAlert,
  errorAlertWithMessage,
  errorAlert,
} from "../helper/alerts";

import axios from "axios";

const initDataAsset = {
  totalPages: 0,
  totalItems: 0,
  Assets: [],
  isLoading: false,
};

const assetSlice = createSlice({
  name: "asset",

  initialState: initDataAsset,

  reducers: {
    setAssets(state, action) {
      state.Assets = action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setAssets, setLoading } = assetSlice.actions;

export function fetchAssetByname(query) {
  const BASEURL = "http://localhost:2000/asset-byname";
  console.log("queryfetcProductsliec", query);

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${BASEURL}`, {
        params: {
          assetName: query,
        },
      });
      console.log("resasetslice", res);
      dispatch(
        setAssets({
          assets: res.data.asset.rows,
          // totalItems: res.data.totalItems, // Jika ada totalItems dalam respons
          // totalPages: res.data.totalPages, // Jika ada totalPages dalam respons
        })
      );
      console.log("asset", res);
      dispatch(setLoading(false));
    } catch (error) {
      // errorAlert();
      console.log(error.message);
    }
  };
}

export default assetSlice.reducer;
