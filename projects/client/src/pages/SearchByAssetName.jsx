import React, { useState } from "react";
import TransitionFade from "../components/TransitionFade";
import AddDataHeader from "../components/AddDataHeader";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

import {
  colsKendaraan,
  colsSpecialTools,
  colsStandardTools,
  colsSafetyTools,
} from "../constant/headColsdataAsset";
import Kendaraan2TableBody from "../components/tableBodyAssetByName/Kendaraan2TableBody";
import StandardTools2TableBody from "../components/tableBodyAssetByName/StandardTools2TableBody";
import SafetyTools2TableBody from "../components/tableBodyAssetByName/SafetyTools2TableBody";
import SpecialTools2TableBody from "../components/tableBodyAssetByName/SpecialTools2TableBody";
import AssetNotFound from "../components/AssetNotFound";

const SearchByAssetName = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const assetGlobal = useSelector((state) => state.asset);

  // console.log("asset Global", assetGlobal);
  // console.log("asset Global satset", assetGlobal);

  const columnNameConstant = [
    "Asset Name",
    "Description",
    "Branch",
    "Category",
  ];

  if (assetGlobal.isLoading || !assetGlobal?.Assets?.assets?.length) {
    return <AssetNotFound />;
  }

  const categoryName = assetGlobal?.Assets?.assets[0]?.m_category?.name;

  let tableBodyComponent = null;
  if (categoryName === "Kendaraan") {
    tableBodyComponent = (
      <Kendaraan2TableBody asset={assetGlobal.Assets.assets} />
    );
  } else if (categoryName === "Special Tools") {
    tableBodyComponent = (
      <SpecialTools2TableBody asset={assetGlobal.Assets.assets} />
    );
  } else if (categoryName === "Standard Tools") {
    tableBodyComponent = (
      <StandardTools2TableBody asset={assetGlobal.Assets.assets} />
    );
  } else if (categoryName === "Safety Tools") {
    tableBodyComponent = (
      <SafetyTools2TableBody asset={assetGlobal.Assets.assets} />
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center ml-4 mr-4 py-6">
        <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          Search Asset by name
        </h1>
      </div>

      <TransitionFade>
        <Table
          className="mb-4"
          headCols={
            categoryName === "Standard Tools" || categoryName === "Safety Tools"
              ? ["Asset Name", "Category", "Branch", "Quantity", "Description"]
              : ["Asset Name", "Category", "Branch", "Description"]
          }
          tableBody={tableBodyComponent}
        />

        <Pagination
          //   itemsInPage={}
          totalItems={12}
          totalPages={2}
          currentPage={1}
          setCurrentPage={setCurrentPage}
        />
      </TransitionFade>
    </div>
  );
};

export default SearchByAssetName;
