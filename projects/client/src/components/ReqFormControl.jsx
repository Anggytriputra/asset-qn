import { useState } from "react";
import Dropdown from "./DropDown";

const categoryOptions = [{ value: 0, label: "None" }];

export default function ReqFormControl({
  category = {},
  selectedCategory,
  setSelectedCategory,
}) {
  // console.log("category", category);
  // const [selectedCategory, setSelectedCategory] = useState();

  // console.log("selectedCategory", selectedCategory.label);

  const newCategoryOption = category.map((ctgr) => ({
    value: ctgr.id,
    label: ctgr.name_ctgr,
  }));

  categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
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
        />
      </div>

      <div className="col-span-1">
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
        />
      </div>

      <div className="col-span-1">
        <label
          htmlFor="ctgr"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <Dropdown
          label="None"
          options={categoryOptions}
          selectedValue={selectedCategory}
          onChange={setSelectedCategory}
          className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="col-span-2">
        <label
          htmlFor="desc"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <div className="">
          <textarea
            id="desc"
            name="desc"
            rows={3}
            className="p-2 block w-full rounded-md border border-gray-400 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Write a description about your asset.
        </p>
      </div>
    </div>
  );
}
