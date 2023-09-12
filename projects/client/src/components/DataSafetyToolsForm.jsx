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
import axios from "axios";

export default function DataSafetyToolsForm({
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
  // console.log("idOnTabsCategory", idOnTabsCategory);

  // console.log("img", img);

  console.log("aseet data edit", asset);

  const dispatch = useDispatch();

  const [image, setImage] = useState(
    img && img.length > 0
      ? img.map((item) => ({
          preview: `http://localhost:2000/static/safetyTools/${item.images_url}`,
        }))
      : []
  );

  console.log("img", image);

  const [selectedCategory, setSelectedCategory] = useState(
    asset.Category
      ? { value: asset.Category?.id, label: asset.Category?.name }
      : categoryOptions[0]
  );
  const [dataAssets, setDataAssets] = useState([]);

  console.log("setDataAset", dataAssets);
  const [assetAdded, setAssetAdded] = useState(false);

  const userGlobal = useSelector((state) => state.user);

  const branchId = userGlobal.id_cabang;
  const userId = userGlobal.id;

  // console.log("userid", userId);

  const title = action[0].toUpperCase() + action.substring(1);

  async function handleSubmit(e) {
    // console.log("submit");
    e.preventDefault();

    // Ambil nilai dari form
    const { assetName, desc, price, qty } = e.target;
    // const categoryId = selectedCategory.value;

    // Buat instance FormData untuk mengumpulkan data yang akan dikirim
    const newAsset = new FormData();
    newAsset.append("name", assetName?.value);
    newAsset.append("CategoryId", idOnTabsCategory);
    newAsset.append("userId", userId);
    newAsset.append("description", desc?.value);
    newAsset.append("quantity", qty?.value);

    image.forEach((img, index) => {
      newAsset.append("asset_image", img); // asumsi img adalah File object
      // console.log("testi", img, img instanceof File);
    });

    newAsset.append("branch_id", branchId);

    // ... (tambahkan field lain yang Anda butuhkan)
    for (let [key, value] of newAsset.entries()) {
      // console.log("key value", key, value);
    }

    if (action === "Add") {
      const response = await createDataAsset(newAsset, idOnTabsCategory);
      console.log("response upload", response);
      setAssetAdded(!assetAdded); // Mengganti nilai state untuk memicu useEffect
      setNewAddData(true);
    }
  }
  useEffect(() => {
    async function updateDataAsset() {
      try {
        const newDataAsset = await fetchDataAsset(idOnTabsCategory);
        console.log("new DataAsset", newDataAsset);
        setDataAssets(newDataAsset.data); // Pastikan Anda mengakses field yang benar di newDataAsset
        updateDataAsset();
        // setShowForm(false); // Ini akan dipanggil setelah data berhasil di-fetch
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    if (assetAdded) {
      setShowForm(false); // Ini akan dipanggil setelah data berhasil di-fetch
    }
  }, [assetAdded, idOnTabsCategory]);

  return (
    <form
      className=" space-y-8 divide-y divide-gray-200 "
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title} Safety Tools
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
                required
              />
            </div>

            <div className="sm:col-span-2 ">
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
                defaultValue={asset.m_stock.quantity}
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
