import axios from "axios";
import {
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../../helper/alerts";
import api from "../../api/api";

const BASE_URL = "/asset";

const fetchDataAsset = async (
  categoryId,
  subCategoryId,
  branchIdUser,
  userRole
) => {
  // console.log("categoryId nih", categoryId);
  // console.log("subcategoryId", subCategoryId);
  console.log("branchId", userRole);
  const id = categoryId;
  console.log("id ya", id);
  try {
    const res = await api.get(`${BASE_URL}/fc1`, {
      params: {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        branchId: branchIdUser,
        userRole: userRole,
      },
    });

    console.log("res fetch", res);
    return res;
  } catch (error) {
    console.log("error fetch", error);
    throw error;
  }
};

const createDataAsset = async (data, id) => {
  try {
    // console.log("created data asset", data);
    // console.log("id category", id);
    const res = await api.post(`${BASE_URL}/c${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("res", res);
    successAlert(res.data.message);
    return res;
  } catch (error) {
    console.log("err nih", error.response.data);
    errorAlertWithMessage(error.response.data.message);
    return error;

    // throw error;
  }
};

const updateDataAsset = async (id, assetId, data) => {
  console.log("ini id update", id);
  try {
    const res = await api.patch(`${BASE_URL}/update_asset${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        assetId: assetId,
      },
    });
    successAlert(res.data.message);
    console.log("res", res);
    return res;
  } catch (error) {
    errorAlertWithMessage(error.response.data.message);
    console.log("error", error);
    return error;
  }
};

export { createDataAsset, fetchDataAsset, updateDataAsset };
