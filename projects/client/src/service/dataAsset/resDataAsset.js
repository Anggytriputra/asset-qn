import axios from "axios";
import { successAlert } from "../../helper/alerts";

const BASEURL = "/asset";

const fetchDataAsset = async () => {
  try {
    const res = await axios.get(`http://localhost:2000/asset`);
    // console.log("res", res);
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const createDataAsset = async (data) => {
  // console.log("created data asset", data);

  try {
    const res = await axios.post(`http://localhost:2000/asset`, data, {
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
