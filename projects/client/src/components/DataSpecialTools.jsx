import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageDragAndDrop from "./ImageDragAndDrop";
import Dropdown from "./DropDown";
import {
  createDataAsset,
  fetchDataAsset,
} from "../service/dataAsset/resDataAsset.js";

import { useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";
import Comboboxes from "./Comboboxes";
import {
  OpMerkSpecialTools,
  OpTipeSpecialTools,
} from "../utils/option/optionValues";

export default function DataSpecialToolsForm({
  action = "Add",
  isLoading = false,
  setShowForm,
  categoryOptions = [],
  currPage,
  asset = {},
  img = {},
  idOnTabsCategory,
  addNewData,
  setNewAddData,
}) {
  console.log("asset nih", asset);

  const assetInsMap = {};

  if (asset.m_assets_ins && asset.m_assets_ins.length > 0) {
    asset.m_assets_ins.forEach((assetIn) => {
      assetInsMap[assetIn.m_form.column_name] = assetIn.value;
    });
  }

  console.log("assets inMap", assetInsMap);

  const procurumentDate = asset.procurument_date
    ? new Date(asset.procurument_date).toISOString().split("T")[0]
    : "";

  const purchaseDate = asset.purchase_date
    ? new Date(asset.purchase_date).toISOString().split("T")[0]
    : "";

  const receivedInBranch = asset.received_in_branch
    ? new Date(asset.received_in_branch).toISOString().split("T")[0]
    : "";

  const findIdMerk = OpMerkSpecialTools.find(
    (item) => item.name === assetInsMap["Merk"]
  )?.id;

  console.log("tetsing", assetInsMap["Merk"]);
  console.log("tetsing 2", findIdMerk);

  const findIdType = OpTipeSpecialTools.find(
    (item) => item.name === assetInsMap["Tipe"]
  )?.id;

  const dispatch = useDispatch();
  const [image, setImage] = useState(
    img && img.length > 0
      ? img.map((item) => ({
          preview: `http://localhost:2000/static/specialTools/${item.images_url}`,
        }))
      : []
  );

  const [dataAssets, setDataAssets] = useState([]);
  const [assetAdded, setAssetAdded] = useState(false);
  const [selectedMerk, setSelectedMerk] = useState(
    assetInsMap
      ? {
          id: findIdMerk || "", // gunakan findIdMerk jika ada, atau string kosong
          name: assetInsMap["Merk"],
        }
      : {} // default value jika asset.merk_special_tools tidak ada
  );
  console.log("selectedMerk", selectedMerk);

  const [selectedType, setSelectedType] = useState(
    assetInsMap
      ? {
          id: findIdType || "",
          name: assetInsMap["Tipe"],
        }
      : {}
  );

  useEffect(() => {
    if (asset.merk) {
      setSelectedMerk(asset.merk_special_tools);
    }
  }, [asset.merk]);

  const userGlobal = useSelector((state) => state.user);

  const branchId = userGlobal.id_cabang;
  const userId = userGlobal.id;

  const title = action[0].toUpperCase() + action.substring(1);

  async function handleSubmit(e) {
    // console.log("submit");
    e.preventDefault();

    // Ambil nilai dari form
    const {
      assetName,
      pic,
      purchaseDate,
      branchReceivedDate,
      procurementDate,
      desc,
      serialNumber,
      AccessoriesOne,
      AccessoriesTwo,
      AccessoriesThree,
      // qty,
    } = e.target;
    // const categoryId = selectedCategory.value;
    const merkName = selectedMerk.name;
    const typeName = selectedType.name;

    // Buat instance FormData untuk mengumpulkan data yang akan dikirim
    const newAsset = new FormData();
    newAsset.append("name", assetName?.value);
    newAsset.append("pic", pic?.value);
    newAsset.append("purchaseDate", purchaseDate?.value);
    newAsset.append("procurementDate", procurementDate?.value);
    newAsset.append("branchReceivedDate", branchReceivedDate?.value);
    newAsset.append("description", desc?.value);
    newAsset.append("serialNumber", serialNumber?.value);
    newAsset.append("AccessoriesOne", AccessoriesOne?.value);
    newAsset.append("AccessoriesTwo", AccessoriesTwo?.value);
    newAsset.append("AccessoriesThree", AccessoriesThree?.value);
    newAsset.append("category_id", idOnTabsCategory);

    // newAsset.append("quantity", qty?.value);

    newAsset.append("merkName", merkName);
    newAsset.append("typeName", typeName);

    newAsset.append("branch_id", branchId);
    newAsset.append("userId", userId);

    image.forEach((img, index) => {
      newAsset.append("asset_image", img); // asumsi img adalah File object
      // console.log("testi", img, img instanceof File);
    });

    //

    // ... (tambahkan field lain yang Anda butuhkan)
    for (let [key, value] of newAsset.entries()) {
      // console.log("key value", key, value);
    }

    // console.log("action special tool", action);

    if (action === "Add") {
      const response = await createDataAsset(newAsset, idOnTabsCategory);
      // console.log("response upload", response);
      setNewAddData(true);
      setAssetAdded(!assetAdded); // Mengganti nilai state untuk memicu useEffect
    }
  }
  useEffect(() => {
    // console.log("assetAdded nih 1:", assetAdded);
    // console.log("idOnTabsCategory:", idOnTabsCategory);
    async function updateDataAsset() {
      const newDataAsset = await fetchDataAsset(idOnTabsCategory);
      setDataAssets(newDataAsset);
    }

    if (assetAdded) {
      console.log("asset Added 2", assetAdded);
      updateDataAsset();
      setShowForm(false);
    }
  }, [assetAdded, idOnTabsCategory]);

  // Membuat objek untuk menyimpan column_name dan value dari assets.m_assets_ins

  return (
    <form
      className=" space-y-8 divide-y divide-gray-200 "
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title} Special Tools
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {title} asset's information.
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
                // required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block text-sm font-medium text-gray-700"
              >
                Penangung Jawab - (PIC)
              </label>
              <input
                type="text"
                name="pic"
                id="pic"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Person In Charge - (PIC)"]}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="purchaseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Pembelian
              </label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Tanggal Pembelian"]}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="procurementDate"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Pengadaan
              </label>
              <input
                type="date"
                name="procurementDate"
                id="procurementDate"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Tanggal Pengadaan"]}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="branchReceivedDate"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Terima diCabang
              </label>
              <input
                type="date"
                name="branchReceivedDate"
                id="branchReceivedDate"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Tanggal Terima dicabang"]}
                required
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
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a description about your asset.
              </p>
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="merk"
                className="block text-sm font-medium text-gray-700"
              >
                Merk
              </label>
              <Comboboxes
                people={OpMerkSpecialTools}
                selectedValue={selectedMerk}
                setSelectedValue={setSelectedMerk}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="tipe"
                className="block text-sm font-medium text-gray-700"
              >
                Tipe
              </label>
              <Comboboxes
                people={OpTipeSpecialTools}
                selectedValue={selectedType}
                setSelectedValue={setSelectedType}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="serialNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Serial Number
              </label>
              <input
                type="text"
                // min="0"
                name="serialNumber"
                id="serialNumber"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Serial Number"]}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="AccessoriesOne"
                className="block text-sm font-medium text-gray-700"
              >
                Accessories 1
              </label>
              <input
                type="text"
                // min="0"
                name="AccessoriesOne"
                id="AccessoriesOne"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Accessories 1"]}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="AccessoriesTwo"
                className="block text-sm font-medium text-gray-700"
              >
                Accessories 2
              </label>
              <input
                type="text"
                // min="0"
                name="AccessoriesTwo"
                id="AccessoriesTwo"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Accessories 2"]}
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="AccessoriesThree"
                className="block text-sm font-medium text-gray-700"
              >
                Accessories 3
              </label>
              <input
                type="text"
                // min="0"
                name="AccessoriesThree"
                id="AccessoriesThree"
                className="p-2 border border-gray-400 spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={assetInsMap["Accessories 3"]}
              />
            </div>

            {/* )} */}

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Asset Image
              </label>
              <ImageDragAndDrop
                className="mt-1"
                image={image}
                setImage={setImage}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          {isLoading ? (
            <LoadingButton className="ml-3" />
          ) : (
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
