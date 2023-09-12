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
  console.log("id ya", id);
  try {
    const res = await axios.get(`http://localhost:2000/asset/fc${id}`, {
      params: {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
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
    const res = await axios.post(`http://localhost:2000/asset/c${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("res", res);
    successAlert(res.data.message);
    return res;
  } catch (error) {
    console.log("err nih", error.response.data);
    errorAlertWithMessage(error.response.data.message);
    // throw error;
  }
};

// const fetchAssetByName = async (name) => {
//   console.log("name", name);

//   try {
//     const res = await axios.get(`http://localhost:2000/asset-byname`, {
//       params: {
//         assetName: name,
//       },
//     });
//     console.log("res fetchDataAsset name", res);
//     return res;
//   } catch (error) {
//     console.log("error assetName", error);
//     throw error;
//   }
// };

export { createDataAsset, fetchDataAsset };
