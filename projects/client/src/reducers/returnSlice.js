import axios from "axios";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const BASE_URL = "/return-asset";

const initReturnAsset = {
  totalPages: 0,
  totalItems: 0,
  returnAsset: [],
  isLoading: false,
};

const returnSlice = createSlice({
  name: "return asset",
  initialState: initReturnAsset,
  reducers: {
    setReturn(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setReturn, setLoading } = returnSlice.actions;

export function fetchReqReturnAsset(query = "") {
  console.log("ini dta", query);

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(`${BASE_URL}?${query}`);

      console.log("response", res);
      dispatch(
        setReturn({
          returnAsset: res.data.transH,
          totalItem: res.data.transHCount,
          totalPages: Math.ceil(res.data.transHCount / 6),
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function reqReturnAsset(data, id) {
  console.log("ini data return", data);
  console.log("id untuk url", id);

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const response = await api.post(`${BASE_URL}/rt`, data);

      console.log("response", response);
      // dispatch(setLoading(false))
      successAlert(response.data.message);
      return response;
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export function cofirmasiReturnAsset(data, id) {
  console.log("ini dta", data);
  console.log("id untuk url", id);

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const response = await api.post(`${BASE_URL}/confirmasi`, data);

      console.log("response", response);
      successAlert(response.data.message);
      return response;
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export default returnSlice.reducer;
