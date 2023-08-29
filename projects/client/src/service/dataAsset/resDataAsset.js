import axios from "axios";
import { successAlert } from "../../helper/alerts";

const BASEURL = "/asset";

const fetchDataAsset = async (requestData) => {
  try {
    const res = await axios.get(`http://localhost:2000/asset`, {
      params: requestData,
    });
    return res;
  } catch (error) {
    console.log("error", error.response.data.message);
    throw error;
  }
};

const createDataAsset = async (data) => {
  console.log("created data asset", data);

  try {
    const res = await axios.post(`http://localhost:2000/asset/t`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("res created asset", res);
    successAlert(res.data.message);
    return res.data;
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
};

export { createDataAsset, fetchDataAsset };
