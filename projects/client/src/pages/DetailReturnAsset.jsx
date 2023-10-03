import React from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailReturn from "../components/formReturnAsset/DetailReturn";

const DetailReturnAsset = () => {
  const location = useLocation();

  // console.log("location", location);
  const { assetId } = useParams();
  const assetReturn = location.state.asset;
  console.log("assetReturn ya", assetReturn);

  return (
    <div>
      <div>Detail Return Asset</div>

      <DetailReturn asset={assetReturn} />
    </div>
  );
};

export default DetailReturnAsset;
