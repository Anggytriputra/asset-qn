import React, { useEffect, useState } from "react";
import Steppers from "../components/Steppers";
import AddDataHeader from "../components/AddDataHeader";
import FormFirstStep from "../components/formStep/FormFirstStep";
import FormSecondStep from "../components/formStep/FormSecondStep";
import Modal4 from "../components/Modal4";
import FormThirdStep from "../components/formStep/FormThirdStep";
import CompTesting2 from "../components/componentTest/CompTesting2";
import {
  handleCheckboxChange,
  handleQtyChange,
  searchAssetForm,
  transformData,
  updateStepStatus,
} from "../helper/globalFunction";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSubCategories,
  setCategory,
  setSubCategory,
} from "../reducers/categorySlice";
import { fetchAllBranches } from "../reducers/branchSlice";
import { fetchAssetNameByCategor } from "../reducers/assetNameSlice";
import { fetchAllOwner } from "../reducers/ownerSlice";
import {
  OpMerk,
  OpMerkSpecialTools,
  OpTipeSpecialTools,
  OpStnk,
  OpYear,
  opCondition,
} from "../utils/option/optionValues";
import { handleSubmit } from "../helper/submitFunction";
import {
  createDataAsset,
  fetchAllDataAsset,
  fetchDataAsset,
  updateDataAsset,
} from "../service/dataAsset/resDataAsset";
import { fetchAllUsers } from "../reducers/allUsersSlice";
import {
  stepsForOtherCategories,
  stepsForStandardSafetyTools,
} from "../constant/detailSteps";
import Table from "../components/Table";
import TableBodyAsset from "../components/tableBodyDataAsset/TableBodyAsset";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";
import AddDataHeaderDataAsset from "../components/AddDataHeaderDataAsset";
import ModalForm2 from "../components/Modal2";
import TableBodyListTransferAsset from "../components/tableBodyTransAsset/TableBodyListTransferAsset";
import { reqTransferAsset } from "../reducers/transferSlice";
import Table2 from "../components/Table2";
import Pagination from "../components/Pagination";
import Pagination2 from "../components/Pagination2";
import { errorAlertWithMessage } from "../helper/alerts";
import Comboboxes from "../components/Comboboxes";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [actionSend, setActionSend] = useState("");

  console.log("actionSend", actionSend);

  const [currentPage, setCurrentPage] = useState(1);
  const [addNewData, setAddNewData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalTf, setOpenModalTf] = useState(false);
  // const [openModalTf, setOpenModalTf] = useState(false);

  // filter
  const [searchAssetName, setSearchAssetName] = useState("");
  console.log("testimoni search", searchAssetName);

  //
  const [dataAsset, setDataAsset] = useState([]);
  console.log("data asset nih bro", dataAsset);
  const [editedAssetData, setEditedAssetData] = useState();
  console.log("editedAsset data", editedAssetData);
  const [actionEdit, setActionEdit] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  // Sort
  const [sortBranch, setSortBranch] = useState();
  const [sortCategory, setSortCategory] = useState();
  //
  const [selectedCategory, setSelectedCategory] = useState();

  console.log("selectedCategory", selectedCategory);

  const [selectedBrach, setSelectedBranch] = useState();
  const [selectedAssetName, setSelectedAssetName] = useState();
  const [selectedOwner, setSelectedOwner] = useState();
  const [selectedPic, setSelectedPic] = useState();
  const [qty, setQty] = useState();
  const [desc, setDesc] = useState("");

  // Kendaraan
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [selectedOpMerk, setSelectedOpMerk] = useState();
  const [selectedOpStnk, setSelectedOpStnk] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedCondition, setSelectedCondition] = useState();
  const [noPolisi, setNoPolisi] = useState("");

  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNomesin] = useState("");
  const [color, setColor] = useState("");
  const [expOneYear, setExpOneYear] = useState("");
  const [expFiveYear, setExptFiveYear] = useState("");

  // UseState Special Tools
  const [selectedMerkST, setSelectedMerkST] = useState();
  const [selectedTipeST, setSelectedTipeST] = useState();
  const [serialNumber, setSerialNumber] = useState("");

  const [accesoriesOne, setAccesoriesOne] = useState("");
  const [accesoriesTwo, setAccesoriesTwo] = useState("");
  const [accesoriesThree, setAccesoriesThree] = useState("");
  console.log("acc 3 adalah?", accesoriesThree);
  //REDUX
  const userGlobal = useSelector((state) => state.user);
  const categoriesGlobal = useSelector((state) => state.category.categories);
  const allBranchGlobal = useSelector((state) => state.branch);
  const assetNameGlobal = useSelector((state) => state.assetName);
  const ownerGlobal = useSelector((state) => state.owner);
  const allUserGlobal = useSelector((state) => state.allUsers);
  const subCategoryGlobal = useSelector((state) => state.category);

  //Transfer
  const isSuperAdmin = userGlobal.role === "Super Admin";
  const [selectedItemTf, setSelectedItemTf] = useState([]);
  console.log("selectedTF", selectedItemTf);
  const [qtyInputTf, setQtyInputTf] = useState([]);
  console.log("qty yg di input ditf", qtyInputTf);

  const [selectedFromBranch, setSelectedFromBranch] = useState(
    userGlobal.role === "Super Admin"
      ? null
      : {
          id: userGlobal.id_cabang,
          name: userGlobal.cabang_name,
        }
  );

  const [selectedToBranch, setSelectedToBranch] = useState();
  const [selectedUserPenerima, setSelectedUserPenerima] = useState();

  const listTf = selectedItemTf.map(transformData);

  const steps =
    selectedCategory &&
    ["Safety Tools", "Standard Tools"].includes(selectedCategory.name)
      ? stepsForStandardSafetyTools
      : stepsForOtherCategories;

  const updatedSteps = updateStepStatus(currentStep, steps);

  useEffect(() => {
    if (!openModal) {
      setCurrentStep(0);
      setSelectedCategory("");
      setActionSend("");
    }
  }, [openModal]);

  useEffect(() => {
    if (actionEdit && editedAssetData) {
      let assetInMaps = {};

      const assetInsForEach = searchAssetForm(editedAssetData, assetInMaps);
      console.log("assetInMaps", assetInMaps);

      setSelectedCategory(editedAssetData ? editedAssetData.m_category : null);
      setSelectedBranch(
        editedAssetData && editedAssetData.m_cabang
          ? {
              id: editedAssetData.m_cabang.id,
              name: editedAssetData.m_cabang.cabang_name,
            }
          : null
      );

      // Global
      setSelectedAssetName(editedAssetData ? editedAssetData : null);
      setSelectedOwner(editedAssetData ? editedAssetData.owner : null);
      setSelectedPic(
        editedAssetData && editedAssetData.pic_user
          ? {
              id: editedAssetData.pic_user.id,
              name: editedAssetData.pic_user.username,
            }
          : null
      );
      setQty(
        editedAssetData && editedAssetData.m_stock
          ? editedAssetData.m_stock.quantity
          : null
      );

      setDesc(editedAssetData ? editedAssetData.desc : null);

      // Special tools
      setSelectedSubCategory(
        editedAssetData && editedAssetData.m_sub_category
          ? editedAssetData.m_sub_category
          : null
      );
      setSelectedMerkST(
        editedAssetData ? { id: 1, name: assetInMaps["Merk"] } : null
      );

      setSerialNumber(
        editedAssetData && assetInMaps ? assetInMaps["Serial Number"] : null
      );

      setAccesoriesOne(
        editedAssetData && assetInMaps ? assetInMaps["Accessories 1"] : null
      );
      setAccesoriesTwo(
        editedAssetData && assetInMaps ? assetInMaps["Accessories 2"] : null
      );
      setAccesoriesThree(
        editedAssetData && assetInMaps ? assetInMaps["Accessories 3"] : null
      );

      // Kendaraan
      setSelectedOpMerk(
        editedAssetData ? { id: 1, name: assetInMaps["Merk"] } : null
      );

      setSelectedYear(
        editedAssetData ? { id: 1, name: assetInMaps["Year"] } : null
      );

      setNoPolisi(editedAssetData ? assetInMaps["No. Polisi"] : null);
      setNoRangka(editedAssetData ? assetInMaps["No. Rangka"] : null);
      setNomesin(editedAssetData ? assetInMaps["No. Mesin"] : null);
      setColor(editedAssetData ? assetInMaps["Warna"] : null);
      setExpOneYear(
        editedAssetData ? assetInMaps["Exp tgl Pajak 1 Tahun"] : null
      );
      setExptFiveYear(
        editedAssetData ? assetInMaps["Exp tgl Pajak 5 Tahun"] : null
      );
      setSelectedOpStnk(
        editedAssetData ? { value: 1, label: assetInMaps["Status Stnk"] } : null
      );
    }
  }, [actionEdit, editedAssetData]);

  useEffect(() => {
    if (userGlobal.role) {
      dispatch(fetchCategories());
      dispatch(fetchAllBranches());
    }

    // query by searchparams
    let query = `page=${currentPage}`;
    searchAssetName
      ? searchParams.set("q", searchAssetName)
      : searchParams.delete("q");
    userGlobal.id_cabang
      ? searchParams.set("branchId", userGlobal.id_cabang)
      : searchParams.delete("branchId");

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);

    const getAssets = async () => {
      setLoadingData(true);
      const res = await fetchAllDataAsset(query);
      setDataAsset(res.data);
      setLoadingData(false);
    };
    getAssets();
    setAddNewData(false);
  }, [userGlobal.role, searchAssetName, currentPage, addNewData]);

  useEffect(() => {
    if (userGlobal.role && selectedCategory && selectedBrach) {
      dispatch(fetchAssetNameByCategor(selectedCategory.id));
      dispatch(fetchAllOwner());
      dispatch(fetchAllUsers(selectedBrach.id));
    }
  }, [userGlobal.role, selectedCategory, selectedBrach]);

  useEffect(() => {
    if ((selectedToBranch && selectedToBranch.id) || selectedBrach) {
      // dispatch(fetchAllUsers(selectedToBranch.id));
    }
  }, [selectedToBranch, selectedBrach, selectedCategory]);

  useEffect(() => {
    if (
      userGlobal.role &&
      selectedCategory &&
      selectedBrach &&
      selectedAssetName &&
      selectedOwner
    ) {
      dispatch(fetchSubCategories(selectedCategory.id));
    }
  }, [
    userGlobal.role,
    selectedCategory,
    selectedBrach,
    selectedAssetName,
    selectedOwner,
  ]);

  //  Data Manipulation
  const updatedCategories = categoriesGlobal.map((category) => ({
    id: category.id,
    name: category.name_ctgr,
  }));

  const updatedBranch = allBranchGlobal.allBranches.map((branch) => ({
    id: branch.id,
    name: branch.cabang_name,
  }));

  const updatedAllUsers = allUserGlobal.users.map((user) => ({
    id: user.id,
    name: user.username,
    branchId: user.id_cabang,
  }));

  function handleSubmitSearch(e) {
    e.preventDefault();
    setSearchAssetName(e.target.searchBar?.value);
  }

  async function handleSubmit() {
    const id = selectedCategory ? selectedCategory.id : "";
    const assetId = editedAssetData ? editedAssetData.id : null;

    const data = {
      name: selectedAssetName?.name || null,
      CategoryId: selectedCategory?.id || null,
      pic: selectedPic?.id || null,
      branchId: selectedBrach?.id || null,
      sub_category_id: selectedSubCategory?.id || null,
      ownerId: selectedOwner?.id || null,
      quantity: qty,
      description: desc || null,
    };

    let mergedData = {};

    if (selectedCategory && selectedCategory.name === "Kendaraan") {
      const DataKd = {
        statusStnkName: selectedOpStnk?.label || null,
        merk: selectedOpMerk?.name || null,
        year: selectedYear?.name || null,
        noRangka: noRangka || null,
        noMesin: noMesin || null,
        noPolisi: noPolisi || null,
        expTaxOneYear: expOneYear || null,
        expTaxFiveYear: expFiveYear || null,
        color: color || null,
      };
      mergedData = { ...data, ...DataKd };
    } else if (selectedCategory && selectedCategory.name === "Special Tools") {
      const DataST = {
        serialNumber: serialNumber || null,
        typeName: selectedTipeST?.name || null,
        merkName: selectedMerkST?.name || null,
        AccessoriesOne: accesoriesOne || null,
        AccessoriesTwo: accesoriesTwo || null,
        AccessoriesThree: accesoriesThree || null,
      };
      mergedData = { ...data, ...DataST };
    } else {
      // Jika kategori bukan Kendaraan atau Special Tools, gunakan data saja
      mergedData = data;
    }

    if (actionSend === "Add") {
      // console.log("berhasil manambahkan data");
      const result = await createDataAsset(mergedData, id);
    } else if (actionSend === "Edit") {
      // console.log("Berhasil edit");
      const result = await updateDataAsset(mergedData, assetId, id);
      console.log("result update", result);
    } else {
      errorAlertWithMessage("Action failed");
    }

    // if (result && result.status === 200) {
    //   setTimeout(() => {
    //     setAddNewData(true);
    //     setOpenModal(false);
    //   }, 2000);
    // }

    // console.log("result", result);
  }

  // Handle edit
  function handleEditClick(assets, stockIdx) {
    console.log("nih data asset edited", assets);
    setEditedAssetData(assets);
    setActionEdit(true);
    setOpenModal(true);
  }

  const qtyInputArray = Object.values(qtyInputTf);
  console.log("qtyInputArray", qtyInputArray);
  const processedQtyInputArray = qtyInputArray.map((item) => ({
    assetId: item.assetId,
    selectQty: item.selectQty === "" ? null : item.selectQty,
  }));

  async function handleSubmitTransfer(e) {
    e.preventDefault();
    const desc = e.target.desc.value || null;
    const date = e.target.date.value || null;

    const userIdPenerima = selectedUserPenerima
      ? selectedUserPenerima.id
      : null;
    const fromBranch = selectedFromBranch ? selectedFromBranch.name : null;
    const toBranch = selectedToBranch ? selectedToBranch.name : null;

    dispatch(
      reqTransferAsset({
        processedQtyInputArray,
        listTf,
        date: date,
        userIdPenerima: userIdPenerima,
        toBranch: toBranch,
        fromBranch: fromBranch,
        desc: desc,
      })
    );
  }

  return (
    <div>
      {/* <CompTesting2 /> */}
      <div>
        <Modal4
          open={openModal}
          setOpen={setOpenModal}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          title="modal nih"
          action="Add"
          steps={updatedSteps}
          onSubmit={handleSubmit}
          children={
            <div>
              <Steppers steps={steps} />
              {currentStep === 0 && (
                <FormFirstStep
                  dataEdited={editedAssetData}
                  categories={updatedCategories}
                  allbranch={updatedBranch}
                  selectCategory={selectedCategory}
                  setSelectCategory={setSelectedCategory}
                  selectBranch={selectedBrach}
                  setSelectBranch={setSelectedBranch}
                />
              )}
              {currentStep === 1 && (
                <FormSecondStep
                  allAssetName={assetNameGlobal.assetName}
                  selectAssetName={selectedAssetName}
                  setSelectAssetName={setSelectedAssetName}
                  allOwner={ownerGlobal.allOwner}
                  selectOwner={selectedOwner}
                  setSelectOwner={setSelectedOwner}
                  qty={qty}
                  setQty={setQty}
                  desc={desc}
                  setDesc={setDesc}
                  allUsers={updatedAllUsers}
                  selectPic={selectedPic}
                  setSelectPic={setSelectedPic}
                />
              )}
              {currentStep === 2 && (
                <FormThirdStep
                  currentCategory={
                    selectedCategory ? selectedCategory.name : ""
                  }
                  subCategory={subCategoryGlobal.subCategories}
                  selectSubCategory={selectedSubCategory}
                  setSelectSubCategory={setSelectedSubCategory}
                  OpMerk={OpMerk}
                  selectOpOwner={selectedOpMerk}
                  setSelectOpOwner={setSelectedOpMerk}
                  OpStnk={OpStnk}
                  selectOpStnk={selectedOpStnk}
                  setSelectOpStnk={setSelectedOpStnk}
                  OpYear={OpYear}
                  selectYear={selectedYear}
                  setSelectYear={setSelectedYear}
                  opCondition={opCondition}
                  selectCondition={selectedCondition}
                  setSelectCondition={setSelectedCondition}
                  selectNoPolisi={noPolisi}
                  setSelectNoPolisi={setNoPolisi}
                  selectNoMesin={noMesin}
                  setSelectNoMesin={setNomesin}
                  selectNoRangka={noRangka}
                  setSelectNorangka={setNoRangka}
                  selectColor={color}
                  setSelectColor={setColor}
                  selectExpOneYear={expOneYear}
                  setSelectExpOneYear={setExpOneYear}
                  selectExpFiveYear={expFiveYear}
                  setSelectFiveYear={setExptFiveYear}
                  //
                  // Special Tools
                  sN={serialNumber}
                  setSN={setSerialNumber}
                  oPMerkST={OpMerkSpecialTools}
                  selectMerkST={selectedMerkST}
                  setSelectMerkST={setSelectedMerkST}
                  oPTipeST={OpTipeSpecialTools}
                  selectTipeST={selectedTipeST}
                  setSelectTipeST={setSelectedTipeST}
                  accOne={accesoriesOne}
                  setAccOne={setAccesoriesOne}
                  accTwo={accesoriesTwo}
                  setAccTwo={setAccesoriesTwo}
                  accThree={accesoriesThree}
                  setAccThree={setAccesoriesThree}
                />
              )}
            </div>
          }
        />
      </div>
      <div>
        <ModalForm2
          title="List Transfer Assets"
          open={openModalTf}
          setOpen={setOpenModalTf}
          action="Add"
          onSubmit={handleSubmitTransfer}
          children={
            <TableBodyListTransferAsset
              // TF
              isSuperAdmin={isSuperAdmin}
              asset={listTf}
              allBranch={updatedBranch}
              allUsers={updatedAllUsers}
              selectfromBranch={selectedFromBranch}
              setSelectFromBranch={setSelectedFromBranch}
              selectToBranch={selectedToBranch}
              setSelectToBranch={setSelectedToBranch}
              selectUserPenerima={selectedUserPenerima}
              setSelectUserPenerima={setSelectedUserPenerima}
              qtyInputTf={qtyInputTf}
              setQtyInputTf={setQtyInputTf}
              //function
              handleQtyChange={handleQtyChange}
            />
          }
        />
      </div>

      <AddDataHeaderDataAsset
        title="Home"
        desc="A list Asset PT. Quantum Nusatama"
        addButtonText="Add Asset"
        addButtonText2="Transfer Asset"
        onAddClick={() => {
          setOpenModal(true);
          setActionSend("Add");
        }}
        onAddClick2={() => setOpenModalTf(true)}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <SearchBar
          onSubmit={handleSubmitSearch}
          defaultValue={searchAssetName}
        />
        <Comboboxes
          people={updatedBranch}
          selectedValue={sortBranch}
          setSelectedValue={setSortBranch}
        />
        <Comboboxes
          people={updatedCategories}
          selectedValue={sortCategory}
          setSelectedValue={setSortCategory}
        />
      </div>

      <div>
        <Table2
          className="mb-4"
          headCols={[
            // "",
            "Asset Name",
            "Branch",
            "Category",
            "NoPol/SN",
            "Status",
          ]}
          tableBody={
            <TableBodyAsset
              onEdit={handleEditClick}
              setActionSend={setActionSend}
              asset={dataAsset.rows}
              selectItem={selectedItemTf}
              setSelectItem={setSelectedItemTf}
              onCheckboxChange={handleCheckboxChange}
            />
          }
        />
        <Pagination2
          itemsInPage={dataAsset.rows ? dataAsset.rows.length : 0}
          totalItems={dataAsset.count}
          totalPages={Math.ceil(dataAsset.count / 15)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
