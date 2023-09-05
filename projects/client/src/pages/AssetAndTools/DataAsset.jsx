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
import AssetKendaraanTableBody from "../../components/AssetKendaraanTableBody";
import KendaraanTableBody from "../../components/tableBodyDataAsset/KendaraanTableBody";
import SpecialToolsTableBody from "../../components/tableBodyDataAsset/SpecialToolsTableBody";
import StandardToolsTableBody from "../../components/tableBodyDataAsset/StandardToolsTableBody";
import SafetyToolsTableBody from "../../components/tableBodyDataAsset/SafetyToolsTableBody";
import {
  colsKendaraan,
  colsSpecialTools,
  colsStandardTools,
  colsSafetyTools,
} from "../../constant/headColsdataAsset";
import { fetchImgByAssetId } from "../../service/dataAsset/resDataImg";
import Pagination from "../../components/Pagination";

const subCategoryOption = [{ value: 0, label: "None" }];

const DataAsset = () => {
  const dispatch = useDispatch();

  const userGlobal = useSelector((state) => state.user);
  const categoriesGlobal = useSelector((state) => state.category.categories);
  const subCategoryGlobal = useSelector(
    (state) => state.category.subCategories
  );

  const activeTabId = localStorage.getItem("activeTab");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAddDataForm, setShowAddDataForm] = useState(false);
  const [showEditDataForm, setShowEditDataForm] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [addNewData, setNewAddData] = useState(false);

  // const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataAsset, setDataAsset] = useState([]);

  console.log("dataAsset", dataAsset);

  const [subCategoriesFilter, setSubCategoryFilter] = useState([
    subCategoryOption[0],
  ]);

  const [editedAsset, setEditedAsset] = useState({});
  const [imgAssetById, setImgAssetById] = useState({});

  // console.log("edited asset", editedAsset);
  // console.log("img byid", imgAssetById);

  useEffect(() => {
    const fetchData = async () => {
      // Fungsi async tambahan
      if (editedAsset.id) {
        try {
          const dataImgByAssetId = await fetchImgByAssetId(editedAsset);
          // console.log("dataImgByAssetId", dataImgByAssetId);
          setImgAssetById(dataImgByAssetId.data.img);
        } catch (error) {
          console.log("Failed to fetch image", error);
        }
      }
    };

    fetchData(); // Jalankan fungsi async
  }, [editedAsset.id]);

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
    // console.log("savetab", savedTab);
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
      const id = categoriesGlobal[key].id;
      const current = id === activeTab;

      return {
        id: id,
        name: categoriesGlobal[key].name_ctgr,
        current: current,
      };
    });

  // console.log("ini tabs", tabs);

  // atas sampai sini navigatiDataAsset.jsx

  // Memicu fetchSubCategories() jika activeTabId sudah diisi
  useEffect(() => {
    if (!activeTab) return;
    dispatch(fetchSubCategories(activeTab));
  }, [activeTab]);

  // console.log("on activeTabs", activeTab);

  const newSubCategoriesOption = subCategoryGlobal.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
  }));

  subCategoryOption.splice(
    1,
    subCategoryOption.length - 1,
    ...newSubCategoriesOption
  );

  useEffect(() => {
    const getAssets = async () => {
      try {
        const assets = await fetchDataAsset(
          activeTab,
          subCategoriesFilter.value
        );
        // console.log("assets nih", assets);
        setDataAsset(assets.data.asset);

        if (addNewData) {
          setNewAddData(false);
        }
      } catch (error) {
        console.log("error data asset", error);
        // Anda bisa menangani error di sini jika diperlukan
      }
    };
    getAssets();
  }, [activeTab, subCategoriesFilter.value, addNewData]);

  function handleEditClick(assets, stockIdx) {
    // console.log("asset handle", assets);
    setEditedAsset(assets);
    setShowEditDataForm(true);
  }

  if (categoriesGlobal.isLoading) return <Spinner />;

  //
  //

  let activeCols = [];
  let activeTableBody = null;

  const activeTabName = tabs.find((tab) => tab.current)?.name;

  switch (activeTabName) {
    case "Kendaraan":
      activeCols = colsKendaraan;
      activeTableBody = (
        <KendaraanTableBody
          asset={dataAsset}
          onEdit={handleEditClick}
        />
      );
      break;
    case "Special Tools":
      activeCols = colsSpecialTools;
      activeTableBody = (
        <SpecialToolsTableBody
          asset={dataAsset}
          onEdit={handleEditClick}
        />
      );
      break;
    case "Standard Tools":
      activeCols = colsStandardTools;
      activeTableBody = (
        <StandardToolsTableBody
          asset={dataAsset}
          onEdit={handleEditClick}
        />
      );
      break;
    case "Safety Tools":
      activeCols = colsSafetyTools;
      activeTableBody = (
        <SafetyToolsTableBody
          asset={dataAsset}
          onEdit={handleEditClick}
        />
      );
      break;
    default:
      break;
  }

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

      <TransitionFade show={showEditDataForm || showAddDataForm}>
        {(() => {
          const currentTabName = tabs.find((tab) => tab.current)?.name;
          let action = showEditDataForm ? "Edit" : "Add"; // Menentukan mode berdasarkan state

          switch (currentTabName) {
            case "Kendaraan":
              return (
                <DataKendaraanForm
                  action={action}
                  setShowForm={
                    action === "Add" ? setShowAddDataForm : setShowEditDataForm
                  }
                  subCategoryOption={subCategoryOption}
                  currPage={currentPage}
                  idOnTabsCategory={activeTab}
                  asset={editedAsset}
                  img={imgAssetById}
                  addNewData={addNewData}
                  setNewAddData={setNewAddData}
                />
              );
            case "Special Tools":
              return (
                <DataSpecialToolsForm
                  action={action}
                  setShowForm={
                    action === "Add" ? setShowAddDataForm : setShowEditDataForm
                  }
                  currPage={currentPage}
                  idOnTabsCategory={activeTab}
                  asset={editedAsset}
                  img={imgAssetById}
                  addNewData={addNewData}
                  setNewAddData={setNewAddData}
                />
              );
            case "Standard Tools":
              return (
                <DataStandardToolsForm
                  action={action}
                  setShowForm={
                    action === "Add" ? setShowAddDataForm : setShowEditDataForm
                  }
                  currPage={currentPage}
                  idOnTabsCategory={activeTab}
                  asset={editedAsset}
                  img={imgAssetById}
                  addNewData={addNewData}
                  setNewAddData={setNewAddData}
                />
              );
            case "Safety Tools":
              return (
                <DataSafetyToolsForm
                  action={action}
                  setShowForm={
                    action === "Add" ? setShowAddDataForm : setShowEditDataForm
                  }
                  currPage={currentPage}
                  idOnTabsCategory={activeTab}
                  asset={editedAsset}
                  img={imgAssetById}
                  addNewData={addNewData}
                  setNewAddData={setNewAddData}
                />
              );
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
            headCols={activeCols}
            tableBody={activeTableBody}
          />
          <Pagination totalItems={20} />
        </div>
      </TransitionFade>
    </div>
  );
};

export default DataAsset;
