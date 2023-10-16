import axios from "axios";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const BASE_URL = "/transfer-asset";

const initTransferAsset = {
  totalPages: 0,
  totalItems: 0,
  transAsset: [],
  isLoading: false,
};

const transferSlice = createSlice({
  name: "transfer asset",
  initialState: initTransferAsset,
  reducers: {
    setTransfer(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setTransfer, setLoading } = transferSlice.actions;

export function fetchReqTransfers(query = "") {
  // console.log("ini dta", query);
  // const BASE_URL = "http://localhost:2000/transfer-asset";

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await api.get(`${BASE_URL}?${query}`);

      // console.log("response", res);
      dispatch(
        setTransfer({
          transAsset: res.data.transH.rows,
          totalItem: res.data.transH.count,
          totalPages: Math.ceil(res.data.transH.count / 6),
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function reqTransferAsset(data, id) {
  // console.log("ini dta", data);
  // console.log("id untuk url", id);

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const response = await api.post(`${BASE_URL}/t1`, data);

      // console.log("response", response);
      // dispatch(setLoading(false))
      successAlert(response.data.message);
      return response;
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
      return error.response;
    }
  };
}

export function cofirmasiAsset(data, id) {
  // console.log("ini dta", data);
  // console.log("id untuk url", id);

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const response = await api.post(`${BASE_URL}/confirmasi`, data);

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

export default transferSlice.reducer;
