import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchAllBranches } from "../../reducers/branchSlice";
import TransitionFade from "../../components/TransitionFade";
import AddDataHeader from "../../components/AddDataHeader";
import Table from "../../components/Table";
import DataKendaraanForm from "../../components/DataKendaraanForm";
// import { fetchAssets } from "../../reducers/assetSlice";
import AssetTableBody from "../../components/AssetTableBody";
import {
  fetchAllCategoriesData,
  fetchCategories,
  fetchSubCategories,
} from "../../reducers/categorySlice";
import axios from "axios";
import { fetchDataAsset } from "../../service/dataAsset/resDataAsset";
import NavigationDataAsset from "../../components/NavigationDataAsset";
import Filterasset from "../../components/FilterAsset";
import Spinner from "../../components/Spinner";
import DataSpecialToolsForm from "../../components/DataSpecialTools";
import DataStandardToolsForm from "../../components/DataStandardToolsForm";
import DataSafetyToolsForm from "../../components/DataSafetyToolsForm";
// import { NavigationDataAsset } from "../../components/NavigationDataAsset";

const subCategoryOption = [{ value: 0, label: "None" }];

const DataAsset = () => {
  const dispatch = useDispatch();

  const userGlobal = useSelector((state) => state.user);
  const categoriesGlobal = useSelector((state) => state.category.categories);
  const subCategoryGlobal = useSelector(
    (state) => state.category.subCategories
  );

  // console.log("sub category Global", subCategoryGlobal);

  // console.log("user", userGlobal);
  // const assetGlobal = useSelector((state) => state.asset);
  const activeTabId = localStorage.getItem("activeTab");
  // console.log("active tab dataasset", activeTabId);

  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddDataForm, setShowAddDataForm] = useState(false);
  const [showEditDataForm, setShowEditDataForm] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  console.log("activetab", activeTab);

  // const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataAsset, setDataAsset] = useState([]);

  const [subCategoriesFilter, setSubCategoryFilter] = useState([
    subCategoryOption[0],
  ]);

  console.log("subCategoryFilter", subCategoriesFilter);

  useEffect(() => {
    if (!userGlobal.role) return;
    dispatch(fetchCategories());
  }, [userGlobal.role]);

  // Navigation Data Asset dari sini
  const location = useLocation();
  useEffect(() => {
    // Fungsi untuk membaca activeTab dari localStorage dan set state
    const savedTab = localStorage.getItem("activeTab");

    if (savedTab) {
      setActiveTab(parseInt(savedTab, 10));
    }
  }, []);

  useEffect(() => {
    // Fungsi untuk menyimpan activeTab ke localStorage setiap kali state berubah
    if (activeTab !== null) {
      localStorage.setItem("activeTab", activeTab.toString());
    }
  }, [activeTab]);

  useEffect(() => {
    // Hapus activeTab dari localStorage saat URL berubah
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, [location.pathname]);

  const tabs = Object.keys(categoriesGlobal)
    .filter((key) => key !== "isLoading")
    .map((key) => {
      console.log("key", key);
      return {
        id: categoriesGlobal[key].id,
        name: categoriesGlobal[key].name_ctgr,
        current: categoriesGlobal[key].id === activeTab,
      };
    });

  console.log("ini tabs", tabs);

  // atas sampai sini navigatiDataAsset.jsx

  // Memicu fetchSubCategories() jika activeTabId sudah diisi
  useEffect(() => {
    if (!activeTab) return;
    dispatch(fetchSubCategories(activeTab));
  }, [activeTab]);

  const newSubCategoriesOption = subCategoryGlobal.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
  }));

  subCategoryOption.splice(
    1,
    subCategoryOption.length - 1,
    ...newSubCategoriesOption
  );

  // console.log("subCategoryOption", subCategoryOption);

  const reqData = {
    idCategory: activeTab,
    subCategoryId: subCategoriesFilter.value,
  };

  useEffect(() => {
    const getAssets = async () => {
      try {
        const assets = await fetchDataAsset(reqData);
        // console.log("assets nih", assets);
        setDataAsset(assets.data.asset);
      } catch (error) {
        console.log("error data asset", error);
        // Anda bisa menangani error di sini jika diperlukan
      }
    };
    getAssets();
  }, [reqData.idCategory, reqData.subCategoryId]);

  if (categoriesGlobal.isLoading) return <Spinner />;

  return (
    <div>
      <TransitionFade>
        <NavigationDataAsset
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          categoriesGlobal={categoriesGlobal}
          tabs={tabs}
        />
      </TransitionFade>

      <TransitionFade show={showAddDataForm}>
        {(() => {
          const currentTabName = tabs.find((tab) => tab.current)?.name;
          switch (currentTabName) {
            case "Kendaraan":
              return (
                <DataKendaraanForm
                  action="Add"
                  setShowForm={setShowAddDataForm}
                  currPage={currentPage}
                  subCategoryOption={subCategoryOption}
                  idOnTabsCategory={activeTab}
                />
              );
            case "Special Tools":
              return (
                <DataSpecialToolsForm
                  action="Add"
                  idOnTabsCategory={activeTab}
                />
              );
            case "Standard Tools":
              return <DataStandardToolsForm action="Add Data" />;
            case "Safety Tools":
              return <DataSafetyToolsForm action="Add Data" />;
            default:
              return null;
          }
        })()}
      </TransitionFade>

      <TransitionFade show={!showAddDataForm && !showEditDataForm}>
        <div>
          <AddDataHeader
            title="Data Assets"
            desc="A list Data Assets"
            addButtonText="Add Data"
            onAddClick={() => setShowAddDataForm(true)}
          />

          <Filterasset
            subCategoryOption={subCategoryOption}
            subCategoriesFilter={subCategoriesFilter}
            onSubCategoriesChange={setSubCategoryFilter}
          />

          <Table
            className="mb-4 py-6"
            headCols={[
              "Asset Name",
              "Category",
              "Sub Category",
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
