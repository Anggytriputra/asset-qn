import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import branchReducer from "./reducers/branchSlice.js";
import assetReducer from "./reducers/assetSlice.js";
import categorySlice from "./reducers/categorySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    branch: branchReducer,
    asset: assetReducer,
    category: categorySlice,
  },
});

export default store;
