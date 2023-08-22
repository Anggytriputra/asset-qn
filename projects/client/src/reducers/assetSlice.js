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
  name: "assets",
  initialState: initDataAsset,
  reducers: {
    setAssets(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setAssets, setLoading } = assetSlice.actions;

export function fetchAssets(query = "") {
  const BASEURL = "http://localhost:2000/asset";
  // console.log("queryfetcProductsliec", query);

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      // const res = await axios.get(`${BASEURL}?${query}`);
      // // console.log("resasetslice", res.data.data);
      // dispatch(
      //   setAssets({
      //     assets: res.data.data,
      //     // totalItems: res.data,
      //     // totalPages: res.data,
      //   })
      // );
      // console.log("asset", res);
      // dispatch(setLoading(false));
    } catch (error) {
      // errorAlert();
      // console.log(error.message);
    }
  };
}

export default assetSlice.reducer;
