import { useState } from "react";
import ImageDragAndDrop from "../ImageDragAndDrop";
import ListImages from "../ListImages";

export default function KendaraanDetails({
  //   action = "add",
  //   isLoading = false,
  //   setShowForm,
  //   subCategoryOption = [],
  //   currPage,
  asset = {},
  img = {},
  //   idOnTabsCategory,
  //   addNewData,
  //   setNewAddData,
}) {
  // console.log("img", img);
  const assetInsMap = {};

  if (asset.m_assets_ins && asset.m_assets_ins.length > 0) {
    asset.m_assets_ins.forEach((assetIn) => {
      assetInsMap[assetIn.m_form.column_name] = assetIn.value;
    });
  }

  const [image, setImage] = useState(
    img.assets && img.assets.length > 0
      ? img.assets.map((item) => ({
          preview: `http://localhost:2000/static/kendaraan/${item.images_url}`,
        }))
      : []
  );

  // console.log("images nih", image);

  //   const title = "mellow".toUpperCase() + "mellow".substring(1);

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
            <div className="sm:col-span-4">
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
                defaultValue={asset.name}
                disabled
                // required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block text-sm font-medium text-gray-700"
              >
                Person In Charge - (PIC)
              </label>
              <input
                type="text"
                name="pic"
                id="pic"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Person In Charge - (PIC)"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700"
              >
                Name of Owner
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
              />
            </div>
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="receivedInBranch"
                className="block text-sm font-medium text-gray-700"
              >
                Received in Branch
              </label>
              <input
                type="date"
                name="receivedInBranch"
                id="receivedInBranch"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={receivedInBranch}
                required
              />
            </div> */}
            <div className="sm:col-span-2 ">
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700"
              >
                Condition
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                // required
                disabled
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
                  defaultValue={asset.desc}
                  disabled
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a description about your asset.
              </p>
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="sub_category"
                className="block text-sm font-medium text-gray-700"
              >
                Sub-Category
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                Merk
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
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
                name="noPolisi"
                id="noPolisi"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["No. Polisi"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="noRangka"
                className="block text-sm font-medium text-gray-700"
              >
                No. Rangka
              </label>
              <input
                type="text"
                // min="0"
                name="noRangka"
                id="noRangka"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["No. Rangka"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="noMesin"
                className="block text-sm font-medium text-gray-700"
              >
                No. Mesin
              </label>
              <input
                type="text"
                // min="0"
                name="noMesin"
                id="noMesin"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["No. Mesin"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="tahun"
                className="block text-sm font-medium text-gray-700"
              >
                Tipe Kendaraan
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="warna"
                className="block text-sm font-medium text-gray-700"
              >
                Warna
              </label>
              <input
                type="text"
                // min="0"
                name="warna"
                id="warna"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Warna"]}
                disabled
              />
            </div>
            {/* {(userGlobal.role !== "superadmin" || action === "edit") && ( */}
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
                className="p-2 border border-gray-400 spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_stock.quantity}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="expTaxOneYear"
                className="block text-sm font-medium text-gray-700"
              >
                Exp Tanggal Pajak 1 Tahun
              </label>
              <input
                type="date"
                name="expTaxOneYear"
                id="expTaxOneYear"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Exp tgl Pajak 1 Tahun"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="receivedInBranch"
                className="block text-sm font-medium text-gray-700"
              >
                Exp Tanggal Pajak 5 Tahun
              </label>
              <input
                type="date"
                name="expTaxFiveYear"
                id="expTaxFiveYear"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Exp tgl Pajak 5 Tahun"]}
                disabled
              />
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="statusStnk"
                className="block text-sm font-medium text-gray-700"
              >
                Status Stnk
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Name of Owner"]}
                disabled
              />
            </div>
            {/* )} */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Asset Image
              </label>
              {/* <ImageDragAndDrop
                className="mt-1"
                image={image}
                setImage={setImage}
              /> */}

              <ListImages images={image} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
