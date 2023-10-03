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

const categoryOptions = [{ value: undefined, label: "None" }];
const subCategoryOptions = [{ value: 0, label: "None" }];

export default function ConfirmedReturnAssetForm({
  detailData,
  isSuperAdmin,
  branchUserExits,
  asset = {},
  category = {},
  branch = {},
  subCatgeory = {},
  noPolisi = {},
  noSN = {},
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
}) {
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

          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">No. Return</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.no_return}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Serial Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.m_trans_d_returns[0].serial_number}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Asset Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.m_trans_d_returns[0].m_asset_name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">from Branch</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.CabangOut.cabang_name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Destination</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.destination}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {detailData.desc}
              </dd>
            </div>
          </dl>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
