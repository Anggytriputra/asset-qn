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

const SettingsAssetName = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  console.log("userGlobal", userGlobal);

  useEffect(() => {
    if (userGlobal.role === "Super Admin") {
      dispatch(fetchAssetName());
    }
  });

  return (
    <div>
      <div>SettingsAssetName</div>
      <AddDataHeader
        title="Seeting Asset Name"
        desc="A list Asset Name"
        addButtonText="Add Asset"
        onAddClick={() => setOpenModal(true)}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
        <SearchBar
        // onSubmit={handleSubmit}
        // defaultValue={searchCategoryName}
        />
        <Dropdown
          label="Sort"
          // options={sortOptions}
          // selectedValue={sortFilter}
          // onChange={setSortFilter}
          className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      </div>
      <GridList projects={listDataBaseName} />
    </div>
  );
};

export default SettingsAssetName;
