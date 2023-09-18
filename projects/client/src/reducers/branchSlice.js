import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      const data = await axios.get("http://localhost:2000/branch");
      console.log("data nih branchslice", data);
      dispatch(setBranch(data.data.branches));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export default branchSlice.reducer;
