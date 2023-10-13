import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api/api";

const BASE_URL = "/branch";

const initBranch = {
  allBranches: [],
};

export const branchSlice = createSlice({
  name: "branch",
  initialState: initBranch,
  reducers: {
    setBranch: (state, action) => {
      return {
        ...state,
        allBranches: action.payload,
      };
    },
  },
});

export const { setBranch } = branchSlice.actions;

export function fetchAllBranches() {
  return async (dispatch) => {
    try {
      const data = await api.get(`${BASE_URL}`);
      // console.log("data nih branchslice", data);
      dispatch(setBranch(data.data.branches));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export default branchSlice.reducer;
