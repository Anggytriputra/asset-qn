import axios from "axios";
import {
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../../helper/alerts";

const BASEURL = "/asset";

const fetchDataAsset = async (categoryId, subCategoryId) => {
  // console.log("categoryId nih", categoryId);
  // console.log("subcategoryId", subCategoryId);
  const id = categoryId;
  // console.log("id ya", id);
  try {
    const res = await axios.get(`http://localhost:2000/asset/fc${id}`, {
      params: {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
      },
    });

    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const createDataAsset = async (data, id) => {
  try {
    // console.log("created data asset", data);
    // console.log("id category", id);
    const res = await axios.post(`http://localhost:2000/asset/c${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("res", res);
    successAlert(res.data.message);
    return res.data;
  } catch (error) {
    console.log("err nih", error.response.data);
    errorAlertWithMessage(error.response.data.message);
    // throw error;
  }
};

export { createDataAsset, fetchDataAsset };
