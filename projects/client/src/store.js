import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import branchReducer from "./reducers/branchSlice.js";
import assetReducer from "./reducers/assetSlice.js";
import categorySlice from "./reducers/categorySlice";
import imageSlice from "./reducers/imageSlice";
import transReqOrderSlice from "./reducers/transReqOrderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    branch: branchReducer,
    asset: assetReducer,
    category: categorySlice,
    image: imageSlice,
    transHOrder: transReqOrderSlice,
  },
});

export default store;
