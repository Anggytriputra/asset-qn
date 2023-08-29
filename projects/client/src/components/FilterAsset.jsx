import React from "react";
import SearchBar from "./SearchBar";
import Dropdown from "./DropDown";
import { useSelector } from "react-redux";

export default function Filterasset({
  searchProductName,
  onSearch,
  sortOptions,
  sortFilter,
  onSortChange,
  subCategoryOption,
  subCategoriesFilter,
  onSubCategoriesChange,
  branchOptions,
  branchFilter,
  onBranchChange,
}) {
  const userGlobal = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 mt-12 border-b border-gray-200">
      <SearchBar
        onSubmit={onSearch}
        defaultValue={searchProductName}
      />
      <div className="flex gap-2 items-center flex-wrap">
        {/* <Dropdown
          label="Sort"
          options={sortOptions}
          selectedValue={sortFilter}
          onChange={onSortChange}
          className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        /> */}
        <Dropdown
          label="Category"
          options={subCategoryOption}
          selectedValue={subCategoriesFilter}
          onChange={onSubCategoriesChange}
          className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {userGlobal.role === "superadmin" && (
          <Dropdown
            label="Branch"
            options={branchOptions}
            selectedValue={branchFilter}
            onChange={onBranchChange}
            className="text-sm bg-gray-50 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    </div>
  );
}
