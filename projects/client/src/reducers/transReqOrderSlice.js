import axios from "axios";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";
import { createSlice } from "@reduxjs/toolkit";

const initOrderAssetSlice = {
  totalPages: 0,
  totalItems: 0,
  transHOrder: [],
  isLoading: false,
};

const transReqOrderSlice = createSlice({
  name: "Order Slice",
  initialState: initOrderAssetSlice,
  reducers: {
    setTransHOrder(state, action) {
      return action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setTransHOrder, setLoading } = transReqOrderSlice.actions;

export function fetchrequestAsset(query = "") {
  console.log("ini dta", query);
  const BASE_URL = "http://localhost:2000/transh";

  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const res = await axios.get(`${BASE_URL}?${query}`);

      console.log("response", res);
      dispatch(
        setTransHOrder({
          transHOrder: res.data.transHOrder.rows,
          totalItem: res.data.transHOrder.count,
          totalPages: Math.ceil(res.data.transHOrder.count / 6),
        })
      );
    } catch (error) {
      console.log("error", error.res.data.message);
    }
  };
}

export function requestAsset(data) {
  console.log("ini dta", data);
  return async (dispatch) => {
    try {
      // dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:2000/transh/req-order-asset",
        data
      );
      console.log("response", response);

      successAlert(response.data.message);
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export default transReqOrderSlice.reducer;
