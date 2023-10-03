import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageDragAndDrop from "../ImageDragAndDrop";
import Dropdown from "../DropDown";
import {
  createDataAsset,
  fetchDataAsset,
} from "../../service/dataAsset/resDataAsset.js";

import { useSelector } from "react-redux";
import LoadingButton from "../LoadingButton";
import Comboboxes from "../Comboboxes";
import ComboboxesWithStatus from "../ComboboxesWithStatus";

const categoryOptions = [{ value: undefined, label: "None" }];
const subCategoryOptions = [{ value: 0, label: "None" }];

export default function TransferAssetForm({
  isSuperAdmin,
  branchUserExits,
  asset = {},
  category = {},
  branch = {},
  subCatgeory = {},
  noPolisi = {},
  noSN = {},
  allUser = {},
  selectedCategory,
  setSelectedCategory,
  selectedAsset,
  setSelectedAsset,
  selectfromBranch,
  setSelectFromBranch,
  selectToBranch,
  setSelectToBranch,
  tipe,
  setTipe,
  selectPolice,
  setSelectPolice,
  selectSN,
  setSelectSN,
  selectUserPenerima,
  setSelectUserPenerima,
}) {
  console.log("isSuperAdmin ya :", isSuperAdmin);
  console.log("allUser nih", allUser);
  // console.log("selectedAsset", selectedAsset);
  //   const title = action[0].toUpperCase() + action.substring(1);
  console.log("selectedcategory", selectedCategory);
  // console.log("subCatgeory", subCatgeory);
  // console.log("tipe", tipe);
  console.log("asset nih browis", asset);
  console.log("noPolis ya adalah:", noPolisi);
  console.log("branchUserExits", branchUserExits);

  const [qty, setQty] = useState(0);

  useEffect(() => {
    console.log("test run");
    if (selectedCategory && selectedCategory.name) {
      if (
        selectedCategory.name === "Kendaraan" ||
        selectedCategory.name === "Special Tools"
      ) {
        setQty(1);
      }
    }
  }, [selectedCategory]);

  const newCategoryOption = category.map((ctgr) => ({
    value: ctgr.id,
    label: ctgr.name_ctgr,
  }));

  categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  const newsubOption = subCatgeory.map((ctgr) => ({
    value: ctgr.id,
    label: ctgr.name,
  }));

  subCategoryOptions.splice(1, subCategoryOptions.length - 1, ...newsubOption);

  return (
    // <form
    //   className=" space-y-8 divide-y divide-gray-200 "
    //   //   onSubmit={handleSubmit}
    // >
    <>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
            <p className="mt-1 text-sm text-gray-500">
              {/* {title} */}
              Transfer asset's information.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2 ">
              <label
                htmlFor="fromBranch"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Dropdown
                label="None"
                options={categoryOptions}
                selectedValue={selectedCategory}
                onChange={setSelectedCategory}
                className=" text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />

              {/* <Comboboxes
                people={categoryOptions}
                selectedValue={selectedCategory}
                setSelectedValue={setSelectedCategory}
                // isInputDisabled={isSuperAdmin}
              /> */}
            </div>

            {/* {selectedCategory && selectedCategory.label === "Kendaraan" && (
              <div className="sm:col-span-2 ">
                <label
                  htmlFor="noPolisi"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Polisi
                </label>
                <Comboboxes
                  people={noPolisi}
                  selectedValue={selectPolice}
                  setSelectedValue={setSelectPolice}
                />
              </div>
            )} */}

            {/* {selectedCategory && selectedCategory.label === "Special Tools" && (
              <div className="sm:col-span-2 ">
                <label
                  htmlFor="noPolisi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Serial Number
                </label>
                <Comboboxes
                  people={noSN}
                  selectedValue={selectSN}
                  setSelectedValue={setSelectSN}
                />
              </div>
            )} */}

            <div className="sm:col-span-2 ">
              <label
                htmlFor="fromBranch"
                className="block text-sm font-medium text-gray-700"
              >
                Asset Name
              </label>
              <ComboboxesWithStatus
                people={asset}
                selectedValue={selectedAsset}
                setSelectedValue={setSelectedAsset}
              />
            </div>

            {/* <div className="sm:col-span-2 ">
              <label
                htmlFor="fromBranch"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Dropdown
                label="None"
                options={categoryOptions}
                selectedValue={selectedCategory}
                onChange={setSelectedCategory}
                className=" text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />

              <Comboboxes
                people={categoryOptions}
                selectedValue={selectedCategory}
                setSelectedValue={setSelectedCategory}
                // isInputDisabled={isSuperAdmin}
              />
            </div> */}

            <div className="sm:col-span-2 ">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                // defaultValue={asset.m_stock.quantity}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="qty"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                min="0"
                name="qty"
                id="qty"
                className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={
                  selectedCategory &&
                  (selectedCategory.name === "Kendaraan" ||
                  selectedCategory.name === "Special Tools"
                    ? 1
                    : qty)
                }
                onChange={(e) => {
                  if (
                    !(
                      selectedCategory &&
                      (selectedCategory.name === "Kendaraan" ||
                        selectedCategory.name === "Special Tools")
                    )
                  ) {
                    setQty(parseInt(e.target.value));
                  }
                }}
                disabled={
                  selectedCategory &&
                  (selectedCategory.name === "Kendaraan" ||
                    selectedCategory.name === "Special Tools")
                }
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="fromBranch"
                className="block text-sm font-medium text-gray-700"
              >
                From Branch
              </label>
              <Comboboxes
                people={branch}
                selectedValue={selectfromBranch}
                setSelectedValue={setSelectFromBranch}
                isInputDisabled={isSuperAdmin}
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="toBranches"
                className="block text-sm font-medium text-gray-700"
              >
                To Branch
              </label>
              <Comboboxes
                people={branch}
                selectedValue={selectToBranch}
                setSelectedValue={setSelectToBranch}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Name
              </label>
              <Comboboxes
                people={allUser}
                selectedValue={selectUserPenerima}
                setSelectedValue={setSelectUserPenerima}
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="desc"
                  name="desc"
                  rows={3}
                  className="p-2 block w-full rounded-md border border-gray-400 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  //   defaultValue={asset.desc}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a description about your asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
