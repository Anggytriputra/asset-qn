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
  users: [],
  isLoading: false,
};

const allUserSlice = createSlice({
  name: "Users",

  initialState: initDataAsset,

  reducers: {
    setAllUsers(state, action) {
      state.users = action.payload;
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setAllUsers, setLoading } = allUserSlice.actions;

export function fetchAllUsers(query) {
  console.log("id cabang ya", query);
  const BASEURL = "http://localhost:2000/users";
  console.log("serial number query", query);
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(BASEURL, {
        params: {
          branchId: query,
        },
      });
      console.log("res all users", res);
      dispatch(setAllUsers(res.data.m_users));

      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export default allUserSlice.reducer;
