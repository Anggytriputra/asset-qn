import axios from "axios";

const fetchImgByAssetId = async (editedAsset) => {
  // console.log("test img");

  const idAsset = editedAsset.id;
  // console.log("edited img2", idAsset);

  try {
    const res = await axios.get(`http://localhost:2000/img/as`, {
      params: {
        idAsset: idAsset,
      },
    });
    // console.log("res img", res);
    return res;
  } catch (error) {
    console.log("error img", error);
  }
};

export { fetchImgByAssetId };