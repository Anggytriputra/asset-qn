import { createSlice } from "@reduxjs/toolkit";
import {
  successAlert,
  errorAlertWithMessage,
  errorAlert,
} from "../helper/alerts";

import axios from "axios";

const initDataAsset = {
  images: [],
  isLoading: false,
};

const imageSlice = createSlice({
  name: "image",

  initialState: initDataAsset,

  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setImages, setLoading } = imageSlice.actions;

export function fetchImagesByAssetId(id) {
  const BASEURL = "http://localhost:2000/img/as";
  //   console.log("queryfetcProductsliec", query);

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${BASEURL}`, {
        params: {
          idAsset: id,
        },
      });
      console.log("res images slice", res);
      dispatch(
        setImages({
          assets: res.data.img,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      // errorAlert();
      console.log(error.message);
    }
  };
}

export default imageSlice.reducer;
