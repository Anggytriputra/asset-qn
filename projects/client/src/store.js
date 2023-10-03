import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import branchReducer from "./reducers/branchSlice.js";
import assetReducer from "./reducers/assetSlice.js";
import categorySlice from "./reducers/categorySlice";
import imageSlice from "./reducers/imageSlice";
import transReqOrderSlice from "./reducers/transReqOrderSlice";
import transferSlice from "./reducers/transferSlice";
import allUsersSlice from "./reducers/allUsersSlice";
import statusSlice from "./reducers/statusSlice";
import returnSlice from "./reducers/returnSlice";
import ownerSlice from "./reducers/ownerSlice";
import assetNameSlice from "./reducers/assetNameSlice";
// impo;

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersSlice,
    branch: branchReducer,
    asset: assetReducer,
    category: categorySlice,
    image: imageSlice,
    transHOrder: transReqOrderSlice,
    transferAsset: transferSlice,
    returnAsset: returnSlice,
    status: statusSlice,
    owner: ownerSlice,
    assetName: assetNameSlice,
  },
});

export default store;
