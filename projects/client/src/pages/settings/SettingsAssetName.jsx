import React, { useEffect, useState } from "react";
import CompTesting from "../../components/componentTest/CompTesting";
import { listDataBaseName } from "../../constant/listSetting";
import GridList from "../../components/GridList";
import AddDataHeader from "../../components/AddDataHeader";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetName } from "../../reducers/assetNameSlice";
import TableList from "../../components/TableList";
import Spinner from "../../components/Spinner";
import TableBodyAssetName from "../../components/settingAssetName/TableBodyAssetName";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Comboboxes from "../../components/Comboboxes";
import { fetchCategories } from "../../reducers/categorySlice";
import Modal3 from "../../components/Modal3";
import ModalForm from "../../components/Modal";
import ModalForm2 from "../../components/Modal2";
import FormAsset from "../../components/settingAssetName/FormAsset";
import { createAssetName } from "../../reducers/optionSlice";

const categoryOptions = [{ id: "", name: "None" }];

const SettingsAssetName = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const userGlobal = useSelector((state) => state.user);
  const assetNamesGlobal = useSelector((state) => state.assetName);
  const categoriesGlobal = useSelector((state) => state.category.categories);

  console.log("assetNamesGlobal", assetNamesGlobal);
  // useState
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  // filter
  const [searchAssetName, setSearchAssetName] = useState("");
  const [sortCategory, setSortCategory] = useState(categoryOptions[0]);
  console.log("sort category", sortCategory);

  //
  const [selectedCategory, setSelectedCategopry] = useState(categoryOptions[0]);

  useEffect(() => {
    // params
    let query = `page=${currentPage}`;
    searchAssetName
      ? searchParams.set("q", searchAssetName)
      : searchParams.delete("q");
    sortCategory.id
      ? searchParams.set("sortCategory", sortCategory.id)
      : searchParams.delete("sortCategory");

    query += `&${searchParams.toString()}`;
    setSearchParams(searchParams);

    if (userGlobal.role === "Super Admin") {
      dispatch(fetchAssetName(query));
    }
  }, [userGlobal, currentPage, searchAssetName, sortCategory]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //  Data Manipulation
  const updatedCategories = categoriesGlobal.map((category) => ({
    id: category.id,
    name: category.name_ctgr,
  }));

  categoryOptions.splice(1, categoryOptions.length - 1, ...updatedCategories);

  function handleSubmitSearch(e) {
    e.preventDefault();
    setSearchAssetName(e.target.searchBar?.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value || null;

    const categoryId = selectedCategory ? selectedCategory.id : null;

    console.log("name adalah", name);
    dispatch(
      createAssetName({
        name: name,
        categoryId: categoryId,
      })
    );
  }

  if (assetNamesGlobal.isLoading) return <Spinner />;

  return (
    <div>
      <ModalForm2
        title="Asset Name"
        open={openModal}
        setOpen={setOpenModal}
        action="Add"
        onSubmit={handleSubmit}
        children={
          <FormAsset
            category={categoryOptions}
            selectCategory={selectedCategory}
            setSelectCategory={setSelectedCategopry}
          />
        }
      />

      <AddDataHeader
        title="Setting Asset Name"
        desc="A list Asset Name"
        addButtonText="Add Asset"
        onAddClick={() => setOpenModal(true)}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <SearchBar
          onSubmit={handleSubmitSearch}
          defaultValue={searchAssetName}
        />
        <Comboboxes
          people={categoryOptions}
          selectedValue={sortCategory}
          setSelectedValue={setSortCategory}
        />
      </div>

      <div>
        <Table
          className="mb-4"
          headCols={[
            "Name",
            "Category",
            "Last Updated",
            // "Updated By",
            "Status",
          ]}
          tableBody={
            <TableBodyAssetName asset={assetNamesGlobal.assetNames.asset} />
          }
        />

        <Pagination
          itemsInPage={assetNamesGlobal.assetNames.asset.length}
          totalItems={assetNamesGlobal.assetNames.totalItem}
          totalPages={assetNamesGlobal.assetNames.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* <TableList projects={assetNamesGlobal.assetNames.rows} /> */}
    </div>
  );
};

export default SettingsAssetName;
