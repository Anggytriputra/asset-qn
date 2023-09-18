import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "../components/Modal";
import ReqFormControl from "../components/ReqFormControl";
import AddDataHeader from "../components/AddDataHeader";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import OrderTable from "../components/tableBodyOrderAsset/OrderTable";
import { fetchrequestAsset } from "../reducers/transReqOrderSlice";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const RequestAsset = () => {
  const dispatch = useDispatch();

  const CategoryGlobal = useSelector((state) => state.category);
  const userGlobal = useSelector((state) => state.user);
  const transHOrderGlobal = useSelector((state) => state.transHOrder);
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log("category globalt", CategoryGlobal);
  // console.log("user global", userGlobal);
  console.log("transHOrder", transHOrderGlobal);

  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTransHReq, setSearchTransHReq] = useState(
    searchParams.get("q") || ""
  );
  console.log("current page", currentPage);

  useEffect(() => {
    let query = `page=${currentPage}`;

    searchTransHReq
      ? searchParams.set("q", searchTransHReq)
      : searchParams.delete("q");
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

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);
    dispatch(fetchrequestAsset(query));
    console.log("query ya ini", query);
  }, [dispatch, userGlobal.id, currentPage, searchTransHReq]);

  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleAddAdmin(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTransHReq(e.target.searchBar?.value);
  }

  return (
    <div>
      <div>
        <ModalForm
          title="Asset"
          open={openModal}
          setOpen={setOpenModal}
          action="request"
          onSubmit={handleAddAdmin}
          // isLoading={isLoading}
          children={<ReqFormControl category={CategoryGlobal.categories} />}
        />
      </div>
      <div>
        <AddDataHeader
          title="Request Asset"
          desc="A list order asset"
          addButtonText="Request Asset"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <SearchBar
          onSubmit={handleSubmit}
          defaultValue={searchTransHReq}
        />
      </div>

      <Table
        className="mb-4"
        headCols={["Asset Name", "Branch", "Category", "quantity", "Status"]}
        tableBody={<OrderTable asset={transHOrderGlobal.transHOrder} />}
      />
      <Pagination
        itemsInPage={transHOrderGlobal.transHOrder.length}
        // itemsPerPage={6}
        totalItems={transHOrderGlobal.totalItem}
        totalPages={transHOrderGlobal.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RequestAsset;
