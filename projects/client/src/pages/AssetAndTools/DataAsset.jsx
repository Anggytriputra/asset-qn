import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchAllBranches } from "../../reducers/branchSlice";
import TransitionFade from "../../components/TransitionFade";
import AddDataHeader from "../../components/AddDataHeader";
import Table from "../../components/Table";
import DataAssetForm from "../../components/DataAssetForm";
// import { fetchAssets } from "../../reducers/assetSlice";
import AssetTableBody from "../../components/AssetTableBody";
import {
  fetchAllCategoriesData,
  fetchCategories,
} from "../../reducers/categorySlice";
import axios from "axios";
import { fetchDataAsset } from "../../service/dataAsset/resDataAsset";
import NavigationDataAsset from "../../components/NavigationDataAsset";
import Filterasset from "../../components/FilterAsset";
// import { NavigationDataAsset } from "../../components/NavigationDataAsset";

const DataAsset = () => {
  const sortOptions = [
    { value: "", label: "None" },
    { value: "name_asc", label: "Name (A - Z)" },
    { value: "name_desc", label: "Name (Z - A)" },
    { value: "price_asc", label: "Price (Low - High)" },
    { value: "price_desc", label: "Price (High - Low)" },
  ];

  // const categoryOptions = [{ value: "", label: "None" }];
  // console.log("categori 1", categoryOptions);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  // console.log("categori global", categoriesGlobal);
  const assetGlobal = useSelector((state) => state.asset);
  // console.log("asetglobal", assetGlobal);

  const [showAddDataForm, setShowAddDataForm] = useState(false);
  const [showEditDataForm, setShowEditDataForm] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  console.log("activetetab Data Aset", activeTab);

  const categoriesGlobal = useSelector((state) => state.category);

  // console.log("showaddData", showAddDataForm);
  const [categoryOptions, setCategoryOptions] = useState([
    { value: "", label: "None" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataAsset, setDataAsset] = useState([]);

  // const sortFilterInitial = sortOptions.findIndex(
  //   (s) => s.value === searchParams.get("sort")
  // );

  // const initialCategoryIdRef = useRef(parseInt(searchParams.get("categoryId")));

  useEffect(() => {
    // dispatch(fetchAllBranches());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const newCategoryOptions = [
      { value: "", label: "None" },
      ...categoriesGlobal.categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ];
    setCategoryOptions(newCategoryOptions);
  }, [categoriesGlobal.categories]);

  useEffect(() => {
    const getAssets = async () => {
      try {
        const assets = await fetchDataAsset();
        console.log("assets nih", assets);
        setDataAsset(assets.data.asset);
      } catch (error) {
        console.log("error data asset", error);
        // Anda bisa menangani error di sini jika diperlukan
      }
    };
    getAssets();
  }, []);

  return (
    <div>
      <TransitionFade>
        <NavigationDataAsset
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </TransitionFade>

      <TransitionFade show={showAddDataForm}>
        <DataAssetForm
          action="Add"
          isLoading={assetGlobal.isLoading}
          setShowForm={setShowAddDataForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
        />
      </TransitionFade>

      <TransitionFade show={!showAddDataForm && !showEditDataForm}>
        <div>
          <AddDataHeader
            title="Data Assets"
            desc="A list Data Assets"
            addButtonText="Add Data"
            onAddClick={() => setShowAddDataForm(true)}
          />

          <Filterasset />

          <Table
            className="mb-4 py-6"
            headCols={[
              "Asset Name",
              "Category",
              "Description",
              "Quantity",
              "Branch",
              "No Surat",
              "Warna",
            ]}
            tableBody={<AssetTableBody asset={dataAsset} />}
          />
        </div>
      </TransitionFade>
    </div>
  );
};

export default DataAsset;
