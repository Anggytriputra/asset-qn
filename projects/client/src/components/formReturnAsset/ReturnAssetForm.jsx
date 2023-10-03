import LoadingButton from "../LoadingButton";
import Comboboxes from "../Comboboxes";
import ComboboxesWithStatus from "../ComboboxesWithStatus";
import Dropdown from "../DropDown";
import SelectMenus from "../SelectMenus";
import Disclosure from "../DisclosureTools";
import CheckBox from "../CheckBox";
import { useEffect, useState } from "react";

const categoryOptions = [{ id: 0, name: "None" }];

export default function ReturnAssetForm({
  isSuperAdmin,
  accesories = {},
  assetG = {},
  asset = {},
  owner = {},
  category = {},
  branch = {},
  statusReturn = {},
  allUser = {},
  selectCategory,
  setSelectCategory,
  selectedAsset,
  setSelectedAsset,
  selectfromBranch,
  setSelectFromBranch,
  selectToBranch,
  setSelectToBranch,
  selectUserPenerima,
  setSelectUserPenerima,

  //
  selectStatus,
  setSelectStatus,
}) {
  // console.log("select status", selectStatus);
  console.log("category", selectCategory.name);
  // console.log("isSuperAdmin ya :", isSuperAdmin)
  // console.log("owner adalah", owner);
  console.log("status retrun", statusReturn);

  const newCategoryOption = category.map((ctgr) => ({
    id: ctgr.id,
    name: ctgr.name_ctgr,
  }));

  const [qty, setQty] = useState(0);

  console.log("qty", qty);

  useEffect(() => {
    console.log("test run");
    if (
      selectCategory.name === "Kendaraan" ||
      selectCategory.name === "Special Tools"
    ) {
      setQty(1);
    }
  }, [selectCategory]);

  categoryOptions.splice(1, categoryOptions.length - 1, ...newCategoryOption);

  console.log("categoryOption", categoryOptions);

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
              <SelectMenus
                // label="None"
                people={newCategoryOption}
                selected={selectCategory}
                setSelected={setSelectCategory}
                // onChange={setSelectedCategory}
                className=" text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>

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

            <div className="sm:col-span-2 ">
              <label
                htmlFor="fromBranch"
                className="block text-sm font-medium text-gray-700"
              >
                owner
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={owner.name}
                disabled
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="toBranches"
                className="block text-sm font-medium text-gray-700"
              >
                Status Return
              </label>
              <Comboboxes
                people={statusReturn}
                selectedValue={selectStatus}
                setSelectedValue={setSelectStatus}
              />
            </div>

            {/* {selectStatus?.name === "Project Completed" && (
              <div className="sm:col-span-6 ">
                <div>
                  <label>
                    Are your accessories complete? If yes, please check the
                    checkbox.
                  </label>
                  <CheckBox data={accesories} />
                </div>
              </div>
            )} */}

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

            <div className="sm:col-span-2">
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                destination
              </label>
              <input
                type="text"
                id="destination"
                className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                defaultValue={
                  owner.name === "PT. QUANTUM NUSATAMA"
                    ? `${owner.name} PUSAT`
                    : owner.name
                }
                disabled
              />
            </div>

            {/* <div className="sm:col-span-2 ">
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
            </div> */}

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
                value={
                  selectCategory.name === "Kendaraan" ||
                  selectCategory.name === "Special Tools"
                    ? 1
                    : qty
                }
                onChange={(e) => {
                  if (
                    !(
                      selectCategory.name === "Kendaraan" ||
                      selectCategory.name === "Special Tools"
                    )
                  ) {
                    setQty(e.target.value);
                  }
                }}
                disabled={
                  selectCategory.name === "Kendaraan" ||
                  selectCategory.name === "Special Tools"
                }
              />
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="kurir"
                className="block text-sm font-medium text-gray-700"
              >
                Courier
              </label>
              <input
                type="text"
                name="courier"
                id="courier"
                className="p-2 border spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
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
