import React, { useEffect, useState } from "react";
import ModalForm from "../../components/Modal";
import AddDataHeader from "../../components/AddDataHeader";
import Table from "../../components/Table";
import ReturnAssetForm from "../../components/formReturnAsset/ReturnAssetForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../reducers/categorySlice";
import { fetchAllBranches } from "../../reducers/branchSlice";
import {
  fetchAssetAccesoriesbyAssetId,
  fetchAssetByBranchIdCategoryId,
} from "../../reducers/assetSlice";
import ModalForm2 from "../../components/Modal2";
import { fetchStatusReturn } from "../../reducers/statusSlice";
import { fetchAllUsers } from "../../reducers/allUsersSlice";
import {
  cofirmasiReturnAsset,
  fetchReqReturnAsset,
  reqReturnAsset,
} from "../../reducers/returnSlice";
import { errorAlertWithMessage } from "../../helper/alerts";
import { fetchAllOwner, fetchOwnerByAssetId } from "../../reducers/ownerSlice";
import { useSearchParams } from "react-router-dom";
import TableBodyReturnAsset from "../../components/tableBodyReturnAsset/TableBodyReturnAsset";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import ConfirmedReturnAssetForm from "../../components/formReturnAsset/ConfirmedReturnAssetForm";
import Modal3 from "../../components/Modal3";

const ReturnAsset = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // redux
  const returnAssetGlobal = useSelector((state) => state.returnAsset);
  console.log("return asset global", returnAssetGlobal);
  const userGlobal = useSelector((state) => state.user);
  const categoryGlobal = useSelector((state) => state.category);
  const assetGlobal = useSelector((state) => state.asset);
  const ownerGlobal = useSelector((state) => state.owner);

  const branchGlobal = useSelector((state) => state.branch);
  const statusReturnGlobal = useSelector((state) => state.status);
  const allUserGlobal = useSelector((state) => state.allUsers);

  const isSuperAdmin = userGlobal.role === "Super Admin";

  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "None",
  });

  const [statusSubmitConfirmasi, setStatusSubmitConfirmasi] = useState("");

  const [selectedStatusReturn, setSelectedStatusReturn] = useState();
  // console.log("status return", selectedStatusReturn);
  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedUserPenerima, setSelectedUserPenerima] = useState();
  const [addNewData, setAddNewData] = useState(false);
  const [detailConfirmed, setDetailConfirmed] = useState({});

  console.log("detail confirmed", detailConfirmed);
  console.log("test add new data", addNewData);
  // const userIdPenerima = selectedUserPenerima
  //   ? selectedUserPenerima.id
  //   : undefined;

  console.log("selected asset", selectedAsset);

  const [selectedFromBranch, setSelectedFromBranch] = useState(
    userGlobal.role === "Super Admin"
      ? null
      : {
          id: userGlobal.id_cabang,
          name: userGlobal.cabang_name,
        }
  );

  console.log("dari cabang", selectedFromBranch);

  const [selectedToBranch, setSelectedToBranch] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [opeModalConfirmed, setOpenModalConfirmed] = useState(false);
  const [noIdTH, setNoidTH] = useState("");
  // useEffect(() => {
  //   if (!openModal) {
  //     setSelectedCategory( id: 0,name: "None",);
  //     setSelectedStatusReturn("");
  //     setSelectedAsset("");
  //     setSelectedUserPenerima("");
  //     setSelectedToBranch("");
  //   }
  // }, [openModal]);

  useEffect(() => {
    let query = `page=${currentPage}`;
    userGlobal.id
      ? searchParams.set("userId", userGlobal.id)
      : searchParams.delete("userId");
    userGlobal.cabang_name
      ? searchParams.set("branchName", userGlobal.cabang_name)
      : searchParams.delete("branchName");
    userGlobal.id_cabang
      ? searchParams.set("branchId", userGlobal.id_cabang)
      : searchParams.delete("branchId");
    userGlobal.role
      ? searchParams.set("role", userGlobal.role)
      : searchParams.delete("role");

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchReqReturnAsset(query));
    setAddNewData(false);
  }, [userGlobal.id, currentPage, addNewData]);

  useEffect(() => {
    dispatch(fetchAllBranches());
    dispatch(fetchCategories());
    if (selectedAsset) {
      dispatch(fetchStatusReturn());
    }
  }, [userGlobal.role, selectedAsset]);

  useEffect(() => {
    if (selectedToBranch && selectedToBranch.id) {
      dispatch(fetchAllUsers(selectedToBranch.id));
    }
  }, [selectedToBranch]);

  const branchId = userGlobal.id_cabang;

  const params = {
    branchId,
    categoryId: selectedCategory ? selectedCategory.id : null,
  };

  useEffect(() => {
    if (selectedCategory.name !== "None") {
      dispatch(fetchAssetByBranchIdCategoryId(params));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedAsset !== undefined && selectedAsset.id !== undefined) {
      dispatch(
        fetchAssetAccesoriesbyAssetId(selectedAsset.id, selectedCategory.id)
      );
    }
  }, [selectedAsset]);

  useEffect(() => {
    if (selectedAsset !== undefined) {
      dispatch(fetchOwnerByAssetId(selectedAsset.id));
    }
  }, [selectedAsset]);

  const userWithNewName = allUserGlobal.users.map((user) => ({
    id: user.id,
    name: user.username,
  }));

  const seperatorAsset =
    assetGlobal && assetGlobal.AssetByBranchId.assets
      ? assetGlobal.AssetByBranchId.assets.map((asset) => ({
          id: asset.id,
          value1: asset.name,
          value2:
            asset.m_assets_ins && asset.m_assets_ins.length > 0
              ? asset.m_assets_ins[0].value // Mengambil nilai value dari m_assets_ins[0]
              : "", // Anda bisa menangani jika m_assets_ins kosong di sini
        }))
      : [];

  console.log("seperator asset", seperatorAsset);

  const branchesWithNewName = branchGlobal.allBranches.map((branch) => ({
    id: branch.id,
    name: branch.cabang_name,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    const owner = e.target.owner.value || null;
    const destination = e.target.destination.value || null;
    const desc = e.target.desc.value || null;
    const quantity = e.target.qty.value || null;
    const courier = e.target.courier.value || null;

    const categoryId = selectedCategory ? selectedCategory.id : undefined;
    const assetName = selectedAsset ? selectedAsset.value1 : null;
    const assetId = selectedAsset ? selectedAsset.id : null;
    const noPolice = selectedAsset ? selectedAsset.value2 : null;
    const serialNumber = selectedAsset ? selectedAsset.value2 : null;
    const fromBranch = selectedFromBranch ? selectedFromBranch.name : null;
    const toBranch = selectedToBranch ? selectedToBranch.name : null;
    const category = selectedCategory ? selectedCategory.name : null;
    // const userIdPenerima = selectedUserPenerima
    //   ? selectedUserPenerima.id
    //   : undefined;

    const statusReturnId = selectedStatusReturn
      ? selectedStatusReturn.id
      : null;

    if (!categoryId) {
      errorAlertWithMessage("Please select a transfer category");
      return; // Keluar dari fungsi jika categoryId adalah undefined
    }

    dispatch(
      reqReturnAsset(
        {
          userId: userGlobal.id,

          desc: desc,
          assetName: assetName,
          assetId: assetId,
          noPolice: noPolice,
          sN: serialNumber,
          fromBranch: fromBranch,
          destination: destination,
          category: category,
          // userIdPenerima: userIdPenerima,
          courier: courier,
          qty: quantity,
          statusReturnId: statusReturnId,
          owner: owner,
        },
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
      cofirmasiReturnAsset({
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
  }

  console.log("isLoading: nihil", returnAssetGlobal.isLoading);
  if (returnAssetGlobal.isLoading && !(openModal === true)) return <Spinner />;

  return (
    <div>
      <div>
        <ModalForm2
          title="Return Assets"
          open={openModal}
          setOpen={setOpenModal}
          action="Add"
          onSubmit={handleSubmit}
          children={
            <ReturnAssetForm
              isSuperAdmin={isSuperAdmin}
              accesories={assetGlobal.accesoriesAsset}
              category={categoryGlobal.categories}
              asset={seperatorAsset}
              owner={ownerGlobal.ownerByAssetId}
              assetG={assetGlobal}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              selectCategory={selectedCategory}
              setSelectCategory={setSelectedCategory}
              branch={branchesWithNewName}
              selectfromBranch={selectedFromBranch}
              setSelectFromBranch={setSelectedFromBranch}
              selectToBranch={selectedToBranch}
              setSelectToBranch={setSelectedToBranch}
              statusReturn={statusReturnGlobal.statusReturn}
              selectStatus={selectedStatusReturn}
              setSelectStatus={setSelectedStatusReturn}
              allUser={userWithNewName}
              selectUserPenerima={selectedUserPenerima}
              setSelectUserPenerima={setSelectedUserPenerima}
            />
          }
        />
      </div>
      <div>
        <Modal3
          title="Confirmation Return Assets"
          open={opeModalConfirmed}
          setOpen={setOpenModalConfirmed}
          action="Accept"
          onSubmit={handleSubmitCofirmasi}
          setStatusSubmit={setStatusSubmitConfirmasi}
          children={<ConfirmedReturnAssetForm detailData={detailConfirmed} />}
        />
      </div>
      <AddDataHeader
        title="Return Asset"
        desc="A list Transfer Asset"
        addButtonText="Return Asse
        t"
        onAddClick={() => setOpenModal(true)}
      />

      <Table
        className="mb-4"
        headCols={[
          "No Return",
          "Date",
          "Asset Name",
          "Category",
          "From Branch",
          "Destination",
          "Shipping Notes",
          "Receipt Notes",
          "Condition Status",
          "Status",
        ]}
        tableBody={
          <TableBodyReturnAsset
            asset={returnAssetGlobal.returnAsset}
            setOpenModalConfirmed={setOpenModalConfirmed}
            setNoidTH={setNoidTH}
            setDetailApp={setDetailConfirmed}
          />
        }
      />
      <Pagination
        itemsInPage={returnAssetGlobal.returnAsset.length}
        totalItems={returnAssetGlobal.totalItem}
        totalPages={returnAssetGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ReturnAsset;
