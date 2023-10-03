import React, { useEffect, useState } from "react";
import AddDataHeader from "../../components/AddDataHeader";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/DropDown";
import Comboboxes from "../../components/Comboboxes";
import { fetchAllBranches } from "../../reducers/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import TableBodyTransferAsset from "../../components/tableBodyTransAsset/TableBodyTransferAsset";
import Pagination from "../../components/Pagination";
import ModalForm from "../../components/Modal";
import TransferAssetForm from "../../components/formTransferAsset/TransferAssetForm";
import {
  fetchCategories,
  fetchSubCategories,
} from "../../reducers/categorySlice";
import {
  fetchAssetByBranchIdCategoryId,
  fetchAssetNoPolisi,
  fetchAssetSerialNumber,
} from "../../reducers/assetSlice";
import {
  findNoPolisiValues,
  getNoPolisi,
  noPolisi,
} from "../../helper/globalFunction";
import {
  cofirmasiAsset,
  fetchReqTransfers,
  reqTransferAsset,
} from "../../reducers/transferSlice";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { errorAlertWithMessage } from "../../helper/alerts";
import ConfirmedTransferAssetForm from "../../components/formTransferAsset/ConfirmedTransferAssetForm";
import { fetchAllUsers } from "../../reducers/allUsersSlice";
import Modal3 from "../../components/Modal3";

const branchOptions = [{ id: undefined, name: "None" }];

const TransferAsset = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { assetId } = useParams();

  console.log("params", assetId);
  // const asset = location.state.asset;

  const userGlobal = useSelector((state) => state.user);
  const isSuperAdmin = userGlobal.role === "Super Admin";
  // console.log("cek admin", isSuperAdmin);

  const transferGlobal = useSelector((state) => state.transferAsset);
  const branchGlobal = useSelector((state) => state.branch.allBranches);
  console.log("branchGlobal", branchGlobal);
  const categoryGlobal = useSelector((state) => state.category);
  const allUserGlobal = useSelector((state) => state.allUsers);

  // console.log("all user", allUserGlobal);
  // console.log("transfer Global", transferGlobal);

  const assetGlobal = useSelector((state) => state.asset.AssetByBranchId);
  const assetGlobalNoPolisi = useSelector((state) => state.asset.noPolisi);

  // console.log("asset Global a", assetGlobal);

  // categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  const newBranchOption = branchGlobal.map((branch) => ({
    id: branch.id,
    name: branch.cabang_name,
  }));

  branchOptions.splice(1, branchOptions.length - 1, ...newBranchOption);

  const assetGlobalSerialNumber = useSelector(
    (state) => state.asset.serialNumber
  );

  // console.log("serial number Global", assetGlobalSerialNumber);

  const [searchParams, setSearchParams] = useSearchParams();

  const [statusSubmitConfirmasi, setStatusSubmitConfirmasi] = useState("");
  console.log("status submit", statusSubmitConfirmasi);

  const [selectedBranch, setSelectedBranch] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  // console.log("selectedCategory", selectedCategory);

  const [tipe, setTipe] = useState();
  const [selectedFromBranch, setSelectedFromBranch] = useState(
    userGlobal.role === "Super Admin"
      ? null
      : {
          id: userGlobal.id_cabang,
          name: userGlobal.cabang_name,
        }
  );

  console.log("selected from branch", selectedFromBranch);
  const [selectedToBranch, setSelectedToBranch] = useState();

  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedNoPolisi, setSelectedNoPolisi] = useState();
  const [selectedSerialNumber, setSelectedSerialNumber] = useState();
  const [selectedUserPenerima, setSelectedUserPenerima] = useState();
  const [detailConfirmed, setDetailConfirmed] = useState({});

  const [addNewData, setAddNewData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [opeModalConfirmed, setOpenModalConfirmed] = useState(false);
  const [noIdTH, setNoidTH] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // console.log("noPolis", selectedNoPolisi.name);
  const idCategory = selectedCategory ? selectedCategory.value : null;
  // console.log("idCatgory", idCategory);

  const branchId = userGlobal.id_cabang;
  // console.log("userGlobal", branchId);

  // categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  useEffect(() => {
    let query = `page=${currentPage}`;

    selectedBranch && selectedBranch.id
      ? searchParams.set("sortBranch", selectedBranch.id)
      : searchParams.delete("sortBranch");

    startDate
      ? searchParams.set("startDate", startDate)
      : searchParams.delete("startDate");
    endDate
      ? searchParams.set("endDate", endDate)
      : searchParams.delete("endDate");
    userGlobal.id
      ? searchParams.set("userId", userGlobal.id)
      : searchParams.delete("userId");
    userGlobal.role
      ? searchParams.set("role", userGlobal.role)
      : searchParams.delete("role");
    userGlobal.cabang_name
      ? searchParams.set("branchName", userGlobal.cabang_name)
      : searchParams.delete("branchName");
    userGlobal.id_cabang
      ? searchParams.set("branchId", userGlobal.id_cabang)
      : searchParams.delete("branchId");

    //
    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchReqTransfers(query));
  }, [
    userGlobal.id,
    currentPage,
    addNewData,
    selectedBranch,
    startDate,
    endDate,
  ]);

  //////////////////////////////////////
  const branchesWithNewName = branchGlobal.map((branch) => ({
    id: branch.id,
    name: branch.cabang_name,
  }));

  const userWithNewName = allUserGlobal.users.map((user) => ({
    id: user.id,
    name: user.username,
  }));

  console.log("user with name", userWithNewName);

  console.log("asset Global", assetGlobal);
  const seperatorAsset =
    assetGlobal && assetGlobal.assets
      ? assetGlobal.assets.map((asset) => ({
          id: asset.id,
          value1: asset.name,
          value2:
            asset.m_assets_ins && asset.m_assets_ins.length > 0
              ? asset.m_assets_ins[0].value // Mengambil nilai value dari m_assets_ins[0]
              : "", // Anda bisa menangani jika m_assets_ins kosong di sini
        }))
      : [];

  console.log("seperator asset", seperatorAsset);

  const noPolisiValues = assetGlobalNoPolisi
    .flatMap((asset) => asset.m_assets_ins)
    .map((ins) => ({
      id: ins.id,
      m_form_id: ins.m_form_id,
      name: ins.value, // Mengubah value menjadi name
      m_asset_id: ins.m_asset_id,
    }));

  const noSerialrValues = assetGlobalSerialNumber
    .flatMap((asset) => asset.m_assets_ins)
    .map((ins) => ({
      id: ins.id,
      m_form_id: ins.m_form_id,
      name: ins.value, // Mengubah value menjadi name
      m_asset_id: ins.m_asset_id,
    }));

  console.log(noPolisiValues);

  console.log("no polisi ya", noPolisiValues);

  useEffect(() => {
    dispatch(fetchAllBranches());
    dispatch(fetchCategories());

    // dispatch(fetchSubCategories(idCategory));

    setTipe("");
  }, [userGlobal.role]);

  useEffect(() => {
    if (selectedToBranch && selectedToBranch.id) {
      dispatch(fetchAllUsers(selectedToBranch.id));
    }
  }, [selectedToBranch]);

  console.log("selectedCatgory", selectedCategory);

  const params = {
    branchId,
    categoryId: selectedCategory ? selectedCategory.value : null,
  };

  console.log("assetGlobalNoPolisi", assetGlobalNoPolisi);

  useEffect(() => {
    if (selectedCategory && selectedCategory.label === "Kendaraan") {
      dispatch(fetchAssetNoPolisi(params));
    }
    if (selectedCategory && selectedCategory.label === "Special Tools") {
      dispatch(fetchAssetSerialNumber(params));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      dispatch(fetchAssetByBranchIdCategoryId(params));
    }
    setSelectedAsset(null);
  }, [selectedCategory]);

  console.log("select category", selectedCategory);
  console.log("assetName", selectedAsset);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("testimoni", e.target.date.value);
    const date = e.target.date.value || null;
    // const recipientName = e.target.recipientName.value || null;
    const quantity = e.target.qty.value || null;
    const desc = e.target.desc.value || null;

    // const noPolice = selectedNoPolisi ? selectedNoPolisi.name : null;
    // const serialNumber = selectedSerialNumber
    //   ? selectedSerialNumber.name
    //   : null;
    const fromBranch = selectedFromBranch ? selectedFromBranch.name : null;
    const toBranch = selectedToBranch ? selectedToBranch.name : null;
    const category = selectedCategory ? selectedCategory.label : null;
    const assetName = selectedAsset ? selectedAsset.value1 : null;
    const assetId = selectedAsset ? selectedAsset.id : null;
    const noPolice = selectedAsset ? selectedAsset.value2 : null;
    const serialNumber = selectedAsset ? selectedAsset.value2 : null;
    const categoryId = selectedCategory ? selectedCategory.value : undefined;
    const userIdPenerima = selectedUserPenerima
      ? selectedUserPenerima.id
      : undefined;

    if (typeof categoryId === "undefined") {
      errorAlertWithMessage("Please select a transfer category");
      return; // Keluar dari fungsi jika categoryId adalah undefined
    }

    dispatch(
      reqTransferAsset(
        {
          userId: userGlobal.id,
          date: date,
          userIdPenerima: userIdPenerima,
          qty: quantity,
          desc: desc,
          fromBranch: fromBranch,
          toBranch: toBranch,
          noPolice: noPolice,
          sN: serialNumber,
          category: category,
          assetName: assetName,
          assetId: assetId,
        },
        // end point
        categoryId
      )
    ).then((response) => {
      console.log("response retrun asset", response);
      // Cek apakah respons memiliki status 200
      if (response && response.status === 200) {
        setAddNewData(true);
        setOpenModal(false);
      }
      // setAddNewData(false);
    });
  }

  function handleSubmitCofirmasi(e) {
    e.preventDefault();
    const desc = e.target.desc.value || null;

    dispatch(
      cofirmasiAsset({
        userId: userGlobal.id,
        userBranchIdLogin: userGlobal.id_cabang,
        desc: desc,
        transHId: noIdTH,
        statusSubmit: statusSubmitConfirmasi,
      })
    ).then((response) => {
      console.log("response retrun asset", response);
      // Cek apakah respons memiliki status 200
      if (response && response.status === 200) {
        setAddNewData(true);
        setOpenModalConfirmed(false);
      }
      // setAddNewData(false);
    });
    setStatusSubmitConfirmasi("");
  }

  if (transferGlobal.isLoading && !(openModal === true)) return <Spinner />;

  // console.log('tra')
  return (
    <div>
      <div>
        <ModalForm
          title="Transfer Assets"
          open={openModal}
          setOpen={setOpenModal}
          action="Add"
          onSubmit={handleSubmit}
          children={
            <TransferAssetForm
              isSuperAdmin={isSuperAdmin}
              branchUserExits={userGlobal.cabang_name}
              category={categoryGlobal.categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              asset={seperatorAsset}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              branch={branchesWithNewName}
              selectfromBranch={selectedFromBranch}
              setSelectFromBranch={setSelectedFromBranch}
              selectToBranch={selectedToBranch}
              setSelectToBranch={setSelectedToBranch}
              subCatgeory={categoryGlobal.subCategories}
              tipe={tipe}
              setTipe={setTipe}
              noPolisi={noPolisiValues}
              selectPolice={selectedNoPolisi}
              setSelectPolice={setSelectedNoPolisi}
              noSN={noSerialrValues}
              selectSN={selectedSerialNumber}
              setSelectSN={setSelectedSerialNumber}
              allUser={userWithNewName}
              selectUserPenerima={selectedUserPenerima}
              setSelectUserPenerima={setSelectedUserPenerima}
            />
          }
        />
      </div>
      <div>
        <Modal3
          title="Confirmation Transfer Assets"
          open={opeModalConfirmed}
          setOpen={setOpenModalConfirmed}
          action="Accept"
          onSubmit={handleSubmitCofirmasi}
          setStatusSubmit={setStatusSubmitConfirmasi}
          children={<ConfirmedTransferAssetForm detailData={detailConfirmed} />}
        />
      </div>
      <AddDataHeader
        title="Transfer Asset"
        desc="A list Transfer Asset"
        addButtonText="Transfer Asset"
        onAddClick={() => setOpenModal(true)}
      />
      <div className="flex flex-wrap items-center justify-start gap-6 pb-4 mb-4 mt-12 border-b border-gray-200">
        <div className="sm:col-span-2">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {userGlobal.role === "Super Admin" && (
          <div className="sm:col-span-2">
            <label
              htmlFor="expTaxOneYear"
              className="block text-sm font-medium text-gray-700"
            >
              Branch
            </label>
            <Comboboxes
              people={branchOptions}
              selectedValue={selectedBranch}
              setSelectedValue={setSelectedBranch}
            />
          </div>
        )}
        {/* <div className="sm:col-span-2">
          <button
            type="submit"
            className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div> */}
      </div>

      <Table
        className="mb-4"
        headCols={[
          "No Transfer",
          "Date",
          "Asset Name",
          "Category",
          "Cabang Pengirim",
          "Cabang Penerima",
          "Shipping Notes",
          "Receipt Notes",
          "Status",
        ]}
        tableBody={
          <TableBodyTransferAsset
            asset={transferGlobal.transAsset}
            setOpenModalConfirmed={setOpenModalConfirmed}
            setNoidTH={setNoidTH}
            setDetailApp={setDetailConfirmed}
          />
        }
      />
      <Pagination
        itemsInPage={transferGlobal.transAsset.length}
        totalItems={transferGlobal.totalItem}
        totalPages={transferGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TransferAsset;
