import React from "react";
import DetailTransfer from "../components/formDetailTransferAsset/DetailTransfer";
import { useLocation, useParams } from "react-router-dom";

const DetailTransferAsset = () => {
  const location = useLocation();

  // console.log("location", location);
  const { assetId } = useParams();
  const assetTransfer = location.state.asset;

  console.log("assetId", assetTransfer);

  return (
    <div>
      {/* <div>DetailTransferAsset</div> */}

      <DetailTransfer detailData={assetTransfer} />
    </div>
  );
};

export default DetailTransferAsset;
