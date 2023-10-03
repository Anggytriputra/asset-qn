import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import KendaraanDetails from "../components/formDetailsAsset/KendaraanDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesByAssetId } from "../reducers/imageSlice";
import Spinner from "../components/Spinner";
import SpecialToolsDetails from "../components/formDetailsAsset/SpecialToolsDetails";
import StandardToolsDetail from "../components/formDetailsAsset/StandardToolsDetail";
import SafetyToolDetail from "../components/formDetailsAsset/SafetyToolDetail";

const DetailsAsset = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { assetId } = useParams();
  const asset = location.state.asset;

  console.log("apaan nih", asset);

  const imageGlobal = useSelector((state) => state.image);
  console.log("image global", imageGlobal);

  const categoryName = imageGlobal.images?.assets?.[0]?.name || "";

  console.log("category name", categoryName);

  useEffect(() => {
    dispatch(fetchImagesByAssetId(assetId));
  }, [assetId]);

  return (
    <div>
      <h2>Detail Asset with ID: {assetId}</h2>
      {imageGlobal.isLoading ? (
        <Spinner />
      ) : categoryName === "Kendaraan" ? (
        <KendaraanDetails
          asset={asset}
          img={imageGlobal.images}
        />
      ) : categoryName === "Special Tools" ? (
        <SpecialToolsDetails
          asset={asset}
          img={imageGlobal.images}
        />
      ) : categoryName === "Standard Tools" ? (
        <StandardToolsDetail
          asset={asset}
          img={imageGlobal.images}
        />
      ) : categoryName === "Safety Tools" ? (
        <SafetyToolDetail
          asset={asset}
          img={imageGlobal.images}
        />
      ) : null}
    </div>
  );
};

export default DetailsAsset;
