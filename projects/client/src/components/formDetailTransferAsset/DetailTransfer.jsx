import { useState } from "react";
import ImageDragAndDrop from "../ImageDragAndDrop";
import ListImages from "../ListImages";

export default function DetailTransfer({ asset = {}, img = {} }) {
  console.log("asset ya loop", asset);
  // const assetInsMap = {};

  // if (asset.m_trans_ds.m_assets_in && asset.m_trans_ds.m_assets_in.length > 0) {
  //   asset.m_trans_ds.m_assets_in.forEach((assetIn) => {
  //     assetInsMap[assetIn.m_form.column_name] = assetIn.value;
  //   });
  // }

  // console.log("columnName", assetInsMap);

  return (
    <form
      className=" space-y-8 divide-y divide-gray-200 "
      //   onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {/* {title}  */}
              Kendaraan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {/* {title} */}
              asset's information.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="assetName"
                className="block text-sm font-medium text-gray-700"
              >
                No. Transfer
              </label>
              <input
                type="text"
                name="assetName"
                id="assetName"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.no_transfer}
                disabled
                // required
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="noPolisi"
                className="block text-sm font-medium text-gray-700"
              >
                No. Polisi
              </label>
              <input
                type="text"
                // min="0"
                // name="noPolisi"
                id="noPolisi"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_trans_ds[0].no_polisi}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="seriNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Serial Number
              </label>
              <input
                type="text"
                // min="0"
                // name="seriNumber"
                // id="seriNumber"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_trans_ds[0].serial_number}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                // min="0"
                // name="seriNumber"
                // id="seriNumber"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_trans_ds[0].m_category.name}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="noPolisi"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="text"
                // min="0"
                // name="noPolisi"
                // id="noPolisi"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.date}
                disabled
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="assetName"
                className="block text-sm font-medium text-gray-700"
              >
                Asset Name
              </label>
              <input
                type="text"
                name="assetName"
                id="assetName"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_trans_ds[0].m_asset_name}
                disabled
                // required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                // htmlFor="pic"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient's name
              </label>
              <input
                type="text"
                // name="pic"
                // id="pic"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.user_penerima.username}
                disabled
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Status
              </label>
              <input
                type="text"
                name="pic"
                id="pic"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_status.status_name}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                From Branch
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.CabangOut.cabang_name}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                To Branch
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.CabangIn.cabang_name}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                Sender's Name
              </label>
              <input
                type="text"
                name="user"
                id="user"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.user_transfer.username}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmed By
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={
                  asset.user_confirmation
                    ? asset.user_confirmation.username || "-"
                    : "-"
                }
                disabled
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="desc"
                  name="desc"
                  rows={3}
                  className="p-2 block w-full rounded-md border border-gray-400 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  defaultValue={asset.desc}
                  disabled
                />
              </div>

              {/* <p className="mt-2 text-sm text-gray-500">
                Write a description about your asset.
              </p> */}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Receipt Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="desc"
                  name="desc"
                  rows={3}
                  className="p-2 block w-full rounded-md border border-gray-400 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  defaultValue={asset.desc_received}
                  disabled
                />
              </div>
              {/* <p className="mt-2 text-sm text-gray-500">
                Write a description about your asset.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
