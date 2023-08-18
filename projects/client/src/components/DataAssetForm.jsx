import { useState } from "react";
import { useDispatch } from "react-redux";
import ImageDragAndDrop from "./ImageDragAndDrop";
import Dropdown from "./DropDown";
// import { createProduct, updateProduct } from "../reducers/productSlice";
import { useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";

export default function DataAssetForm({
  action = "add",
  isLoading = false,
  setShowForm,
  categoryOptions = [],
  currPage,
  product = {},
}) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(
    product.image_url
      ? {
          preview: `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${product.image_url}`,
        }
      : {}
  );
  const [selectedCategory, setSelectedCategory] = useState(
    product.Category
      ? { value: product.Category?.id, label: product.Category?.name }
      : categoryOptions[0]
  );

  const userGlobal = useSelector((state) => state.user);

  const title = action[0].toUpperCase() + action.substring(1);

  function handleSubmit(e) {
    // e.preventDefault();
    // const { productName, desc, price, stock } = e.target;
    // const categoryId = selectedCategory.value;
    // const newProduct = new FormData();
    // newProduct.append("name", productName?.value);
    // newProduct.append("category_id", categoryId);
    // newProduct.append("price", price?.value || 0);
    // if (action === "edit") {
    //   /* Check if the user remove the img, since if the img isn't removed
    //      the object will have `preview` property */
    //   if (!Object.keys(image).length) newProduct.append("isImgDeleted", true);
    // }
    // newProduct.append("product_image", image);
    // newProduct.append("desc", desc?.value);
    // newProduct.append("stock", stock?.value || 0);
    // newProduct.append("stock_id", product.Stocks?.[product.stockIdx].id || 0);
    // newProduct.append(
    //   "branch_id",
    //   userGlobal.branch_id || product.Stocks?.[product.stockIdx]?.Branch?.id
    // );
    // if (action === "add")
    //   dispatch(createProduct(newProduct, currPage, userGlobal.branch_id));
    // else if (action === "edit")
    //   dispatch(
    //     updateProduct(product.id, newProduct, currPage, userGlobal.branch_id)
    //   );
  }

  return (
    <>
      <form
        className="space-y-8 divide-y divide-gray-200 flex flex-1 flex-col md:pl-64"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title} Asset
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {title} product's information.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asset Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  defaultValue={product.name}
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    defaultValue={product.desc}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a description about your asset.
                </p>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Dropdown
                  label="Category"
                  options={categoryOptions}
                  selectedValue={selectedCategory}
                  onChange={setSelectedCategory}
                  className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  name="price"
                  id="price"
                  className="spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  defaultValue={product.price}
                />
              </div>

              {/* {(userGlobal.role !== "superadmin" || action === "edit") && ( */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  id="stock"
                  className="spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  defaultValue={product.Stocks?.[product.stockIdx]?.stock}
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
    </>
  );
}
