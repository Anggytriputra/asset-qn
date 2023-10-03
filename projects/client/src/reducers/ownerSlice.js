import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initBranch = {
  allOwner: [],
  ownerByAssetId: [],
  isLoading: true,
};

export const ownerSlice = createSlice({
  name: "branch",
  initialState: initBranch,
  reducers: {
    setOwner(state, action) {
      state.allOwner = action.payload;
    },
    setOwnerByAssetId(state, action) {
      state.ownerByAssetId = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setOwner, setOwnerByAssetId, setLoading } = ownerSlice.actions;

export function fetchAllOwner() {
  return async (dispatch) => {
    try {
      const data = await axios.get("http://localhost:2000/owner");
      console.log("data nih owner", data);
      dispatch(setOwner(data.data.owner));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export function fetchOwnerByAssetId(id) {
  const BASEURL = "http://localhost:2000";
  console.log("slice owner", id);
  return async (dispatch) => {
    try {
      const data = await axios.get(`${BASEURL}/owner/${id}`);
      console.log("data nih owner", data);
      dispatch(setOwnerByAssetId(data.data.owner));
    } catch (error) {
      console.log(error.res);
    }
  };
}

export default ownerSlice.reducer;
