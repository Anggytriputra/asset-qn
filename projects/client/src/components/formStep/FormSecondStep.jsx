import Comboboxes from "../Comboboxes";
import ComboboxesWithStatus from "../ComboboxesWithStatus";

export default function FormSecondStep({
  allAssetName = {},
  allOwner = {},
  allUsers = {},
  selectAssetName,
  setSelectAssetName,
  selectOwner,
  setSelectOwner,
  qty,
  setQty,
  desc,
  setDesc,
  selectPic,
  setSelectPic,
}) {
  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Asset Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Asset Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allAssetName}
                  selectedValue={selectAssetName}
                  setSelectedValue={setSelectAssetName}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Owner
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allOwner}
                  selectedValue={selectOwner}
                  setSelectedValue={setSelectOwner}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Person In Charge
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Comboboxes
                  people={allUsers}
                  selectedValue={selectPic}
                  setSelectedValue={setSelectPic}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="qty"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Quantity
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  min="0"
                  name="qty"
                  id="qty"
                  className="p-2 border spin-hidden block  w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  value={qty}
                  onChange={(e) => {
                    const newValue = Math.max(0, parseInt(e.target.value, 10));
                    setQty(newValue);
                  }}
                />
              </div>
            </div>

            {/*  */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
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
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a description about your asset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
