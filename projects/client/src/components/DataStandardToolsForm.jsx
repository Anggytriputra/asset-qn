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

export default function DataStandardToolsForm({
  action = "add",
  isLoading = false,
  setShowForm,
  categoryOptions = [],
  currPage,
  product = {},
}) {
  // console.log("setShowForm", setShowForm);
  // console.log("categoryoption", categoryOptions);
  // console.log("product", product);
  // console.log("curPAGE", currPage);

  const dispatch = useDispatch();
  const [image, setImage] = useState(
    product.image_urls
      ? product.image_urls.map((url) => ({
          preview: `http://localhost:2000/${url}`,
        }))
      : []
  );

  const [selectedCategory, setSelectedCategory] = useState(
    product.Category
      ? { value: product.Category?.id, label: product.Category?.name }
      : categoryOptions[0]
  );
  const [dataAssets, setDataAssets] = useState([]);
  const [assetAdded, setAssetAdded] = useState(false);

  console.log("assetAdded", assetAdded);

  // console.log("setSelected", selectedCategory);

  const userGlobal = useSelector((state) => state.user);

  console.log("userBranc", userGlobal);
  const branchId = userGlobal.id_cabang;

  console.log("branch id ini bro", branchId);

  const title = action[0].toUpperCase() + action.substring(1);

  async function handleSubmit(e) {
    // console.log("submit");
    e.preventDefault();

    // Ambil nilai dari form
    const { assetName, desc, price, qty, no_surat, warna } = e.target;
    const categoryId = selectedCategory.value;

    // Buat instance FormData untuk mengumpulkan data yang akan dikirim
    const newAsset = new FormData();
    newAsset.append("name", assetName?.value);
    newAsset.append("category_id", categoryId);
    newAsset.append("description", desc?.value);
    newAsset.append("price", price?.value || 0);
    newAsset.append("quantity", qty?.value);
    newAsset.append("no_surat", no_surat?.value);
    newAsset.append("color", warna?.value);
    image.forEach((img, index) => {
      newAsset.append("asset_image", img); // asumsi img adalah File object
      console.log("testi", img, img instanceof File);
    });

    newAsset.append("branch_id", branchId);

    // ... (tambahkan field lain yang Anda butuhkan)
    for (let [key, value] of newAsset.entries()) {
      console.log("key value", key, value);
    }

    if (action === "Add") {
      const response = await createDataAsset(newAsset);
      console.log("response upload", response);
      setAssetAdded(!assetAdded); // Mengganti nilai state untuk memicu useEffect
    }
  }
  useEffect(() => {
    async function updateDataAsset() {
      const newDataAsset = await fetchDataAsset();
      setDataAssets(newDataAsset);
    }

    if (assetAdded) {
      updateDataAsset();
      setShowForm(false);
    }
  }, [assetAdded]);

  return (
    <form
      className=" space-y-8 divide-y divide-gray-200 "
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title} Standard Tools
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {title} product's information.
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
                defaultValue={product.name}
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
                className="p-2 border border-gray-400 spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={product.Stocks?.[product.stockIdx]?.stock}
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
                  defaultValue={product.desc}
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
