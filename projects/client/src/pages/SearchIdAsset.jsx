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

const SearchIdAsset = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const assetGlobal = useSelector((state) => state.asset);

  console.log("asset Global", assetGlobal);
  // console.log("asset Global satset", assetGlobal.Assets.assets);

  const columnNameConstant = [
    "Asset Name",
    "Description",
    "Branch",
    "Category",
  ];

  if (assetGlobal.isLoading || !assetGlobal?.Assets?.assets?.length) {
    return <Spinner />;
  }

  // const columnNames = assetGlobal?.Assets?.assets[0]?.m_assets_ins?.map(
  //   (item) => item?.m_form?.column_name
  // );

  // columnNames.unshift(...columnNameConstant);

  // console.log("column name", columnNames);

  const categoryName = assetGlobal?.Assets?.assets[0]?.m_category?.name;
  // Pilih kolom berdasarkan categoryName
  const selectedColumns =
    categoryName === "Kendaraan"
      ? colsKendaraan
      : categoryName === "Special Tools"
      ? colsSpecialTools
      : categoryName === "Standard Tools"
      ? colsStandardTools
      : categoryName === "Safety Tools"
      ? colsSafetyTools
      : []; // Atau Anda bisa memberikan nilai default jika tidak ada yang cocok

  console.log("Selected Columns:", selectedColumns);

  // Pilih komponen body tabel berdasarkan categoryName
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
          headCols={selectedColumns}
          tableBody={tableBodyComponent}
        />

        <Pagination
          //   itemsInPage={}
          totalItems={5}
          totalPages={6}
          currentPage={5}
          setCurrentPage={setCurrentPage}
        />
      </TransitionFade>
    </div>
  );
};

export default SearchIdAsset;
