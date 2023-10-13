// Formik.js

import * as Yup from "yup";

const qtyValidationSchema = (asset) => {
  console.log("yup asset", asset);
  return Yup.object().shape({
    qty: Yup.number()
      .required("Jumlah harus diisi")
      .min(1, "Jumlah tidak boleh negatif")
      .test(
        "is-available-qty",
        "Qty melebihi jumlah yang tersedia",
        function (value) {
          console.log("value", value);
          const assetData = asset.find(
            (item) => item.id === this.options.context.assetId
          );
          if (assetData) {
            console.log("assetData fromik", assetData);
            return value <= assetData.qty;
          } else {
            return true;
          }
        }
      ),
  });
};

export { qtyValidationSchema };
