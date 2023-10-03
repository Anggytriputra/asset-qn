import { useState } from "react";
import ImageDragAndDrop from "../ImageDragAndDrop";
import ListImages from "../ListImages";

export default function StandardToolsDetail({
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
  console.log("asset", asset);
  const assetInsMap = {};

  if (asset.m_assets_ins && asset.m_assets_ins.length > 0) {
    asset.m_assets_ins.forEach((assetIn) => {
      assetInsMap[assetIn.m_form.column_name] = assetIn.value;
    });
  }

  const [image, setImage] = useState(
    img.assets && img.assets.length > 0
      ? img.assets.map((item) => ({
          preview: `http://localhost:2000/static/standardTools/${item.images_url}`,
        }))
      : []
  );

  console.log("images nih", image);

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
                Quantity
              </label>
              <input
                type="text"
                name="pic"
                id="pic"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_stock.quantity}
                disabled
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="purchaseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Branch
              </label>
              <input
                type="text"
                name="purchaseDate"
                id="purchaseDate"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_cabang.cabang_name}
                disabled
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="purchaseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                name="purchaseDate"
                id="purchaseDate"
                className="p-2 block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:ring-orange-500 sm:text-sm"
                defaultValue={asset.m_category.name}
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

            {/* {(userGlobal.role !== "superadmin" || action === "edit") && ( */}

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
